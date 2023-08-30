import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './style.scss'
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ToastConfig from "../../component/toast/ToastConfig";
function Login() {
  const { setUser, setStatus, setAdmin } = useContext(AuthContext)
  const [state, setState] = useState(false)
  const [input, setInput] = useState({ name: '', password: '' })
  const navigate = useNavigate()
  const handleClickSignIn = async () => {
    axios.get(`https://apimanage1306.000webhostapp.com/checkUser.php?${'name=' + input.name}${'&password=' + input.password}`)
      .then(response => {
        if (response.data.status) {
          setUser({ name: input.name, password: input.password, nameMqtt: response.data.data.account, passwordMqtt: response.data.data.password })
          setStatus(response.data.data.status)
          setAdmin(response.data.data.admin)
          ToastConfig('Đăng nhập thành công', 'success')
          localStorage.setItem('name', input.name);
          localStorage.setItem('password', input.password);
          localStorage.setItem('timeLogin', new Date());
          navigate('/')
        } else {
          ToastConfig('Thông tin đăng nhập sai', 'warning')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleClickSignUp = () => {
    if (input.name !== '' && input.password != '') {
      axios.get(`https://apimanage1306.000webhostapp.com/createUser.php?${'name=' + input.name}${'&password=' + input.password}`)
        .then(response => {
          if (response.data.status) {
            setState(false)
            ToastConfig('Đăng kí thành công', 'info')
          }
          else {
            ToastConfig('Tài khoản đã tồn tại', 'warning')
            setInput({ name: '', password: '' })
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      ToastConfig('Vui lòng nhập đủ các trường', 'warning')
    }
  };
  return (
    <div className='w-full flex-1 pt-20'>
      <div className='w-full md:max-w-[760px] box-shadow h-[450px] relative m-auto overflow-hidden shadow-config rounded-lg'>
        <div className={`flex bg-white justify-center items-center w-full md:w-1/2 h-full absolute top-0 transition-all duration-500 ease-in  ${state ? 'translate-x-0 md:translate-x-full z-10' : 'z-[1] translate-x-full md:translate-x-0 opacity-0'}`}>
          <div className="h-full w-full max-w-[350px] p-6 space-y-4 md:space-y-6 bg-white md:p-8 flex flex-col justify-around">
            <h1 className="text-xl font-bold text-center tracking-tight text-gray-900 md:text-2xl">
              Đăng ký
            </h1>
            <div className="flex flex-col gap-5">
              <div className='input relative border-2 rounded-full border-slate-500 focus:border-[#00d9ff]'>
                <input type="text" placeholder=' ' value={input.name} onChange={(e) => setInput(prop => { return { ...prop, name: e.target.value } })} id="nameSigIn" className="rounded-full block w-full py-2 px-4 bg-gray-50 text-gray-900 outline-none" />
                <label htmlFor="nameSigIn" className="cursor-text absolute top-0 left-0 text-base font-medium text-slate-400 py-2 pl-4 block rounded-full transition-all">Your name</label>
              </div>
              <div className='input relative border-2 rounded-full border-slate-500 focus:border-[#00d9ff]'>
                <input type="password" placeholder=' ' value={input.password} onChange={(e) => setInput(prop => { return { ...prop, password: e.target.value } })} id="passwordSigIn" className="rounded-full block w-full py-2 px-4 bg-gray-50 text-gray-900 outline-none" />
                <label htmlFor="passwordSigIn" className="cursor-text absolute top-0 left-0 text-base font-medium text-slate-400 py-2 pl-4 block rounded-full transition-all">Password</label>
              </div>
            </div>
            <div className="w-full flex items-center flex-col gap-3 justify-center">
              <button onClick={() => handleClickSignUp()} className='bg-pink-500 text-white px-5 py-2 rounded-full'>Sign up</button>
              <button onClick={() => setState(!state)} className='text-slate-500 md:hidden'><i className="far fa-long-arrow-alt-left"> Đăng nhập</i></button>
            </div>
          </div>
        </div>
        <div className={`flex justify-center items-center w-full md:w-1/2 h-full bg-white absolute top-0 transition-all duration-500 ease-in z-[5] ${state ? '-translate-x-full md:translate-x-full opacity-0' : 'z-[4] translate-x-0'}`}>
          <div className="h-full p-6 space-y-4 md:space-y-6 md:p-8 flex flex-col justify-around">
            <h1 className="text-xl font-bold text-center tracking-tight text-gray-900 md:text-2xl">
              Đăng nhập
            </h1>
            <div className="flex flex-col gap-5">
              <div className='input relative border-2 rounded-full border-slate-500 focus:border-[#00d9ff]'>
                <input type="text" placeholder=' ' value={input.name} onChange={(e) => setInput(prop => { return { ...prop, name: e.target.value } })} id="nameLogIn" className="rounded-full block w-full py-2 px-4 bg-gray-50 text-gray-900 outline-none" />
                <label htmlFor="nameLogIn" className="cursor-text absolute top-0 left-0 text-base font-medium text-slate-400 py-2 pl-4 block rounded-full transition-all">Your name</label>
              </div>
              <div className='input relative border-2 rounded-full border-slate-500 focus:border-[#00d9ff]'>
                <input type="password" placeholder=' ' value={input.password} onChange={(e) => setInput(prop => { return { ...prop, password: e.target.value } })} id="passwordLogIn" className="rounded-full block w-full py-2 px-4 bg-gray-50 text-gray-900 outline-none" />
                <label htmlFor="passwordLogIn" className="cursor-text absolute top-0 left-0 text-base font-medium text-slate-400 py-2 pl-4 block rounded-full transition-all">Password</label>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center  gap-3">
              <button onClick={() => handleClickSignIn()} className='bg-purple-400 text-white px-5 py-2 rounded-full'>Sign in</button>
              <button onClick={() => setState(!state)} className='text-slate-500 md:hidden'>Tạo tài khoản mới <i className="far fa-long-arrow-alt-right"></i></button>
            </div>
          </div>
        </div>
        <div className={`hidden z-20 relative left-0 top-0 w-1/2 h-full transition-all duration-500 ease-in overflow-hidden md:flex ${!state ? 'translate-x-full' : ''}`}>
          <div className={`absolute px-9 text-slate-200 w-full h-full gap-5 transition-all duration-500 ease-in flex justify-center flex-col text-center items-center bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 ${state ? '-translate-x-full' : ''}`}>
            <h2 className='font-bold text-2xl'>Welcome Back!</h2>
            <p>Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn</p>
            <button onClick={() => setState(!state)} className='rounded-full border border-slate-200 px-5 py-1'>Sign up</button>
          </div>
          <div className={`absolute w-full h-full transition-all gap-5 flex-col text-center px-9 text-slate-200 duration-500 ease-in flex justify-center items-center bg-gradient-to-tr from-purple-400 via-pink-400 to-pink-500 left-full ${state ? '-translate-x-full' : ''}`}>
            <h2 className='font-bold text-2xl'>Hello!</h2>
            <p>Vui lòng nhập thông tin của bạn và bắt đầu cuộng hành trình với chúng tôi</p>
            <button onClick={() => setState(!state)} className='rounded-full border border-slate-200 px-5 py-1'>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
