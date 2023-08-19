import React, { useEffect } from 'react';
import { BlockCode } from '../../component';

const Profile = () => {

  return (
    <div className='flex flex-row min-h-screen'>
      <div className='flex-1 flex items-center flex-col'>
        <p className='text-3xl font-bold text-blue-500 font-sans'>Profile</p>
        <div>
          <div className='w-[800px] rounded-2xl shadow-2xl p-4 flex flex-col gap-3'>
            <p className='text-2xl font-bold'>Font End</p>
            <div className='flex gap-3'>
              <div className='w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center'>
                <img className='w-[90%]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
              </div>
              <div className='w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center'>
                <img className='w-[90%]' src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_tailwind_icon_130128.png" />
              </div>
            </div>
            <BlockCode codeString={`const helo = dhh
console.log('hello')` } language={'javascript'} path={'/src/Profile.jsx'} />

          </div>
        </div>
      </div>
      <div className='fixed h-screen right-0'>
        <div className='bg-orange-600 w-80 h-full flex flex-col relative items-center'>
          <div className='w-48 h-48 rounded-full absolute overflow-hidden border-[5px] border-white'>
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="" />
          </div>
          <div className=' absolutew-0 h-0  border-t-[220px] border-x-[160px] border-transparent border-t-red-50'></div>
          <div className='mt-20 text-white font-bold'>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>: Nguyễn Văn Linh</td>
                </tr>
                <tr>
                  <td>Id</td>
                  <td>: B20DCCN399</td>
                </tr>
                <tr>
                  <td>Class</td>
                  <td>: D20CQCN03-B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;