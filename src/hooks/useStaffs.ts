import { useCallback, useEffect, useState } from 'react';
import { staffService, type StaffRecord } from '@/services/staffService';

export interface UseStaffsReturn {
  staffs: StaffRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStaffs = (): UseStaffsReturn => {
  const [staffs, setStaffs] = useState<StaffRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaffs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await staffService.getStaffs();
      setStaffs(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal memuat data pelanggan';
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

