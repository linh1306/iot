import React from 'react';
import './style.css'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="flex justify-around w-[100px]">
        <div className="animation rounded-full w-5 h-5  bg-red-500"></div>
        <div className="animation rounded-full w-5 h-5  bg-orange-400" style={{animationDelay:'0.1s'}}></div>
        <div className="animation rounded-full w-5 h-5  bg-blue-400" style={{animationDelay:'0.2s'}}></div>
      </div>
    </div>
  );
};

export default Loading;