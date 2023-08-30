import { elements } from 'chart.js';
import React, { useEffect, useState } from 'react';
import ToastConfig from '../../component/toast/ToastConfig';

const CollapsibleList = ({ data, limit, setLimit, setTemplate, timeChange, setTimeChange, switchs, setSize, handlePushMesMqtt }) => {
  const [index, setIndex] = useState(-1)
  const [indexItem, setIndexItem] = useState(-1)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [text, setText] = useState("")
  const [devices, setDevices] = useState({})
  const [showCreateGpioIot, setShowCreateGpioIot] = useState(false)

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

  const handleUpdateListDevices = () => {
    const tmpArr = {}
    data.forEach(element => {
      tmpArr[element.name] = { value: true, gpio: element.gpio }
    });
    limit.forEach(element => {
      if (!(element.name in tmpArr)) {
        tmpArr[element.name] = { value: false, gpio: 0 }
      }
    });
    switchs.forEach(element => {
      tmpArr[element.name] = { value: true, gpio: element.gpio }
    })
    delete tmpArr["Nhiệt độ"];
    handleChangeIndex(2)
    setShowCreateGpioIot(false)
    setDevices(tmpArr)
    setText("")
  }

  const handlePubGpio = () => {
    let mess = ""
    Object.entries(devices).forEach(([key, value]) => {
      if (value.value && value.gpio > 0) mess += key + "-" + value.gpio + "/"
    })
    handlePushMesMqtt(mess.slice(0, -1))
    console.log();
  }

  return (
    <div className='w-full flex flex-col gap-3 select-none'>
      {/* 1 */}
      <div>
        <div onClick={() => handleChangeIndex(0)} className='flex justify-between cursor-pointer mb-2'>
          <div className={`border-b-2 transition-all duration-500 ${index === 0 ? 'flex-1 whitespace-nowrap border-[#ffa500] textNeon' : ' border-white text-white'}`}>Change limit</div>
          <div><i className={`fa-solid fa-caret-down transition-all  ${index === 0 ? ' rotate-180 delay-100 text-[#ffa500]' : ' rotate-0'}`}></i></div>
        </div>
        <div className={`pl-2 overflow-hidden flex flex-col gap-1 ${index === 0 ? 'p-2' : 'h-0'}`}>
          {limit.map((item, index) => (
            <div key={index}>
              <div onClick={() => handleClickItemChangeLimit(index)} className={`cursor-pointer transition-all duration-500 ${index === indexItem ? 'textNeon2' : ' text-white'}`}>{item.name}</div>
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
          <div className={`border-b-2 transition-all duration-500 ${index === 1 ? 'flex-1 whitespace-nowrap border-[#ffa500] textNeon' : ' border-white text-white'}`}>Size change</div>
          <div><i className={`fa-solid fa-caret-down transition-all  ${index === 1 ? ' rotate-180 delay-100 text-[#ffa500]' : ' rotate-0'}`}></i></div>
        </div>
        <div className={`pl-2 overflow-hidden flex flex-col gap-1 ${index === 1 ? 'p-2' : 'h-0'}`}>
          <div className='flex justify-center gap-3'>
            <button onClick={() => setSize(prop => prop - 1)} className='w-10 bg-blue-400 rounded-lg active:scale-95'>-</button>
            <button onClick={() => setSize(prop => prop + 1)} className='w-10 bg-blue-400 rounded-lg active:scale-95'>+</button>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div>
        <div onClick={() => handleUpdateListDevices()} className='flex justify-between cursor-pointer mb-2'>
          <div className={`border-b-2 transition-all duration-500 ${index === 2 ? 'flex-1 whitespace-nowrap border-[#ffa500] textNeon' : ' border-white text-white'}`}>Gpio config</div>
          <div><i className={`fa-solid fa-caret-down transition-all  ${index === 2 ? ' rotate-180 delay-100 text-[#ffa500]' : ' rotate-0'}`}></i></div>
        </div>
        <div className={`overflow-hidden flex flex-col gap-1 ${index === 2 ? 'p-2' : 'h-0'}`}>
          {Object.entries(devices).map(([key, value, index]) => (
            <div key={key} className='flex justify-between items-center'>
              <div className='flex-[2]'>{key}</div>
              <div className='flex-1 flex justify-between items-center'>
                <input className='w-10 text-black' onChange={(e) => {
                  setDevices(prop => {
                    const tmpObj = { ...prop }
                    tmpObj[key] = { ...prop[key], gpio: e.target.value }
                    return tmpObj
                  })
                }} type="numb" value={value.gpio} />
                <input onClick={() => {
                  if (value.gpio == 0) {
                    ToastConfig("Chân gpio phải lớn hơn 0", "warning")
                  } else {
                    setDevices(prop => {
                      const tmpObj = { ...prop }
                      tmpObj[key] = { ...prop[key], value: !value.value }
                      return tmpObj
                    })
                  }
                }} type="checkbox" checked={value.value && value.gpio > 0} />
              </div>
            </div>
          ))}
          <div className='flex justify-center gap-2 mt-2'>
            <div className={`transition-all ${showCreateGpioIot ? 'max-w-[100px]' : 'max-w-[0]'}`}>
              <input className={`w-full rounded-full text-black ${showCreateGpioIot ? 'pl-2' : ''}`} type="text" onChange={(e) => setText(e.target.value)} value={text} />
            </div>
            <div className='flex gap-2'>
              <button onClick={() => {
                if (text !== "") {
                  setDevices(prop => {
                    const tmpObj = { ...prop }
                    tmpObj[text] = { value: false, gpio: 0 }
                    return tmpObj
                  })
                  setText("")
                }
                setShowCreateGpioIot(prop => !prop)
              }} className='w-10 bg-blue-400 rounded-lg'>+</button>
              <button className='w-10 bg-green-400 rounded-lg' onClick={() => handlePubGpio()}>Ok</button>
            </div>
          </div>
        </div>
      </div>
      {/* 4 */}
      <div>
        <div onClick={() => handleChangeIndex(3)} className='flex justify-between cursor-pointer mb-2'>
          <div className={`border-b-2 transition-all duration-500 ${index === 3 ? 'flex-1 whitespace-nowrap border-[#ffa500] textNeon' : ' border-white text-white'}`}>Page</div>
          <div><i className={`fa-solid fa-caret-down transition-all  ${index === 3 ? ' rotate-180 delay-100 text-[#ffa500]' : ' rotate-0'}`}></i></div>
        </div>
        <div className={`pl-2 overflow-hidden flex flex-col gap-1 ${index === 3 ? 'p-2' : 'h-0'}`}>
          <div className='flex flex-col gap-3'>
            <div onClick={() => {
              setTemplate(0)
              setIndexItem(0)
            }} className={`cursor-pointer transition-all duration-500 ${1 !== indexItem ? 'textNeon2' :' text-white' }`}>Home</div>
            <div onClick={() => {
              setTemplate(1)
              setIndexItem(1)
            }} className={`cursor-pointer transition-all duration-500 ${1 === indexItem ? 'textNeon2' : ' text-white'}`}>History</div>
          </div>
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