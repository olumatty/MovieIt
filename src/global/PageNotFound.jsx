import React from 'react'
import NotFoundImage from "../assets/not-found.svg"
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <img src= {NotFoundImage} alt="Page Not Found" className='lg:max-h-[370px] xs:max-h-[270px] max-h-[180px] w-full'/>
        <h1 className='text-3xl font-bold text-center mt-10'>Page Not Found</h1>
        <p className='text-center text-gray-500 text-sm'>The page you are looking for doesn't exist.</p>
        <button className='mt-5 bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-500 transition-colors duration-200'
            onClick={() => navigate("/")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
        >
            Go to Homepage
        </button>
      
    </div>
  )
}

export default PageNotFound
