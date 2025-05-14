import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const AuthService = {
    register: async (username, email, password) => {
        try{
            const response = await api.post('/register', {
                username,
                email,
                password,
            });
            
            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data) || {email: email});
            }
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }

    },

    login: async (username, password) => {
        try {
            const response = await api.post('/login', {
                username,
                password,
            });
            
            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data) || {email: email});
            }
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    logout: () => {
        try {
            api.get(`${API_URL}/logout`)
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    },

    getCurrentUser: () => {
        const useStr = localStorage.getItem('user');
        if (useStr) {
            return JSON.parse(useStr);
        }
        return null;
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    loginWithGoogle: () => {
        window.location.href = 'http://localhost:8000/api/auth/google';
    },

    loginWithGithub: () => {
        window.location.href = 'http://localhost:8000/api/auth/github';
    },

    handleAuthCallback: () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const user = urlParams.get('user');

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }

        try{
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));

            if(payload){
                localStorage.setItem('user',JSON.stringify({
                    id: payload.id,
                    email: payload.email,
                    username: payload.username,
                }))
            }
        } catch(error){
            console.error('Error during token handling:', error);
            throw error;
        }
        
    }

};

export default AuthService;
    