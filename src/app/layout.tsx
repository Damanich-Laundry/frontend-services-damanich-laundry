"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import { Providers } from "@/providers/main_provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Providers>
          <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
              <Navbar pageTitle="Dashboard" onMenuToggle={toggleSidebar} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}