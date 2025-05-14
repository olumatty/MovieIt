import React from 'react'
import Logo from "../assets/moveit.svg"
import bgImage from "../assets/Homepage-bg.webp"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const navigate =useNavigate()
  return (
    <motion.div 
    className="sticky top-0 z-[9999] flex-none w-full h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <motion.header 
      className='w-full px-3 py-3 top-0 z-30 transition-all duration-300'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className='max-w-[1440px] mx-auto px-4'>
        <div className='flex items-center justify-between'>
          <motion.div 
            className='flex items-center'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={Logo} alt="Logo" className='w-10 h-10' />
            <h1 className='text-2xl font-bold ml-2'>MoveIt</h1>
          </motion.div>
          <div className='flex items-center space-x-4'>
            <motion.button
              className='bg-[#ff0000] hover:bg-red-300 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              onClick={() => navigate("/login")}
            >
              Login
            </motion.button>
            <motion.button
              className='bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              onClick={() => navigate("/signup")}
            >

              Sign Up
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>

    <div className='flex relative items-center px-3 py-3 justify-center mt-8'>
      <motion.img 
        src={bgImage} 
        alt='Background' 
        loading="lazy" 
        className='w-full h-screen object-cover relative inset-0'
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
      />
      <motion.div 
        className='absolute inset-0 opacity-60'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.2 }}
      >
        <div className='max-w-[1440px]flex mt-60 mx-auto px-4'>
          <motion.h1 
            className='text-6xl text-white font-bold text-center mb-4'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Welcome to MoveIt
          </motion.h1>
          <motion.p 
            className='text-lg text-white text-center mb-8 font-semibold'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Get caught up in your world of fiction
          </motion.p>
        </div>
      </motion.div>
    </div>
  </motion.div>
  )
}

export default Homepage ;
