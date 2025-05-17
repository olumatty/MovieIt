import React from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';



const Movie = () => {
  const Navigate = useNavigate();

  const handleLogout = () => {
    try{
      AuthService.logout();
      Navigate("/")
    } catch(error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-10'>Movie Page</h1>
      <p className='text-center text-gray-500 text-sm'>This is the movie page.</p>

      <button 
        className='bg-blue-500 flex items-center justify-center mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-10'
        onClick={handleLogout}>
        Logout
      </button>

    </div>
  )
}

export default Movie
