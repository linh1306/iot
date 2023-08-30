import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss'
import { AuthContext } from '../../context/AuthContext';

const translatex = {
  '-2': '-translate-x-[220%]',
  '-1': '-translate-x-[110%]',
  '0': 'translate-x-0',
  '1': 'translate-x-[110%]',
  '2': 'translate-x-[220%]',
}

const Header = () => {
  const { user, setUser, admin } = useContext(AuthContext)
  const [navIndex, setNavIndex] = useState(0);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [showInfoUser, setShowInfoUser] = useState(false)
  const linkNav = [{
    path: '/',
    name: 'Home'
  }, {
    path: '/profile',
    name: 'Profile'
  }]

  if (!user) {
    linkNav.push({
      path: '/login',
      name: 'Login'
    })
  }

  if(admin){
    linkNav.push({
      path: '/manage',
      name: 'Manage'
    })
  }


  useEffect(() => {
    setNavIndex(activeNavIndex);
  }, [activeNavIndex]);

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('name')
    localStorage.removeItem('password')
  }

  return (
    <nav className='h-20 w-full bg-slate-400 fixed z-40'>
      <div className='max-w-7xl h-full flex justify-between items-center m-auto'>
        <div>
          <NavLink to={'/'}>
          <img src="https://firebasestorage.googleapis.com/v0/b/product-a4847.appspot.com/o/icon.png?alt=media&token=1d8033bf-9ba2-4dae-9ebd-518707effe0e" className="h-8 mr-3" alt="Logo Flowbite" />
          </NavLink>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex gap-5'>
            {linkNav.map((item, index) => (
              <NavLink key={index} to={item.path} className={({ isActive }) => {
                if (user && item.name === 'Login') return 'hidden'
                if (isActive) {
                  setActiveNavIndex(index);
                  return 'nav text-black relative font-bold'
                }
                return 'nav relative text-slate-800 opacity-50 font-bold'
              }}><div className={`border-b-2 border-black absolute w-full ${translatex[(navIndex - index).toString()]}`}></div><p className='relative z-50'>{item.name}</p></NavLink>
            ))}
          </div>
          {user &&
            <div className='relative'>
              <div onClick={() => setShowInfoUser(prop => !prop)} className='w-12 h-12 cursor-pointer bg-slate-900 rounded-full overflow-hidden'>
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="" />
              </div>
              {showInfoUser &&
                <div>
                  <div onClick={() => setShowInfoUser(false)} className='absolute w-[200vw] h-[200vh] -top-20 -right-40'></div>
                  <div className='absolute w-72 h-40 bg-blue-200 right-0 rounded-lg top-[68px]'>
                    <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                      <div className="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                      <div
                        className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                        <img src="https://www.w3schools.com/w3images/avatar2.png" />
                      </div>
                      <div className="p-6 bg grid content-center">
                        <h4 className="mb-4 text-2xl font-semibold text-center">{user && user.name}</h4>
                        <hr />
                        <button className="mt-3 text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center" onClick={() => handleLogout()}>
                          <i className="fas fa-sign-out"></i>
                          <span>  Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }

            </div>

          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
