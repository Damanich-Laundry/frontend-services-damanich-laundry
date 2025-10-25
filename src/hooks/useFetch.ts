import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchWithAuthClient } from '@/utils/connections';

export interface UseFetchOptions {
  immediate?: boolean; // Whether to fetch immediately on mount
  dependencies?: any[]; // Dependencies for refetch
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isSuccess: boolean;
  isError: boolean;
}

/**
 * Custom hook for fetching data with loading and error states
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @param hookOptions - Hook-specific options
 * @returns Object containing data, loading, error states and refetch function
 */
export function useFetch<T = any>(
  url: string | URL,
  options: RequestInit = {},
  hookOptions: UseFetchOptions = {}
): UseFetchReturn<T> {
  const { immediate = true, dependencies = [] } = hookOptions;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const stableDependencies = useMemo(() => dependencies, [dependencies]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchWithAuthClient(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData, stableDependencies]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    isSuccess: !loading && !error && data !== null,
    isError: !loading && error !== null,
  };
}
