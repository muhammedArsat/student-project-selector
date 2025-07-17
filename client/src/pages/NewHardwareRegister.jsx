import React from 'react'
import RegisterProject from '../components/RegisterProject'
const NewHardwareRegister = () => {
  return (
    <div className="overflow-auto h-[600px] p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 ">
      <h1 className='font-lexend text-subheading'>New Hardware Project</h1>
      <p className='font-inter text-body text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ipsam porro quis fuga debitis provident.</p>
      <RegisterProject category={"Hardware"} />
      
    </div>
  )
}

export default NewHardwareRegister
