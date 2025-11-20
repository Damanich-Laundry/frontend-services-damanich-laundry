import { useCallback, useState } from 'react';
import { staffService, UserRecord } from '@/services/staffService';

interface CreateStaffPayload {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role: string;
  phone: string;
}

interface UseCreateStaffReturn {
  createStaff: (payload: CreateStaffPayload) => Promise<UserRecord | null>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useCreateStaff = (): UseCreateStaffReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createStaff = useCallback(async (payload: CreateStaffPayload) => {
    try {
      setLoading(true);
      setError(null);
    
      if (!payload.username || !payload.email || !payload.full_name) {
        throw new Error('Data tidak lengkap. Mohon isi semua field yang wajib.');
      }

      if (!payload.password || payload.password.length < 6) {
        throw new Error('Password minimal 6 karakter');
      }

      const response = await staffService.createUser(payload);
      return response;
    } catch (err) {
      let message = 'Gagal menambahkan staff baru';
      
      if (err instanceof Error) {
        message = err.message;
      }
      if (err && typeof err === 'object' && 'response' in err) {
        const apiError = err as any;
        if (apiError.response?.data?.message) {
          message = apiError.response.data.message;
        } else if (apiError.response?.data?.details) {
          const details = apiError.response.data.details;
          if (Array.isArray(details) && details.length > 0) {
            message = details.map((d: any) => d.message).join(', ');
          }
        } else if (apiError.response?.status === 409) {
          message = 'Username atau email sudah digunakan';
        } else if (apiError.response?.status === 400) {
          message = 'Data tidak valid. Periksa kembali inputan Anda';
        }
      }
      
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = () => setError(null);

  return {
    createStaff,
    loading,
    error,
    resetError,
  };
};