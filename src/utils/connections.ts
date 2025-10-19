import { cookies } from 'next/headers';

/**
 * Custom fetch function that automatically includes Authorization header from cookies
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @returns Promise<Response>
 */
export async function fetchWithAuth(
  url: string | URL,
  options: RequestInit = {}
): Promise<Response> {
  // Get the Authorization cookie value
  const cookieStore = await cookies();
  const authToken = cookieStore.get('Authorization')?.value;

  // Prepare headers
  const headers = new Headers(options.headers);

  // Add Authorization header if token exists
  if (authToken) {
    headers.set('Authorization', authToken);
  }

  // Merge with existing options
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, fetchOptions);
}

/**
 * Client-side fetch function that includes Authorization header from cookies
 * Use this function in client components or browser environments
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @returns Promise<Response>
 */
export function fetchWithAuthClient(
  url: string | URL,
  options: RequestInit = {}
): Promise<Response> {
  // Get the Authorization cookie value from document.cookie
  const getCookieValue = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  const authToken = getCookieValue('Authorization');

  // Prepare headers
  const headers = new Headers(options.headers);

  // Add Authorization header if token exists
  if (authToken) {
    headers.set('Authorization', authToken);
  }

  // Merge with existing options
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, fetchOptions);
}
