import React from 'react';
import CollapsibleList from './CollapsibleList';
import ToastConfig from '../../component/toast/ToastConfig';

const Console = ({ handleClickStatus, data,setTemplate, limit, status, setLimit, timeChange, setTimeChange, switchs, setSize, handlePushMesMqtt }) => {

  return (
    <div className='px-3 py-5 w-full h-full  flex justify-center relative'>
      <CollapsibleList setTemplate={setTemplate} data={data} limit={limit} setLimit={setLimit} handlePushMesMqtt={handlePushMesMqtt} timeChange={timeChange} switchs={switchs} setTimeChange={setTimeChange} setSize={setSize} />
      <div onClick={() => handleClickStatus()} className='w-10 h-10 rounded-full border-2 flex justify-center items-center border-white absolute bottom-8 cursor-pointer'>
        <i className={`fas ${status ? 'fa-pause' : 'fa-play'}`}></i>
      </div>
    </div>
  );
};

export default Console;