import { useState } from 'react';
import { authService, type LoginPayload } from '@/services/authService';

export interface UseLoginReturn {
  login: (payload: LoginPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(payload);

      const accessToken = response?.tokens?.accessToken;
      const refreshToken = response?.tokens?.refreshToken;

      if (!accessToken) {
        throw new Error('Token tidak ditemukan dalam respons API.');
      }

      setCookie('DAMANICH_AUTH_TOKEN', accessToken, 7);
      setCookie('DAMANICH_REFRESH_TOKEN', refreshToken, 7);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Terjadi kesalahan saat login';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};

