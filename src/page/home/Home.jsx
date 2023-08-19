import React, { useEffect, useState } from 'react';
import './style.scss'
import HomeTemplate1 from './HomeTemplate1';
import Console from './Console';

const Home = () => {
  const [limit, setLimit] = useState([{ min: 40, max: 80 }, { min: 80, max: 200 }, { min: 30, max: 50 },])
  const [newData, setNewData] = useState([{ name: 'độ ẩm', value: 0, unit: '%' }, { name: 'ánh sáng', value: 0, unit: 'lux' }, { name: 'nhiệt độ', value: 0, unit: '°C' }])
  const [status, setStatus] = useState(false)
  const [timeChange, setTimeChange] = useState(2000)

  useEffect(() => {
    if (status) {
      const time = setInterval(() => {
        console.log('hello');
        setNewData(prop => {
          const newProp = []
          console.log();
          prop.forEach(element => {
            let tmp = { ...element }
            tmp.value = Math.floor(Math.random() * 200)
            newProp.push(tmp)
          })
          console.log(newProp);
          return newProp
        })
      }, timeChange);

      return () => {
        clearInterval(time)
      }
    }
  }, [status, timeChange])

  const handleClickStatus = () => {
    setStatus(prop => !prop)
    setNewData(prop => {
      const newProp = []
      console.log();
      prop.forEach(element => {
        let tmp = { ...element }
        tmp.value = 0
        newProp.push(tmp)
      })
      console.log(newProp);
      return newProp
    })
  }


  return (
    <div className='h-full flex'>
      <div id='console' className='pt-20 top-0 w-60 h-screen bg-slate-800 fixed text-white'>
        <Console handleClickStatus={handleClickStatus} data={newData} limit={limit} status={status} setLimit={setLimit} timeChange={timeChange} setTimeChange={setTimeChange} />
      </div>
      <div className='flex-1 pl-60'>
        <div className='p-3 h-full'>
          <HomeTemplate1 data={newData} limit={limit} timeChange={timeChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;