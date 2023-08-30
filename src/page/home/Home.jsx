import React, { useContext, useEffect, useState } from 'react';
import './style.scss'
import Console from './Console';
import axios from 'axios';
import HomeTemplate1 from './HomeTemplate1';
import { AuthContext } from '../../context/AuthContext';
import History from './History';
// import mqtt from 'mqtt';
const mqtt = window.mqtt;
const connectUrl = 'wss://mqtt-dashboard.com:8884/mqtt'
// const connectUrl = 'wss://4038011a2fdc4d9b8c3123a10cc5f620.s2.eu.hivemq.cloud:8884/mqtt'
let client = null

const Home = () => {
  const { user } = useContext(AuthContext)
  const [limit, setLimit] = useState([{ min: 40, max: 80 }, { min: 80, max: 200 }, { min: 30, max: 50 }])
  const [newData, setNewData] = useState([{ name: 'Độ ẩm', value: 0, unit: '%', gpio: 4 }, { name: 'Ánh sáng', value: 0, unit: 'lux', gpio: 0 }, { name: 'Nhiệt độ', value: 0, unit: '°C', gpio: 0 }])
  const [status, setStatus] = useState(false)
  const [timeChange, setTimeChange] = useState(2000)
  const [switchs, setSwitchs] = useState([])
  const [size, setSize] = useState(10)
  const [template, setTemplate] = useState(0)
  useEffect(() => {
    client = mqtt.connect(connectUrl, {
      clean: true,
      connectTimeout: 4000,
      clientId: 'emqx_test' + Math.random().toString(),
      username: user.nameMqtt,
      password: user.passwordMqtt
    })
    if (status) {
      client.on('connect', () => {
        client.subscribe('s-c', (error) => {
        });
      });
      client.on('message', (topic, message) => {
        const dataArray = JSON.parse(message.toString());
        const Array = [];
        const switchsArray = [];

        dataArray.forEach(item => {
          if (item.unit === null) switchsArray.push(item);
          else Array.push(item);
        });
        setNewData(Array)
        setSwitchs(switchsArray)
      });
    }
    handleGetLimit()
    return () => {
      client.end();
    }
  }, [status, timeChange])

  const handleGetLimit = () => {
    axios.get(`https://apimanage1306.000webhostapp.com/getListIotDevice.php?${'name=' + user.name}${'&password=' + user.password}`)
      .then(response => {
        if (response.data.status) setLimit(response.data.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handlePushMesMqtt = (message) => {
    client.publish("c-s", message, (error) => { });
  }

  const handleClickStatus = () => {
    setStatus(prop => !prop)
    setNewData(prop => {
      const newProp = []
      prop.forEach(element => {
        let tmp = { ...element }
        tmp.value = 0
        newProp.push(tmp)
      })
      return newProp
    })
  }

  return (
    <div className='h-full flex'>
      <div id='console' className='pt-20 top-0 w-60 h-screen bg-slate-800 fixed text-white'>
        <Console setTemplate={setTemplate} handleClickStatus={handleClickStatus} data={newData} switchs={switchs} limit={limit} status={status} handlePushMesMqtt={handlePushMesMqtt} setSize={setSize} setLimit={setLimit} timeChange={timeChange} setTimeChange={setTimeChange} />
      </div>
      <div className='flex-1 pl-60'>
        <div className='p-3 h-full'>
          {template === 0 ?
            <HomeTemplate1 data={newData} limit={limit} timeChange={timeChange} switchs={switchs} setSwitchs={setSwitchs} handlePushMesMqtt={handlePushMesMqtt} size={size} />
            :
            <History limit={limit} />
          }
        </div>
      </div>
    </div>
  );
};

export default Home;