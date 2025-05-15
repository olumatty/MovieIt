import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService';

const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() =>{
        const success = AuthSuccess.handleAuthCallback();

        if (success) {
            navigate("/movie");
        } else {
            navigate("/login");
        }
    },[navigate])
  return (
    <div className='text-center mt-5'>
        <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Completing authentication...</p>
    </div>
      
    </div>
  )
}

export default AuthSuccess
