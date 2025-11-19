import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { serviceService, type ServiceRecord } from '@/services/serviceService';

export interface UseServicesReturn {
  services: ServiceRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const apiMessage =
      (error.response?.data as { message?: string })?.message;
    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Gagal memuat layanan. Coba lagi.';
};

export const useServices = (): UseServicesReturn => {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceService.getServices();
      setServices(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
  };
};


