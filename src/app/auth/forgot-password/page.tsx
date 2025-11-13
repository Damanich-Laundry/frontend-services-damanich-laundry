"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AuthLayout, ForgotPasswordForm } from "@/components/modules/auth-pages";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, email: string) => {
    e.preventDefault();
    console.log("Reset password link sent to:", email);
    setTimeout(() => router.push("/auth/login"), 1500);
  };

  return (
    <AuthLayout imageUrl="/assets/Logo.png" imageAlt="Forgot password illustration">
      <ForgotPasswordForm onSubmit={handleSubmit} backToLoginLink="/auth/login" />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
