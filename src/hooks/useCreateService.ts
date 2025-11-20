import { useCallback, useState } from 'react';
import { isAxiosError } from 'axios';
import {
  serviceService,
  type CreateServicePayload,
  type ServiceRecord,
} from '@/services/serviceService';

const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const apiMessage =
      (error.response?.data as { message?: string })?.message ??
      error.response?.statusText;
    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Gagal membuat layanan baru. Coba lagi.';
};

export interface UseCreateServiceReturn {
  createService: (
    payload: CreateServicePayload
  ) => Promise<ServiceRecord | null>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useCreateService = (): UseCreateServiceReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createService = useCallback(
    async (payload: CreateServicePayload) => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceService.createService(payload);
        return response;
      } catch (err) {
        const message = getErrorMessage(err);
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
    createService,
    loading,
    error,
    resetError,
  };
};


