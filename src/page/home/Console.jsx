import React from 'react';
import CollapsibleList from './CollapsibleList';

const Console = ({ handleClickStatus, data, limit, status, setLimit, timeChange, setTimeChange }) => {

  return (
    <div className='px-3 py-5 w-full h-full  flex justify-center relative'>
      <CollapsibleList data={data} limit={limit} setLimit={setLimit} timeChange={timeChange} setTimeChange={setTimeChange} />
      <div onClick={() => handleClickStatus()} className='w-10 h-10 rounded-full border-2 flex justify-center items-center border-white absolute bottom-8 cursor-pointer'>
        <i class={`fas ${status ? 'fa-pause' : 'fa-play'}`}></i>
      </div>
    </div>
  );
};

export default Console;