import { useCallback, useState } from 'react';
import {
  customerService,
  type CreateCustomerPayload,
  type CustomerRecord,
} from '@/services/customerService';

export interface UseCreateCustomerReturn {
  createCustomer: (payload: CreateCustomerPayload) => Promise<CustomerRecord | null>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useCreateCustomer = (): UseCreateCustomerReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomer = useCallback(async (payload: CreateCustomerPayload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerService.createCustomer(payload);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal membuat pelanggan baru';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = () => setError(null);

  return {
    createCustomer,
    loading,
    error,
    resetError,
  };
};

