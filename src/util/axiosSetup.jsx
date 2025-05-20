import React from 'react'
import axios from 'axios';

const axiosSetup = (refreshToken, logoutFn) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshToken();
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (err) {
          logoutFn();
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
    )
}

export default axiosSetup
