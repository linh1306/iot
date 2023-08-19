import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto'

const colors = ['#ff0000', '#ffa500', '#0000ff', '#ffff00', '#ffc3a0', '#00ff7f', '#e6e6fa', '#ffd700', '#00ffff', '#ffa500', '#ff7373', '#0000ff', '#c6e2ff']

const HomeTemplate1 = ({ data, limit, timeChange }) => {
  const [size, setSize] = useState(10)
  const [label, setLabel] = useState([])
  const [value, setValue] = useState([])
  console.log([1, 2, 3, 4].slice(0, 10));
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
  const dataChart = {
    labels: label,
    datasets: data.map((item, index) => {
      return {
        label: item.name,
        data: value[index],
        fill: true,
        borderColor: colors[index],
        backgroudColor: colors[index],
        tension: 0.3
      }
    })
  }
  const optionsChart = {
    animation: {
      duration: 0
    }
  }
  const [valueLimit, setValueLimit] = useState([])
  useEffect(() => {
    setValueLimit(limit)
  }, [limit])
  return (
    <div className='flex flex-col gap-3 h-full'>
      <div className='flex gap-3'>
        {data.map((item, index) => (
          <div key={index} className={`${valueLimit[index] && (item.value < valueLimit[index].min || item.value > valueLimit[index].max ? (item.value === 0 ? 'bg-slate-700' : 'bg-red-400') : 'bg-green-400')} h-40 transition-all duration-500 flex flex-col justify-center items-center flex-1 rounded-xl shadow-config`}>
            <p className='font-bold text-lg text-slate-200'>{item.name + ' : ' + item.value + ' ' + item.unit}</p>
            {item.value !== 0 && valueLimit[index] &&
              <p className='text-sm font-bold text-white'>{(item.value > valueLimit[index].max ? ' cao' : (item.value < valueLimit[index].min ? ' thấp' : ' bình thường'))}</p>}
          </div>
        ))}
      </div>
      <div className='w-full flex-1 flex max-h-[440px] gap-3'>
        <div className='flex-[4] h-full rounded-xl shadow-config flex justify-center items-center'>
          <Line className='' data={dataChart} options={optionsChart} />
        </div>
        <div className='flex-1 h-full rounded-xl shadow-config'></div>
      </div>
    </div>
  );
};

export default HomeTemplate1;
