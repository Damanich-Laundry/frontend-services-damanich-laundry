import { useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

export interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  token: string | null;
}

/**
 * Decode JWT token without verification (client-side only)
 * Note: In production, tokens should be verified on the server
 */
const decodeJWT = (token: string): any | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Check if JWT token is expired
 */
const isTokenExpired = (decoded: any): boolean => {
  if (!decoded.exp) {
    return false; // No expiration claim, assume not expired
  }
  
  const expirationTime = decoded.exp * 1000; // Convert to milliseconds
  return Date.now() >= expirationTime;
};

/**
 * Get cookie value by name
 */
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

/**
 * Hook to check user authentication status and get user details from JWT token
 * Checks for DAMANICH_AUTH_TOKEN cookie
 */
export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const checkAuth = useCallback(() => {
    const authToken = getCookie('DAMANICH_AUTH_TOKEN');
    
    if (!authToken) {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    const decoded = decodeJWT(authToken);
    
    if (!decoded || isTokenExpired(decoded)) {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      // Optionally remove expired token
      if (isTokenExpired(decoded)) {
        document.cookie = 'DAMANICH_AUTH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      setLoading(false);
      return;
    }

    // Extract user information from decoded token
    const userData: User = {
      id: decoded.sub || decoded.id || decoded.userId || '',
      email: decoded.email,
      name: decoded.name || decoded.username,
      ...decoded, // Include any other claims
    };

    setIsAuthenticated(true);
    setUser(userData);
    setToken(authToken);
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();

    // Check auth status periodically (every 30 seconds) to catch cookie changes
    const interval = setInterval(checkAuth, 30000);

    return () => clearInterval(interval);
  }, [checkAuth]);

  return {
    isAuthenticated,
    user,
    loading,
    token,
  };
}
