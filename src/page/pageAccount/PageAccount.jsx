import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ToastConfig from '../../component/toast/ToastConfig';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PageAccount = () => {
  const navigate = useNavigate()
  const { user, status, admin, setUser, setAdmin, setStatus } = useContext(AuthContext)
  if (!admin && !status) {
    const name = localStorage.getItem('name')
    const password = localStorage.getItem('password')
    if (name && password && (new Date() - new Date(localStorage.getItem('timeLogin')) < 7200000)) {
      axios.get(`https://apimanage1306.000webhostapp.com/checkUser.php?${'name=' + name}${'&password=' + password}`)
        .then(response => {
          const res = response.data.data
          if (res.status || res.admin) {
            setUser({ name: name, password: password, nameMqtt:res.account, passwordMqtt:res.password })
            setStatus(response.data.data.status)
            setAdmin(response.data.data.admin)
          } else {
            ToastConfig('Tài khoản của bạn chưa được xác minh', 'warning')
          }
        })
    }
  }
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-[450px] h-72 bg-blue-200 rounded-xl p-4 flex flex-col justify-between'>
        <div className='font-bold font-mono text-xl'>Đang xác minh</div>
        <div className='flex flex-col gap-1'>
          <div>Xin chào {user.name},</div>
          <div>Chúng tôi đã nhận được yêu cầu tham gia của bạn vui lòng đợi để được xác minh</div>
          <div>Sau khi được xác minh vui lòng quay về home</div>
        </div>
        <div className='flex justify-end'>
          <button onClick={() => navigate('/')} className='px-4 py-2 rounded-lg text-white bg-blue-400'>Quay về Home</button>
        </div>
      </div>
    </div>
  );
};

export default PageAccount;