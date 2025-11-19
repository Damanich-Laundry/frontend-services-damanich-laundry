import axios, { AxiosHeaders } from 'axios';
import { BASE_API } from '@/lib/environment';

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