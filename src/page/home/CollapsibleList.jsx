import React, { useState } from 'react';

const CollapsibleList = ({ data, limit, setLimit, timeChange, setTimeChange }) => {
  const [index, setIndex] = useState(-1)
  const [indexItem, setIndexItem] = useState(-1)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [time, setTime] = useState(timeChange)
  const [devices, setDevices] = useState([{ name: 'Đèn', status: false }, { name: 'Quạt', status: false }])

  const handleClickItemChangeLimit = (index) => {
    setIndexItem(prop => prop === index ? -1 : index)
    setMin(limit[index].min)
    setMax(limit[index].max)
  }

  const handleChangeMinMax = (name, value) => {
    if (name === 'min') {
      setMin(value)
      if (value > max) setMax(value)
    } else {
      setMax(value)
      if (value < min) setMin(value)
    }
  }

  const handleClickOkChangeLimit = (index) => {
    const limitNew = []
    limit.forEach(element => {
      const tmp = { ...element }
      if (limitNew.length === index) {
        tmp.min = min
        tmp.max = max
      }
      limitNew.push(tmp)
    });
    setLimit(limitNew)
  }

  const handleChangeIndex = (index) => {
    setIndex(prop => prop === index ? -1 : index)
    setIndexItem(-1)
  }

  const handleChangeDevices = (index) => {
    setDevices(prop => {
      const tmp = []
      prop.forEach((element, indexElement) => {
        const item = { ...element }
        if (indexElement === index) {
          item.status = !item.status
        }
        tmp.push(item)
      });
      return tmp
    })
  }

  return (
    <div className='w-full flex flex-col gap-3 select-none'>
      {/* 1 */}
      <div>
        <div onClick={() => handleChangeIndex(0)} className='flex justify-between cursor-pointer mb-2'>
          <div className={`border-b-2 transition-all duration-500 ${index === 0 ?' border-[#ffa500] textNeon':' border-white text-white'}`}>Change limit</div>
          <div><i className={`fa-solid fa-caret-${index === 0 ? 'up' : 'down'}`}></i></div>
        </div>
        <div className={`pl-2 overflow-hidden flex flex-col gap-1 ${index === 0 ? 'p-2' : 'h-0'}`}>
          {data.map((item, index) => (
            <div key={index}>
              <div onClick={() => handleClickItemChangeLimit(index)} className={`cursor-pointer transition-all duration-500 ${index === indexItem ?'textNeon2':' text-white'}`}>{item.name}</div>
              <div className={`overflow-hidden pl-2 flex gap-1 ${index === indexItem ? 'h-15 p-2' : 'h-0'}`}>
                <div className='flex flex-col gap-1'>
                  <div className='text-black flex gap-1'>
                    <p className='text-white w-8'>min</p>
                    <button onClick={() => handleChangeMinMax('min', min - 1)} className='w-6 h-6 rounded-sm bg-blue-500 font-bold text-xs text-white'>-</button>
                    <input onChange={(e) => handleChangeMinMax('min', e.target.value)} className='text-black w-10' type="number" value={min} />
                    <button onClick={() => handleChangeMinMax('min', min + 1)} className='w-6 h-6 rounded-sm bg-blue-500 font-bold text-xs text-white'>+</button>
                  </div>
                  <div className='text-black flex gap-1'>
                    <p className='text-white w-8'>max</p>
                    <button onClick={() => handleChangeMinMax('max', max - 1)} className='w-6 h-6 rounded-sm bg-blue-500 font-bold text-xs text-white'>-</button>
                    <input onChange={(e) => handleChangeMinMax('max', e.target.value)} className='text-black w-10' type="number" value={max} />
                    <button onClick={() => handleChangeMinMax('max', max + 1)} className='w-6 h-6 rounded-sm bg-blue-500 font-bold text-xs text-white'>+</button>
                  </div>
                </div>
                <div className='flex-1 flex justify-center items-center'>
                  <button onClick={() => handleClickOkChangeLimit(index)} className='py2 px-3 bg-green-400 rounded-lg'>Ok</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 2 */}
      <div>
        <div onClick={() => handleChangeIndex(1)} className='flex justify-between cursor-pointer mb-2'>
          <div className={`border-b-2 transition-all duration-500 ${index === 1 ?' border-[#ffa500] textNeon':' border-white text-white'}`}>Time change</div>
          <div><i className={`fa-solid fa-caret-${index === 1 ? 'up' : 'down'}`}></i></div>
        </div>
        <div className={`pl-2 overflow-hidden flex flex-col gap-1 ${index === 1 ? 'p-2' : 'h-0'}`}>
          <div className='flex'>
            <div className='text-black flex gap-1'>
              <button onClick={() => setTime(time - 100)} className='w-10 h-6 rounded-sm bg-blue-500 font-bold text-xs text-white'>-100</button>
              <input onChange={(e) => setTime(e.target.value)} className='text-black w-10' type="number" value={time} />
              <button onClick={() => setTime(time + 100)} className='w-10 h-6 rounded-sm bg-blue-500 font-bold text-xs text-white'>+100</button>
            </div>
            <div className='flex-1 flex justify-center items-center'>
              <button onClick={() => setTimeChange(time)} className='py2 px-3 bg-green-400 rounded-lg active:scale-95'>Ok</button>
            </div>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div>
        <div onClick={() => handleChangeIndex(2)} className='flex justify-between cursor-pointer mb-2'>
          <div className={`border-b-2 transition-all duration-500 ${index === 2 ?' border-[#ffa500] textNeon':' border-white text-white'}`}>Switch</div>
          <div><i className={`fa-solid fa-caret-${index === 2 ? 'up' : 'down'}`}></i></div>
        </div>
        <div className={`overflow-hidden flex flex-col gap-1 ${index === 2 ? 'p-2' : 'h-0'}`}>
          {devices.map((item, index) => (
            <div key={index} className='flex justify-between items-center'>
              <div>{item.name}</div>
              <div onClick={() => handleChangeDevices(index)} className={`w-8 h-[20px] rounded-md cursor-pointer flex justify-center items-center text-xs ${item.status ? 'bg-green-400 boxNeon' : 'bg-red-400'}`}>{item.status ? 'On' : 'Off'}</div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default CollapsibleList;


/*
<div>
        <div onClick={() => handleChangeIndex(###)} className='flex justify-between cursor-pointer mb-2'>
          <div className='border-b-2 border-rose-400'>Time change</div>
          <div><i className={`fa-solid fa-caret-${index === ### ? 'up' : 'down'}`}></i></div>
        </div>
        <div className={`pl-2 mt-2 overflow-hidden flex flex-col gap-1 ${index === ### ? 'p-2' : 'h-0'}`}>
          
        </div>
      </div>
*/