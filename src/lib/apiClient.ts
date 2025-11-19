import axios, {AxiosHeaders} from 'axios';
import {BASE_API} from '@/lib/environment';

const getAuthTokenFromCookie = (name: string): string | null => {
    if (typeof document === 'undefined') {
        return null;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() ?? null;
    }

    return null;
};

export const apiClient = axios.create({
    baseURL: BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthTokenFromCookie('DAMANICH_AUTH_TOKEN');

        if (token) {
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }

            if (config.headers instanceof AxiosHeaders) {
                config.headers.set('Authorization', `Bearer ${token}`);
            } else {
                (config.headers as Record<string, unknown>).Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Jika status 401, hapus cookie dan redirect
        if (error.response?.status === 401) {
            if (typeof document !== 'undefined') {
                document.cookie = 'DAMANICH_AUTH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'DAMANICH_REFRESH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                if (window.location.pathname !== '/auth/login') {
                    window.location.href = '/auth/login';
                }
            }
        }

        // Ambil property data dari error response
        if (error.response?.data) {
            return Promise.reject(error.response.data);
        }

        // fallback jika error.response.data tidak ada
        return Promise.reject(error);
    }
);