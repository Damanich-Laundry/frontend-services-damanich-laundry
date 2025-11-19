import { useCallback, useState } from 'react';
import {
  customerService,
  type CustomerRecord,
  type UpdateCustomerPayload,
} from '@/services/customerService';

export interface UseUpdateCustomerReturn {
  updateCustomer: (
    customerId: string | number,
    payload: UpdateCustomerPayload
  ) => Promise<CustomerRecord | null>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useUpdateCustomer = (): UseUpdateCustomerReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateCustomer = useCallback(
    async (customerId: string | number, payload: UpdateCustomerPayload) => {
      try {
        setLoading(true);
        setError(null);
        const response = await customerService.updateCustomer(
          customerId,
          payload
        );
        return response;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Gagal memperbarui data pelanggan';
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
    updateCustomer,
    loading,
    error,
    resetError,
  };
};


