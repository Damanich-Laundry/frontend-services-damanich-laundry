"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout, LoginForm } from "@/components/modules/auth-pages";
import MyModal from "@/components/Modal/MyModal";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
  const router = useRouter();
  const { login, loading, error } = useLogin();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorModalOpen(true);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({ email, password });

      setSuccessModalOpen(true);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch {
    }
  };

  return (
    <>
      <AuthLayout imageUrl="/assets/Logo.png" imageAlt="Login illustration">
        <LoginForm
          onSubmit={handleSubmit}
          forgotPasswordLink="/auth/forgot-password"
          signUpLink="#"
          onGoogleLogin={() => alert("Google login belum setup")}
          onAppleLogin={() => alert("Apple login belum setup")}
        />
      </AuthLayout>

      <MyModal
        title="Login Berhasil"
        isOpen={successModalOpen}
        onOpen={() => setSuccessModalOpen(true)}
        onOpenChange={setSuccessModalOpen}
        size="sm"
      >
        <p style={{ fontSize: 16 }}>Anda berhasil masuk. Mengarahkan ke dashboard...</p> 
      </MyModal>

      <MyModal
        title="Login Gagal"
        isOpen={errorModalOpen}
        onOpen={() => setErrorModalOpen(true)}
        onOpenChange={setErrorModalOpen}
        size="sm"
      >
        <p style={{ fontSize: 16, color: "red" }}>{error || "Terjadi kesalahan saat login"}</p>
      </MyModal>
    </>
  );
};

export default LoginPage;