import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss'

const translatex = {
  '-2': '-translate-x-[220%]',
  '-1': '-translate-x-[110%]',
  '0': 'translate-x-0',
  '1': 'translate-x-[110%]',
  '2': 'translate-x-[220%]',
}

const Header = () => {
  const linkNav = [{
    path: '/',
    name: 'Home'
  }, {
    path: '/profile',
    name: 'Profile'
  }]
  const [navIndex, setNavIndex] = useState(0);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  useEffect(() => {
    setNavIndex(activeNavIndex);
  }, [activeNavIndex]);

  console.log((navIndex));

  return (
    <nav className='h-20 w-full bg-slate-400 fixed z-40'>
      <div className='max-w-7xl h-full flex justify-between items-center m-auto'>
        <div>
          <NavLink to={'/'}>haskll</NavLink>
        </div>
        <div className='flex gap-5'>
          {linkNav.map((item, index) => (
            <NavLink key={index} to={item.path} className={({ isActive }) => {
              if (isActive) {
                setActiveNavIndex(index);
                return 'nav text-black relative font-bold'
              }
              return 'nav relative text-slate-800 opacity-50 font-bold'
            }}><div className={`border-b-2 border-black absolute w-full ${translatex[(navIndex - index).toString()]}`}></div><p className='relative z-50'>{item.name}</p></NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
