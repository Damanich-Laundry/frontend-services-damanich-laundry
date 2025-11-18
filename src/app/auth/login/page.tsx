"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout, LoginForm } from "@/components/modules/auth-pages";
import MyModal from "@/components/Modal/MyModal"; // pastikan path sesuai

const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const LoginPage = () => {
  const router = useRouter();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/authentications/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("RAW RESPONSE =", data);

      if (!res.ok) {
        setErrorMessage(data.message || "Login gagal.");
        setErrorModalOpen(true);
        return;
      }

      const accessToken = data?.tokens?.accessToken;
      const refreshToken = data?.tokens?.refreshToken;

      if (!accessToken) {
        setErrorMessage("Token tidak ditemukan dalam respons API.");
        setErrorModalOpen(true);
        return;
      }

      setCookie("ACCESS_TOKEN", accessToken, 7);
      setCookie("REFRESH_TOKEN", refreshToken, 7);

      // Tampilkan modal sukses
      setSuccessModalOpen(true);

      // Redirect setelah 1,5 detik
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setErrorMessage("Terjadi kesalahan server.");
      setErrorModalOpen(true);
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

      {/* Modal sukses */}
      <MyModal
        title="Login Berhasil"
        isOpen={successModalOpen}
        onOpen={() => setSuccessModalOpen(true)}
        onOpenChange={setSuccessModalOpen}
        size="sm"
      >
        <p style={{ fontSize: 16 }}>Anda berhasil masuk. Mengarahkan ke dashboard...</p>
      </MyModal>

      {/* Modal gagal */}
      <MyModal
        title="Login Gagal"
        isOpen={errorModalOpen}
        onOpen={() => setErrorModalOpen(true)}
        onOpenChange={setErrorModalOpen}
        size="sm"
      >
        <p style={{ fontSize: 16, color: "red" }}>{errorMessage}</p>
      </MyModal>
    </>
  );
};

export default LoginPage;
