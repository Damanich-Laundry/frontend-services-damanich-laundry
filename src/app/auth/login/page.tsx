"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout, LoginForm } from '@/components/modules/auth-pages';

/**
 * Generate a mock JWT token for testing purposes
 * In production, this should come from your authentication API
 */
const generateMockJWT = (): string => {
  // JWT Header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // JWT Payload with user information
  const payload = {
    sub: '12345', // User ID
    email: 'user@example.com',
    name: 'Test User',
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // Expires in 7 days
  };

  // Base64 encode header and payload
  const base64UrlEncode = (obj: any): string => {
    const base64 = btoa(JSON.stringify(obj));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  // Create a mock signature (in production, this should be properly signed)
  const signature = 'mock_signature_for_testing_purposes_only';

  // Combine to create JWT
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Set cookie helper function
 */
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Generate mock JWT token
    const mockToken = generateMockJWT();
    
    // Set token in cookies
    setCookie('DAMANICH_AUTH_TOKEN', mockToken, 7);
    
    // Redirect to dashboard after successful login
    router.push('/');
  };

  const handleGoogleLogin = () => {
    // Generate mock JWT token for social login
    const mockToken = generateMockJWT();
    setCookie('DAMANICH_AUTH_TOKEN', mockToken, 7);
    router.push('/');
  };

  const handleAppleLogin = () => {
    // Generate mock JWT token for social login
    const mockToken = generateMockJWT();
    setCookie('DAMANICH_AUTH_TOKEN', mockToken, 7);
    router.push('/');
  };

  return (
    <AuthLayout
      imageUrl="https://placehold.co/800x1000/e0e0e0/ffffff?text=X"
      imageAlt="Login illustration"
    >
      <LoginForm
        onSubmit={handleSubmit}
        onGoogleLogin={handleGoogleLogin}
        onAppleLogin={handleAppleLogin}
        forgotPasswordLink="#"
        signUpLink="#"
      />
    </AuthLayout>
  );
};

export default LoginPage;