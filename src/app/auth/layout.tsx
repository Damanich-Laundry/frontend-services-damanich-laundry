"use client";

import { Providers } from "@/providers/main_provider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}

