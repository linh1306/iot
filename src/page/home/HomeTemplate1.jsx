import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const colors = ['#ff0000', '#ffa500', '#0000ff', '#ffff00', '#ffc3a0', '#00ff7f', '#e6e6fa', '#ffd700', '#00ffff', '#ffa500', '#ff7373', '#0000ff', '#c6e2ff']

const HomeTemplate1 = ({ data, limit, timeChange, switchs, setSwitchs, handlePushMesMqtt, size }) => {
  const { user } = useContext(AuthContext)
  const [label, setLabel] = useState([])
  const [value, setValue] = useState([])
  const [valueLimit, setValueLimit] = useState({})
  const [warning, setWarning] = useState([])
  console.log(valueLimit);
  useEffect(() => {
    axios.get(`https://apimanage1306.000webhostapp.com/getWarning.php?${'name=' + user.name}${'&password=' + user.password}${'&size=10'}`)
      .then(response => {
        if (response.data.status) {
          setWarning(response.data.data)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [])
  useEffect(() => {
    const tmpValues = []
    data.forEach((element, index) => {
      let tmp = []
      if (value[index]) {
        tmp = value[index].slice(0, size - 1)
        tmp.unshift(element.value)
      } else {
        tmp = [element.value]
      }
      tmpValues.push(tmp)
    });
    setValue(tmpValues)
  }, [data])

  useEffect(() => {
    const tmpLabel = []
    for (let i = 0; i < size; i++) {
      tmpLabel.push((timeChange / 1000 * i * -1).toString())
    }
    setLabel(tmpLabel)
  }, [size, timeChange])
  useEffect(() => {
    setValueLimit(() => {
      const tmpObj = {}
      limit.forEach((item) => {
        tmpObj[item.name] = { min: item.min, max: item.max }
      });
      return tmpObj
    }
    )
  }, [limit])
  const dataChart = {
    labels: label,
    datasets: data.map((item, index) => {
      return {
        label: item.name,
        data: value[index],
        fill: true,
        borderColor: colors[index],
        backgroundColor: colors[index] + '20',
        tension: 0.3
      }
    })
  }
  const optionsChart = {
    animation: {
      duration: 0
    },
    maintainAspectRatio: false,
    // width: "400px",
    // height: "200px"
  }



  const handleChangeStatusSwich = (indexSwich) => {
    const message = "" + switchs[indexSwich].gpio + "-" + (!switchs[indexSwich].value).toString();
    console.log(message);
    handlePushMesMqtt(message)
  }

  return (
    <div className='flex flex-col gap-3 h-full'>
      <div className='flex gap-3'>
        {data.map((item, index) => (
          <div key={index} className={`${valueLimit[item.name] && (item.value < valueLimit[item.name].min || item.value > valueLimit[item.name].max ? (item.value === 0 ? 'bg-slate-700' : 'bg-red-400') : 'bg-green-400')} h-40 transition-all duration-500 flex flex-col justify-center items-center flex-1 rounded-xl shadow-config`}>
            <p className='font-bold text-lg text-slate-200'>{item.name + ' : ' + item.value + ' ' + item.unit}</p>
            {item.value !== 0 && valueLimit[item.name] &&
              <p className='text-sm font-bold text-white'>{(item.value > valueLimit[item.name].max ? ' cao' : (item.value < valueLimit[item.name].min ? ' thấp' : ' bình thường'))}</p>}
          </div>
        ))}
      </div>
      <div className='w-full flex-1 flex max-h-[440px] gap-3'>
        <div className='flex-[4] h-full rounded-xl shadow-config flex justify-center items-center'>
          <Line className='' data={dataChart} options={optionsChart} />
        </div>
        <div className='flex-1 h-full flex gap-3 flex-col'>
          <div className='bg-white flex-[2] w-full rounded-xl shadow-config p-4  pl-5 overflow-hidden'>
            <ul  className='w-full h-full  overflow-y-scroll flex flex-col gap-[6px] pr-3 border-t-2 border-b-2'>
              {warning.map((item, index) => (
                <li className={`border-l-[3px] ${item.status === "up"?"border-red-600 bg-red-200 ":"border-orange-600 bg-orange-200"} pl-3 shadow-config flex justify-between items-center`}>
                  <div><i class={item.status==="up"?"fa-sharp fa-solid fa-triangle-exclamation text-red-600":"fa-solid fa-circle-exclamation text-orange-400"}></i></div>
                  <div>
                    <p>{item.name} <span className={item.status === "up"?"text-red-600":"text-orange-600"}>{item.value}</span></p>
                    <p className='text-xs text-slate-500'>{item.time}</p>
                  </div>
                  <div className='pr-3'><i className={`fa-solid fa-caret-${item.status} ${item.status === "up"?"text-red-500":"text-orange-500"}`}></i></div>
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-white flex-[1] w-full pt-3 px-4 rounded-xl shadow-config'>
            {switchs.map((item, index) => (
              <div key={index} className='flex justify-between items-center'>
                <div>{item.name}</div>
                <div onClick={() => handleChangeStatusSwich(index)} className={`w-8 h-[20px] select-none text-white rounded-md cursor-pointer flex justify-center items-center text-xs ${item.value ? 'bg-green-400' : 'bg-red-400'}`}>{item.value ? 'On' : 'Off'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate1;
