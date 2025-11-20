import { useCallback, useState } from 'react';
import { staffService } from '@/services/staffService';

interface UseDeleteStaffReturn {
  deleteStaff: (userId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useDeleteStaff = (): UseDeleteStaffReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteStaff = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      await staffService.deleteUser(userId);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal menghapus staff';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = () => setError(null);

  return {
    deleteStaff,
    loading,
    error,
    resetError,
  };
};