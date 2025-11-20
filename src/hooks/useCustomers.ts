import { useCallback, useEffect, useState } from 'react';
import { customerService, type CustomerRecord } from '@/services/customerService';

export interface UseCustomersReturn {
  customers: CustomerRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCustomers = (): UseCustomersReturn => {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal memuat data pelanggan';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
  };
};