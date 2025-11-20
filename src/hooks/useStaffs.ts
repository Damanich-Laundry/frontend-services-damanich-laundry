import { useEffect, useState, useCallback } from 'react';
import { staffService, UserRecord } from '@/services/staffService';

interface UseStaffsReturn {
  staffs: UserRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStaffs = (): UseStaffsReturn => {
  const [staffs, setStaffs] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaffs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await staffService.getUsers();
      setStaffs(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal memuat data staff';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs]);

  return {
    staffs,
    loading,
    error,
    refetch: fetchStaffs,
  };
};