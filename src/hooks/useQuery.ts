import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchWithAuthClient } from '@/utils/connections';

interface UseQueryOptions {
  enabled?: boolean; // Whether the query should run
  staleTime?: number; // Time in ms before data is considered stale
  cacheTime?: number; // Time in ms to keep data in cache
  refetchOnWindowFocus?: boolean; // Refetch when window regains focus
  retry?: number; // Number of retry attempts
  retryDelay?: number; // Delay between retries in ms
}

interface UseQueryReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isSuccess: boolean;
  isError: boolean;
  isStale: boolean;
  isFetching: boolean;
}

// Simple in-memory cache
const queryCache = new Map<string, { data: any; timestamp: number; staleTime: number }>();

/**
 * Advanced query hook with caching, retry logic, and stale data handling
 * @param queryKey - Unique key for caching
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @param hookOptions - Hook-specific options
 * @returns Object containing data, loading, error states and utilities
 */
export function useQuery<T = any>(
  queryKey: string,
  url: string | URL,
  options: RequestInit = {},
  hookOptions: UseQueryOptions = {}
): UseQueryReturn<T> {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes default
    cacheTime = 10 * 60 * 1000, // 10 minutes default
    refetchOnWindowFocus = true,
    retry = 3,
    retryDelay = 1000,
  } = hookOptions;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isStale, setIsStale] = useState<boolean>(false);
  
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (isRetry = false): Promise<void> => {
    if (!enabled) return;

    // Check cache first
    const cachedData = queryCache.get(queryKey);
    if (cachedData && !isRetry) {
      const now = Date.now();
      const isDataStale = now - cachedData.timestamp > cachedData.staleTime;
      
      setData(cachedData.data);
      setIsStale(isDataStale);
      
      if (!isDataStale) {
        setLoading(false);
        return;
      }
    }

    try {
      if (!isRetry) {
        setLoading(true);
      }
      setIsFetching(true);
      setError(null);

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      const requestOptions: RequestInit = {
        ...options,
        signal: abortControllerRef.current.signal,
      };

      const response = await fetchWithAuthClient(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Update cache
      queryCache.set(queryKey, {
        data: result,
        timestamp: Date.now(),
        staleTime,
      });

      setData(result);
      setIsStale(false);
      retryCountRef.current = 0;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled
      }

      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      // Retry logic
      if (retryCountRef.current < retry) {
        retryCountRef.current++;
        setTimeout(() => {
          fetchData(true);
        }, retryDelay);
        return;
      }

      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [enabled, queryKey, url, options, staleTime, retry, retryDelay]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      const cachedData = queryCache.get(queryKey);
      if (cachedData) {
        const now = Date.now();
        const isDataStale = now - cachedData.timestamp > cachedData.staleTime;
        if (isDataStale) {
          fetchData();
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, queryKey, fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Cache cleanup
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      for (const [key, value] of queryCache.entries()) {
        if (now - value.timestamp > cacheTime) {
          queryCache.delete(key);
        }
      }
    };

    const interval = setInterval(cleanup, cacheTime);
    return () => clearInterval(interval);
  }, [cacheTime]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(),
    isSuccess: !loading && !error && data !== null,
    isError: !loading && error !== null,
    isStale,
    isFetching,
  };
}
