import React from 'react';
import './style.scss'

const Toast = ({ message, type, onCancel, time }) => {
  console.log(time);
  if (type !== 'success' && type !== 'warning') type = 'info'
  const color = {
    'success':  '#65de61',
    'info':     '#156ec7',
    'warning':  '#db4141',
  }
  const icon = {
    'success':  `fa-solid fa-circle-check`,
    'info':     `fa-sharp fa-solid fa-circle-info`,
    'warning':  `fa-sharp fa-solid fa-circle-exclamation`,
  }
  const bg = {}
  for (const key in color) {
    if (color.hasOwnProperty(key)) {
      bg[key] = color[key] + '30';
    }
  }
  return (
    <div className='w-full flex flex-col relative overflow-hidden rounded-lg border-2' style={{ animation: `show-toast ${time / 1000}s ease-in-out` }}>
      <div class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white shadow" role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg`} style={{ backgroundColor: bg[type] }}>
          <i className={icon[type]} style={{ color: color[type] }}></i>
        </div>
        <div class="ml-3 text-sm font-normal">{message}</div>
        <button onClick={() => onCancel()} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <hr className=' absolute bottom-0 h-1 border-none w-full bg-black' style={{ animation: `time-toast ${time / 1000}s linear`, backgroundColor: color[type] }} />
    </div>
  );
};

export default Toast;