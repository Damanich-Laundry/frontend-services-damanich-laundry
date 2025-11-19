import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/main_provider";
import { siteMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ogImage = `${siteMetadata.siteUrl}/assets/Logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  applicationName: siteMetadata.siteName,
  title: {
    default: siteMetadata.defaultTitle,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.defaultKeywords,
  authors: [{ name: siteMetadata.siteName }],
  creator: siteMetadata.siteName,
  publisher: siteMetadata.siteName,
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    siteName: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    title: siteMetadata.defaultTitle,
    description: siteMetadata.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteMetadata.twitterHandle,
    title: siteMetadata.defaultTitle,
    description: siteMetadata.description,
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
  appleWebApp: {
    title: siteMetadata.siteName,
    statusBarStyle: "default",
    capable: true,
  },
  category: "business",
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}