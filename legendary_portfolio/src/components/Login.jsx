import React, { useState } from 'react';
import { IoLogoApple } from "react-icons/io5";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [visiblePassword, setVisiblePassword]= useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({
      ...formData,
      [name]: value // Use computed property name to update the specific field
    });
  };
  const navigate= useNavigate()

  const togglePasswordVisibility = ()=>{
    setVisiblePassword (!visiblePassword)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    const opts={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    }

fetch('http://127.0.0.1:5555/user/login',opts)
.then((response)=>{
  if (response.ok){
    return response.json()
  }
  else{
    throw new Error("Failed to login.Please try again!")
  }
})

.then((data)=>{
  console.log (data)
  sessionStorage.setItem("token", data.access_token)
  sessionStorage.setItem("userId", data.id)
  navigate("/")
})

  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-[1100px] h-[500px] bg-[#fdfcfa] mt-[50px] rounded-xl grid grid-cols-3 gap-7'>
        <div className='bg-white shadow-md my-5 mx-5 rounded-xl'>
          <div className='flex mt-7 w-full items-center justify-center '>
            <h1 className='text-xl text-center font-bold'>User Login</h1>
          </div>
          <div className='flex flex-col w-full items-center justify-center text-center text-sm mt-3'>
            <p>Hey, Enter your details to View the</p>
            <p>Legendary portfolio</p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full items-center justify-center mt-9'>
            <input
              name="email"
              className='flex p-1.5 px-5 outline-none border text-[12px] rounded-lg w-[250px]'
              type='text'
              value={formData.email}
              placeholder='Enter email/phone number'
              onChange={handleInputChange}
            />
            <div className='flex border rounded-lg w-[250px] '>
            <input
              name="password"
              className='flex p-1.5 px-5 outline-none text-[12px] rounded-lg w-[250px]'
              type={visiblePassword ? "text" : "password"}
              value={formData.password}
              placeholder='Enter password'
              onChange={handleInputChange}
            />
            <button onClick={togglePasswordVisibility} className='mr-3'>{visiblePassword ? <IoIosEyeOff />  :<FaEye /> } </button>
            </div>
            <button
              className='flex items-center justify-center mt-7 p-1.5 px-5 outline-none bg-[#ffd37c] hover:shadow-md rounded-lg w-[250px]'
              type='submit'
            >
              <p className='text-sm'>Sign in</p>
            </button>

            <div className='mt-5'>
              <div className='flex w-full items-center justify-center'>
                <h1 className='text-[12px]'>- Or Sign in with -</h1>
              </div>

              <div className='flex w-full gap-2 mt-3'>
                <button>
                  <p className='flex items-center justify-center text-[12px] font-bold border hover:shadow-md px-2 py-1 rounded-md'>
                    <FaGoogle className='mr-2' />Google
                  </p>
                </button>
                <button>
                  <p className='text-[12px] flex items-center justify-center font-bold border hover:shadow-md px-2 py-1 rounded-md'>
                    <IoLogoApple className='mr-2' />Apple Id
                  </p>
                </button>
                <button>
                  <p className='text-[12px] flex items-center justify-center font-bold border hover:shadow-md px-2 py-1 rounded-md'>
                    <FaFacebook className='mr-2' />Facebook
                  </p>
                </button>
              </div>
              <div className='flex w-full items-center justify-center mt-8'>
                <p className='text-[12px]'>
                  Don't have an account? <Link to="/signup" className='font-bold'>Sign up</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className='border loginImage border-[#fffbeb] shadow-md my-5 mx-5 rounded-xl col-span-2'>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
