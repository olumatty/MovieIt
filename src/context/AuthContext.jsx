import React,{ createContext, useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


 axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8000/api/v1/auth/';

useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
        setUser(JSON.parse(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
}, []);

const register = async (username, email, password) => {
    console.log("Registering with:", { username, email, password })
    try {
        const response = await axios.post(`${API_URL}register`, {
            username,
            email,
            password,
        });
        const { token, userId } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({username, email, userId}));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({username, email, userId});
        return response.data;
    }catch (error) {
        setError(error.response?.data?.message || 'Registration failed');   
        throw error;
    }
};

const login = async(email, password) => {
    console.log("Logging in with:", { email, password });
    try {
        const response = await axios.post(`${API_URL}login`, {
            email,
            password,
        });
        const { token, userId, username } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({email, userId, username}));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({username, email, userId});
        return response.data;
    } catch (error) {
        setError(error.response?.data?.message || 'Login failed');
        throw error;
    }
}

const googleLogin = async (idToken) => {
    console.log("Logging in with Google:", { idToken });
    try {
        const response = await axios.post(`${API_URL}google`, {idToken});
        const {token, userId, email, displayName} = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({email, userId, username:displayName}));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({username: displayName, email, userId});
        return response.data;
    } catch (error) {
        setError(error.response?.data?.message || 'Google Login failed');
        throw error;
    }
}
    
const logout = async() => {
    try{
        await axios.post(`${API_URL}logout`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
       
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    } catch (error) {
        setError(error.response?.data?.message || 'Logout failed');
        throw error;
    }
}

const refreshToken = async() => {
    try {
        const response = await axios.get(`${API_URL}refresh`);
        const { token } = response.data;

        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
        setError(error.response?.data?.message || 'Token refresh failed');
        throw error;
    }
}
 return (
    <AuthContext.Provider value={{
        loading,
        user,
        error,
        register,
        login,
        googleLogin,
        logout,
        refreshToken
    }}>
        {children}
    </AuthContext.Provider>
 );
};