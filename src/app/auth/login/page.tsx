"use client";

import React from 'react';
import { AuthLayout, LoginForm } from '@/components/modules/auth-pages';

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login form submitted');
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login clicked');
  };

  const handleAppleLogin = () => {
    // Handle Apple login logic here
    console.log('Apple login clicked');
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