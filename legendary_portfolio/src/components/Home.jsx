import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {
  return (
    <div className='items-center  grid grid-cols-2 justify-center'>
      
        <div className='w-full  ml-[80px]  flex flex-col'>
          <div className='flex flex-col items-start mt-[50px] h-full text-[50px] font-bold flex-start '>
          <h1 className='text-gray-900'>Designing For</h1>
          <h1 className='text-gray-900'>Amazing</h1>
          <h1 className='text-gray-900'>People</h1>
          </div>

          <div className='mt-1'>
            <p className='text-gray-600 text-sm italic'>Designing sleek applications to meet</p>
            <p className='text-gray-600 text-sm italic'>your aesthetic needs</p>
          </div>

          <div className='mt-7'>
            <button className='text-gray-900 text-sm flex items-center pl-6 bg-blue-200 font-bold py-1   w-[150px] rounded-full'>Hire Me! <button className='bg-gray-900 rounded-full  flex items-center justify-center ml-[36px] h-[30px] w-[30px] '><FaArrowRight className='text-white'/></button></button>
          </div>
          
        </div>
        <div className='w-full flex   object-cover'>
          <video className='h-[550px] object-cover mt-[30px]  w-full rounded-xl' src='/public/857195-hd_1280_720_25fps.mp4' loop autoplay='True' muted/>
          
        </div>
        

      </div>
    
  )
}

export default Home