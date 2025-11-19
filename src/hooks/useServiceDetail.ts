import { useCallback, useEffect, useState } from 'react';
import {
  serviceService,
  type ServiceRecord,
} from '@/services/serviceService';

export interface UseServiceDetailReturn {
  service: ServiceRecord | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useServiceDetail = (
  serviceId?: string | number
): UseServiceDetailReturn => {
  const [service, setService] = useState<ServiceRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchService = useCallback(async () => {
    if (!serviceId) {
      setService(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.getServiceById(serviceId);
      setService(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Gagal memuat detail layanan';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    void fetchService();
  }, [fetchService]);

  return {
    service,
    loading,
    error,
    refetch: fetchService,
  };
};



