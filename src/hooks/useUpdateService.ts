import { useCallback, useState } from 'react';
import {
  serviceService,
  type ServiceRecord,
  type UpdateServicePayload,
} from '@/services/serviceService';

export interface UseUpdateServiceReturn {
  updateService: (
    serviceId: string | number,
    payload: UpdateServicePayload
  ) => Promise<ServiceRecord | null>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useUpdateService = (): UseUpdateServiceReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateService = useCallback(
    async (serviceId: string | number, payload: UpdateServicePayload) => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceService.updateService(
          serviceId,
          payload
        );
        return response;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Gagal memperbarui layanan';
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
    updateService,
    loading,
    error,
    resetError,
  };
};



