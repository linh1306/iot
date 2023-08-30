import React from 'react';
import { createRoot } from 'react-dom/client';
import Toast from './Toast';
const time = 5000
/**
 * 
 * @param {string} message //thông điệp
 * @param {string} type // kiểu thông báo (info, success, warning)
 * @returns 
 */
const ToastConfig = (message, type) => {
  return new Promise(() => {
    const setTime = setTimeout(() => {
      closeToast()
    }, time);
    const onCancel = () => {
      closeToast();
    };

    const closeToast = () => {
      dialogRoot.unmount();
      document.getElementById('toast-container').removeChild(toastContainer);
      clearTimeout(setTime)
    };

    const toastContainer = document.createElement('div');
    document.getElementById('toast-container').appendChild(toastContainer);
    const dialogRoot = createRoot(toastContainer);
    dialogRoot.render(
      <Toast message={message} type={type} onCancel={onCancel} time={time} />
    );
  });
};
export default ToastConfig