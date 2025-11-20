import { useCallback, useState } from 'react';
import {
  staffService,
  type UserRecord,
  type UpdateUserPayload,
} from '@/services/staffService';

export interface UseUpdateStaffReturn {
  updateStaff: (
    userId: string | number,
    payload: UpdateUserPayload
  ) => Promise<UserRecord | null>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useUpdateStaff = (): UseUpdateStaffReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateStaff = useCallback(
    async (userId: string | number, payload: UpdateUserPayload) => {
      try {
        setLoading(true);
        setError(null);
        const response = await staffService.updateUser(userId, payload);
        return response;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Gagal memperbarui data staff';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetError = () => setError(null);

  return {
    updateStaff,
    loading,
    error,
    resetError,
  };
};

