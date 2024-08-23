import React from 'react'
import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";
import { GoProjectSymlink } from "react-icons/go";
import { DiCoffeescript } from "react-icons/di";
import { MdContactMail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";


const Navbar = () => {
  return (
    <div className='bg-[#f0f9ff] fixed overflow-y-auto shadow-md flex w-full h-[50px] items-center'>
      <Link to='/'>
      <div className='ml-[80px] flex items-center align-center '>
        <img src='/public/logo.png' className='w-[25px] h-[25px] mr-2'/>
        <h1 className='text-lg'>Good<span className='font-bold text-orange-600'>At</span></h1>
      </div>
      </Link>
      <div className='flex w-[500px] gap-4 text-sm ml-[40%] h-full items-center '>
        <Link className='flex items-center italic text-gray-900 justify-center' to='/'><IoHome className='mr-2 '/>Home</Link>
        <Link className='flex items-center italic text-gray-900 justify-center' to='/about'><FaCircleInfo className='mr-2'/>About</Link>
        <Link className='flex items-center italic text-gray-900 justify-center' to='/projects'><GoProjectSymlink className='mr-2'/>Projects</Link>
        <Link className='flex items-center italic text-gray-900 justify-center' to='/testimonials'><DiCoffeescript className='mr-2'/>Testimonials</Link>
        <Link className='flex items-center italic text-gray-900 justify-center' to='/contact'><MdContactMail className='mr-2'/>Contact</Link>
      

      </div>
      <div>
      <button className='text-gray-900 text-sm flex items-center pl-2 bg-blue-200 font-bold py-1   w-[100px] rounded-full'> <Link className='flex items-center  italic text-gray-900 justify-center' to='/login'>Sign in</Link>
      <button className='bg-gray-900 rounded-full  flex items-center justify-center ml-[14px] h-[30px] w-[30px] '><FaArrowRight className='text-white'/></button>
      </button>
      </div>
    </div>
  )
}

export default Navbar