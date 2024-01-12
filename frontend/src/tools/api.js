import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // replace with your DRF API base URL
});

// Function to get the JWT token from your storage
const getJwtToken = () => {
    return localStorage.getItem('access_token'); // replace with your token storage mechanism
};

// Function to refresh the JWT token
const refreshJwtToken = async () => {
    
    const refreshToken = localStorage.getItem('refresh_token');
    //console.log(refreshToken);
    if(!refreshToken){
        console.log("Go to login")
        window.location.href = "/logout"
    }
    api.post('token/refresh/', { refresh: refreshToken }).then((resp) => {
        console.log("HERE")
        if(resp.data.code === "token_not_valid"){
            console.log("We are going to login")
            window.location.href = "/logout"
        }
        const newAccessToken = resp.data.access;
        localStorage.setItem('access_token', newAccessToken);
        return newAccessToken;
    }).catch((resp) => {
        console.log(resp);
        if(resp.response.data.code === "token_not_valid"){
            console.log("We are going to login")
            window.location.href = "/logout"
        }
    })
};

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Retrieve the JWT token
        const jwtToken = getJwtToken();

        // Add the token to the headers if it exists
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Check if the error is due to an expired token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshJwtToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.log(refreshError);
                // Handle token refresh failure (e.g., redirect to login page)
                throw refreshError;
            }
        }

        return Promise.reject(error);
    }
);

export default api;