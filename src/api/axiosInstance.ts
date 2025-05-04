import axios from 'axios';
import { store } from '../store/store';

export const axiosInstance = axios.create({
    headers: { 'Content-Type': 'application/json'},
    baseURL: import.meta.env.VITE_API_URL
});

axiosInstance.interceptors.request.use((config) => {
    const { auth: { token } } = store.getState();

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});
