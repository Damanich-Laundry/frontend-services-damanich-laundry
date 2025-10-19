import { useState, useCallback } from 'react';
import { fetchWithAuthClient } from '@/utils/connections';

interface UseMutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onSettled?: () => void;
}

interface UseMutationReturn<TData = any, TVariables = any> {
  mutate: (variables?: TVariables) => Promise<TData | null>;
  mutateAsync: (variables?: TVariables) => Promise<TData | null>;
  data: TData | null;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
}

/**
 * Custom hook for mutations (POST, PUT, DELETE) with loading and error states
 * @param url - The URL to make the request to
 * @param options - Base fetch options (method, headers, etc.)
 * @param hookOptions - Hook-specific options (callbacks)
 * @returns Object containing mutation function and states
 */
export function useMutation<TData = any, TVariables = any>(
  url: string | URL,
  options: RequestInit = {},
  hookOptions: UseMutationOptions = {}
): UseMutationReturn<TData, TVariables> {
  const { onSuccess, onError, onSettled } = hookOptions;
  
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (variables?: TVariables): Promise<TData | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const requestOptions: RequestInit = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      };

      // Add body if variables are provided
      if (variables !== undefined) {
        requestOptions.body = JSON.stringify(variables);
      }
      
      const response = await fetchWithAuthClient(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      
      onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      setLoading(false);
      onSettled?.();
    }
  }, [url, options, onSuccess, onError, onSettled]);

  const mutateAsync = mutate; // Alias for consistency with other libraries

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    mutate,
    mutateAsync,
    data,
    loading,
    error,
    isSuccess: !loading && !error && data !== null,
    isError: !loading && error !== null,
    reset,
  };
}
