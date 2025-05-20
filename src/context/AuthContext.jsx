import React,{ createContext, useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


axios.defaults.credentials = true;

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
    try {
        const response = await axios.post(`${API_URL}register`, {
            username,
            email,
            password,
        });
        const { token, userId } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(username, email, userId));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({username, email, userId});
        return response.data;
    }catch (error) {
        setError(error.response?.data?.message || 'Registration failed');   
        throw error;
    }
};

const login = async(username, password) => {
    try {
        const response = await axios.post(`${API_URL}login`, {
            username,
            password,
        });
        const { token, userId, email } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(email, userId, username));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({username, email, userId});
        return response.data;
    } catch (error) {
        setError(error.response?.data?.message || 'Login failed');
        throw error;
    }
}

const googleLogin = async (idToken) => {
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
        const response = await axios.post(`${API_URL}refresh`);
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
        user,
        loading,
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