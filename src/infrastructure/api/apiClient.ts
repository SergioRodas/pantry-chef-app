import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptores para debug
apiClient.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
); 