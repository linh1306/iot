import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss'

const ManageUser = () => {
  const [listUser, setListUser] = useState([])
  const [indexUser, setIndexUser] = useState(-1)
  useEffect(() => {
    const name = localStorage.getItem('name')
    const password = localStorage.getItem('password')
    axios.get(`https://apimanage1306.000webhostapp.com/getListUser.php?name=${name}&password=${password}`)
      .then(response => {
        if (response.data.status) {
          console.log(response);
          setListUser(response.data.data)
        }
      })
  }, [])

  const handleActiveUser = (index, user, status) => {
    const name = localStorage.getItem('name')
    const password = localStorage.getItem('password')
    axios.get(`https://apimanage1306.000webhostapp.com/activeUser.php?name=${name}&password=${password}&user=${user}&status=${status ? 1 : 0}`)
      .then(response => {
        if (response.data.status) {
          const tmp = [];
          listUser.forEach((element, indexArr) => {
            const clonedElement = index !== indexArr ? JSON.parse(JSON.stringify(element)) : { ...element, status: status };
            tmp.push(clonedElement);
          });
          setListUser(tmp)
        }
      })

  }
  const handleDeleteUser = (index, user) => {
    const name = localStorage.getItem('name')
    const password = localStorage.getItem('password')
    axios.get(`https://apimanage1306.000webhostapp.com/deleteUser.php?name=${name}&password=${password}&user=${user}`)
      .then(response => {
        if (response.data.status) {
          const tmp = [];
          listUser.forEach((element, indexArr) => {
            if (indexArr !== index) tmp.push(JSON.parse(JSON.stringify(element)));
          });
          setListUser(tmp)
        }
      })
  }

  const handleActiveAdmin = (index, user, value) => {
    const name = localStorage.getItem('name')
    const password = localStorage.getItem('password')
    console.log();
    axios.get(`https://apimanage1306.000webhostapp.com/activeAdmin.php?name=${name}&password=${password}&user=${user}&value=${value ? '1' : '0'}`)
      .then(response => {
        if (response.data.status) {
          const tmp = [];
          listUser.forEach((element, indexArr) => {
            const clonedElement = index !== indexArr ? JSON.parse(JSON.stringify(element)) : { ...element, admin: value };
            tmp.push(clonedElement);
          });
          setListUser(tmp)
        }
      })
  }

  return (
    <div className=''>
      <div class="max-w-[1200px] relative mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-600">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">{listUser.length}</th>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Authority</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className='border-t-2'>
            {listUser.map((item, index) => (
              <tr key={index} class="bg-white w-[100px] border-b ">
                <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </th>
                <td class="px-6 py-4">
                  {item.name}
                </td>
                <td class="px-6 py-4">
                  {item.admin ? 'admin' : 'user'}
                </td>
                <td class="px-6 py-4">
                  <button onClick={() => handleActiveUser(index, item.name, !item.status)} className={`px-3 py-2 font-bold ${item.status ? 'bg-blue-300 text-white' : 'bg-slate-200'}`}>{item.status ? 'Active' : 'Inactive'}</button>
                </td>
                <td class=" flex relative">
                  <div className={`absolute right-0 h-[66px] flex items-center gap-3 pr-3  ${indexUser === index ? 'shadow-right-in' : ''}`}>
                    <button onClick={() => handleActiveAdmin(index, item.name, !item.admin)} class="font-medium text-blue-600 hover:underline whitespace-nowrap">{item.admin ? 'Thu quyền admin' : 'Cấp quyền admin'}</button>
                    <button onClick={() => handleDeleteUser(index, item.name)} class="font-medium text-red-600 hover:underline">Delete</button>
                  </div>
                  <div className={`absolute h-[66px] left-0 transition-all flex justify-end items-center bg-white ${indexUser === index ? 'w-20 shadow-right-out' : 'w-full'}`}>
                    <div onClick={() => setIndexUser(indexUser === index ? -1 : index)} className='w-7 h-7 mr-4 cursor-pointer flex justify-center items-center text-base rounded-full bg-slate-400'><i class="fas fa-ellipsis-v"></i></div>
                  </div>
                  <div className='w-28 h-16'></div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div >
  );
};

export default ManageUser;