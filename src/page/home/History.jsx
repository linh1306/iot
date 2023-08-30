import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto'

const History = ({ limit }) => {
  const valueLimit = {}
  limit.forEach(item => {
    valueLimit[item.name] = { max: item.max, min: item.min }
  });
  const { user } = useContext(AuthContext)
  const [iot, setIot] = useState({})
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [data, setData] = useState({})

  const getData = () => {
    setData({})
    let from = fromTime + (fromTime.length < 18 ? ":00" : "")
    from = from.replace(/T/g, " ")
    let to = toTime + (toTime.length < 18 ? ":00" : "")
    to = to.replace(/T/g, " ")
    Object.keys(iot).forEach(item => {
      if (iot[item]) {
        axios.get(`https://apimanage1306.000webhostapp.com/getHistory.php?${'name=' + user.name}${'&password=' + user.password}${'&from=' + from}${'&to=' + to}${'&iot=' + item}`)
          .then(response => {
            if (response.data.status) {
              console.log(response.data.data);
              const time = []
              const value = []
              response.data.data.forEach((itemArr) => {
                time.push(itemArr.time)
                value.push(itemArr.value)
              })
              setData(prop => {
                const tmp = { ...prop }
                tmp[item] = { time: time, value: value }
                return tmp
              })
            }
          })
      }
    })
  }

  return (
    <div className='w-full h-full '>
      <div className='flex items-center gap-3'>
        <input className='w-48 border' type="datetime-local" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
        <span>to</span>
        <input className='w-48 border' type="datetime-local" value={toTime} onChange={(e) => setToTime(e.target.value)} />
        <ul className='flex gap-2'>
          {limit.map((item, index) => (
            <li className='flex justify-center items-center'>
              <label className={`select-none border-2 transition-all rounded-md px-3 py-2 font-bold ${iot[item.name] === true ? ' shadow-config bg-blue-400 text-white border-blue-400' : ''}`} htmlFor={`history${index}`}>{item.name}</label>
              <input className='hidden' id={`history${index}`} type="checkbox" onChange={(e) => setIot(prop => {
                const tmp = { ...prop }
                if (e.target.checked) tmp[item.name] = true
                else tmp[item.name] = false
                return tmp
              })} />
            </li>
          ))}
        </ul>
        <button className='px-5 py-2 font-bold text-white rounded-lg  active:scale-95 bg-green-400' onClick={() => getData()}>get</button>
      </div>
      <div className='flex flex-col gap-3 mt-10'>
        {Object.keys(data).map((item, index) => (
          <div className='w-full h-96 bg-white rounded-lg shadow-config' key={index}>
            <Line className='' data={{
              labels: data[item].time,
              datasets: [{
                label: item,
                data: data[item].value,
                fill: true,
                borderColor: "blue",
                tension: 0.3
              }, {
                label: 'max',
                data: Array(data[item].value.length).fill(valueLimit[item].max),
                fill: true,
                borderColor: "red",
                tension: 0.3
              }, {
                label: 'min',
                data: Array(data[item].value.length).fill(valueLimit[item].min),
                fill: true,
                borderColor: "red",
                tension: 0.3
              }
              ]
            }} options={{
              animation: {
                duration: 0
              },
              maintainAspectRatio: false,
            }} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default History;