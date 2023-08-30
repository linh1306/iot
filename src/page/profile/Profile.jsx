import React, { useEffect } from 'react';
import { BlockCode } from '../../component';

const Profile = () => {

  return (
    <div className='flex flex-row min-h-screen'>
      <div className='flex-1 flex items-center flex-col gap-10'>
        <p className='text-3xl font-bold text-blue-500 font-sans'>Profile</p>
        <div>
          <div className='w-[800px] rounded-2xl shadow-2xl p-4 flex flex-col gap-3 border-t-4 border-blue-400'>
            <img src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/368339971_682271290425424_7862167233318152837_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=YPHCfn64fcYAX9x5UMw&_nc_ht=scontent.fhan14-2.fna&oh=03_AdS3-yvkUtDfm1lgpEuej7frNiF647LgG-kx7k2X2FOQNg&oe=6516D7C2" alt="" />
          </div>
        </div>
        <div>
          <div className='w-[800px] rounded-2xl shadow-2xl p-4 flex flex-col gap-3 border-t-4 border-blue-400'>
            <p className='text-2xl font-bold'>Front End</p>
            <div className='flex gap-3'>
              <div className='w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center'>
                <img className='w-[90%]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
              </div>
              <div className='w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center'>
                <img className='w-[90%]' src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_tailwind_icon_130128.png" />
              </div>
            </div>
            <div>
              <p className='font-bold'>Thư viện</p>
              <ul className='pl-10'>
                <li className='list-disc'><span className='font-medium'>Chartjs</span> :vẽ đồ thị</li>
                <li className='list-disc'><span className='font-medium'>Mqtt-react</span> :kết nối react với mqtt broker</li>
                <li className='list-disc'><span className='font-medium'>Axios</span> :giao tiếp với be(php) qua api</li>
              </ul>
            </div>
            <div>
              <p className='font-bold'>Tính năng chính</p>
              <ul className='pl-10'>
                <li className='list-disc'>phân quyền người dùng</li>
                <li className='list-disc'>hiển thị dữ liệu được gửi từ broker</li>
                <li className='list-disc'>hiển thị lịch sử được ghi lại từ database thông qua api</li>
                <li className='list-disc'>chỉnh sửa giới hạn của các iot device trong database</li>
                <li className='list-disc'>pub mess điều khiển công tắc, thay đổi chân gpio, thêm thiết bị được kết nối trong esp</li>
                <li></li>
              </ul>
            </div>
            <BlockCode codeString={`const helo = dhh
console.log('hello')` } language={'javascript'} path={'/src/Profile.jsx'} />
          </div>
        </div>
        <div>
          <div className='w-[800px] rounded-2xl shadow-2xl p-4 flex flex-col gap-3 border-t-4 border-blue-400'>
            <p className='text-2xl font-bold'>Back End</p>
            <div className='flex gap-3'>
              <div className='w-10 h-10 bg-slate-700 overflow-hidden  rounded-full flex justify-center items-center'>
                <img className='w-[100%]' src="data:image/png;base64,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" />
              </div>
            </div>
            <div>
              <p className='font-bold'>Công cụ</p>
              <ul className='pl-10'>
                <li className='list-disc'>000webhost</li>
              </ul>
            </div>
            <div>
              <p className='font-bold'>Tính năng chính</p>
              <ul className='pl-10'>
                <li className='list-disc'>xác thực người dùng, trả về dữ liệu</li>
                <li className='list-disc'>lưu lại lịch sử của các thiết bị iot</li>
              </ul>
            </div>
            <BlockCode codeString={`// xác thực tài khoản, admin, trả về danh sách tài khoản

{
  "status": true,
  "data": [
    {
      "name": "admind",
      "admin": true,
      "status": true
    },
    {
      "name": "linh",
      "admin": false,
      "status": true
    }
  ]
}` } language={'javascript'} path={'apimanage1306.000webhostapp.com/activeAdmin.php'} />
            <BlockCode codeString={`// cấp hoặc thu hồi quyền admin của người dùng, trả về trang thái
{
  "status": true,
  "mess": "update thành công"
}` } language={'javascript'} path={'apimanage1306.000webhostapp.com/getListUser.php'} />
            <BlockCode codeString={`// kiểm tra quyền truy cập, trả về quyền user

{
  "status": true,
  "mess": "Login successful",
  "data": {
    "admin": true,
    "status": true,
    "account": null,
    "password": null
  }
}` } language={'javascript'} path={'apimanage1306.000webhostapp.com/checkUser.php'} />
            <BlockCode codeString={`// tạo tài khoản mới, trả về kết quả

{
  "status": false,
  "mess": "tài khoản đã tồn tại"
}` } language={'javascript'} path={'apimanage1306.000webhostapp.com/createUser.php'} />
            <BlockCode codeString={`// xác thực quyền admin, xóa tài khoản, trả về kết quả

{
  "status": false,
  "mess": "bạn không có quyền xóa tài khoản"
}` } language={'javascript'} path={'apimanage1306.000webhostapp.com/deleteUser.php'} />
            <BlockCode codeString={`// kiểm tra tài khoản, trả về danh sách giới hạn của các thiết bị iot

{
  "status": true,
  "data": [
    {
      "name": "Ánh sáng",
      "min": 80,
      "max": 100
    },
    {
      "name": "Độ ẩm",
      "min": 80,
      "max": 100
    },
    {
      "name": "Nhiệt độ",
      "min": 30,
      "max": 40
    }
  ]
}` } language={'javascript'} path={'apimanage1306.000webhostapp.com/getListIotDevice.php'} />

          </div>
        </div>
        <div>
          <div className='w-[800px] rounded-2xl shadow-2xl p-4 flex flex-col gap-3 border-t-4 border-blue-400'>
            <p className='text-2xl font-bold'>Iot Device</p>
            <div className='flex gap-3'>
              <div className='w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center'>
                <img className='w-[90%]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
              </div>
              <div className='w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center'>
                <img className='w-[90%]' src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_tailwind_icon_130128.png" />
              </div>
            </div>
            <div>
              <p className='font-bold'>Thư viện</p>
              <ul className='pl-10'>
                <li className='list-disc'><span className='font-medium'>Chartjs</span> :vẽ đồ thị</li>
                <li className='list-disc'><span className='font-medium'>Mqtt-react</span> :kết nối react với mqtt broker</li>
                <li className='list-disc'><span className='font-medium'>Axios</span> :giao tiếp với be(php) qua api</li>
              </ul>
            </div>
            <div>
              <p className='font-bold'>Tính năng chính</p>
              <ul className='pl-10'>
                <li className='list-disc'>phân quyền người dùng</li>
                <li className='list-disc'>hiển thị dữ liệu được gửi từ broker</li>
                <li className='list-disc'>hiển thị lịch sử được ghi lại từ database thông qua api</li>
                <li className='list-disc'>chỉnh sửa giới hạn của các iot device trong database</li>
                <li className='list-disc'>pub mess điều khiển công tắc, thay đổi chân gpio, thêm thiết bị được kết nối trong esp</li>
                <li></li>
              </ul>
            </div>
            <BlockCode codeString={`const helo = dhh
console.log('hello')` } language={'javascript'} path={'/src/Profile.jsx'} />
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
    </div>
  );
};

export default Profile;