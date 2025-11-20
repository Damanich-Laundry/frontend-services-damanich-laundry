import { useCallback, useEffect, useState } from 'react';
import {
  customerService,
  type CustomerRecord,
} from '@/services/customerService';

export interface UseCustomerDetailReturn {
  customer: CustomerRecord | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCustomerDetail = (
  customerId?: string | number
): UseCustomerDetailReturn => {
  const [customer, setCustomer] = useState<CustomerRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomer = useCallback(async () => {
    if (!customerId) {
      setCustomer(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await customerService.getCustomerById(customerId);
      setCustomer(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Gagal memuat detail pelanggan';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    void fetchCustomer();
  }, [fetchCustomer]);

  return {
    customer,
    loading,
    error,
    refetch: fetchCustomer,
  };
};



