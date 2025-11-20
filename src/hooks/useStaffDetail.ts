import { useCallback, useEffect, useState } from 'react';
import { staffService, type UserRecord } from '@/services/staffService';

export interface UseStaffDetailReturn {
  staff: UserRecord | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStaffDetail = (
  staffId: string | number | undefined
): UseStaffDetailReturn => {
  const [staff, setStaff] = useState<UserRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = useCallback(async () => {
    if (!staffId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await staffService.getUserById(staffId);
      setStaff(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal memuat data staff';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return {
    staff,
    loading,
    error,
    refetch: fetchStaff,
  };
};

