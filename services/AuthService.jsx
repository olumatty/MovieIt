import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

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
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    logout: () => {
        try {
            axios.get(`${API_URL}/logout`);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
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
        const userParam = urlParams.get('user'); // Renamed to avoid conflict if you parse user from token

        let success = false; // Variable to indicate if handling was successful

        if (token) {
            localStorage.setItem('token', token);
            // You might want to save the raw userParam here initially if you need it later,
            // or rely solely on the token payload for user info.
             localStorage.setItem('user', JSON.stringify(userParam)); 

            try{
                // Now, attempt to parse the token ONLY if it exists
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(window.atob(base64));

                if(payload){
                    localStorage.setItem('user',JSON.stringify({
                        id: payload.id,
                        email: payload.email,
                    }));
                    success = true;
                }
            } catch(error){
                console.error('Error during token handling:', error);
                // If token handling fails, you might want to clear potentially bad data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Don't re-throw here if you want the calling code to handle the failure gracefully
            }
        } else {
            console.warn('No token found in URL parameters.');
             // If no token is found, handling was not successful
             success = false;
        }

        // Return the success status so the calling component can decide to navigate
        return success;
    }

};

export default AuthService;
    