import type { Metadata } from "next";

const FALLBACK_SITE_URL = "http://localhost:3000";

export const siteMetadata = {
  siteName: "Damanich Laundry",
  defaultTitle: "Damanich Laundry Dashboard",
  description:
    "Aplikasi manajemen laundry modern untuk memantau pesanan, pelanggan, layanan, dan tim Damanich Laundry dalam satu dashboard.",
  locale: "id_ID",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || FALLBACK_SITE_URL,
  twitterHandle: "@damanichlaundry",
  defaultKeywords: [
    "laundry",
    "manajemen laundry",
    "damanich",
    "aplikasi laundry",
    "dashboard laundry",
    "POS laundry",
  ],
};

export type PageSeoDescriptor = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

const defaultOgImage = `${siteMetadata.siteUrl}/assets/Logo.png`;

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
}: PageSeoDescriptor): Metadata {
  const canonicalUrl = new URL(path || "/", siteMetadata.siteUrl).toString();
  const ogImage = image || defaultOgImage;

  return {
    title,
    description,
    keywords: keywords ?? siteMetadata.defaultKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteMetadata.twitterHandle,
      images: [ogImage],
    },
  };
}

export const pageSeoMap: Record<string, PageSeoDescriptor> = {
  "/": {
    title: "Dashboard Laundry Pintar",
    description:
      "Pantau performa operasional Damanich Laundry secara real-time, termasuk pendapatan, pesanan terbaru, dan statistik pelanggan.",
    path: "/",
    keywords: [...siteMetadata.defaultKeywords, "dashboard laundry", "statistik laundry"],
  },
  "/customers": {
    title: "Manajemen Pelanggan Laundry",
    description:
      "Kelola daftar pelanggan Damanich Laundry, lihat histori pesanan, dan pantau pelanggan aktif setiap bulan.",
    path: "/customers",
    keywords: [...siteMetadata.defaultKeywords, "pelanggan laundry"],
  },
  "/customers/new": {
    title: "Tambah Pelanggan Laundry",
    description:
      "Tambahkan pelanggan baru untuk mempercepat pencatatan order dan menjaga relasi pelanggan laundry.",
    path: "/customers/new",
  },
  "/orders": {
    title: "Daftar Pesanan Laundry",
    description:
      "Pantau status pesanan laundry, temukan order terbaru, dan kelola proses pencucian hingga selesai.",
    path: "/orders",
    keywords: [...siteMetadata.defaultKeywords, "pesanan laundry", "monitor order"],
  },
  "/orders/new": {
    title: "Buat Pesanan Laundry",
    description:
      "Catat pesanan laundry baru dengan detail layanan, pelanggan, dan pembayaran secara terstruktur.",
    path: "/orders/new",
  },
  "/services": {
    title: "Daftar Layanan Laundry",
    description:
      "Kelola jenis layanan laundry, harga, dan estimasi pengerjaan agar pelanggan mendapat informasi jelas.",
    path: "/services",
  },
  "/services/new": {
    title: "Tambah Layanan Laundry",
    description:
      "Buat layanan laundry baru dengan deskripsi, tarif, dan estimasi selesai untuk katalog usaha Anda.",
    path: "/services/new",
  },
  "/staffs": {
    title: "Manajemen Staf Laundry",
    description:
      "Kelola tim operasional Damanich Laundry, perbarui data staf, dan pantau peran setiap anggota.",
    path: "/staffs",
  },
  "/staffs/new": {
    title: "Tambah Staf Laundry",
    description:
      "Daftarkan anggota tim baru agar kolaborasi operasional laundry berjalan rapi dan terdokumentasi.",
    path: "/staffs/new",
  },
  "/settings": {
    title: "Pengaturan Akun Damanich Laundry",
    description:
      "Atur profil bisnis, informasi pemilik akun, dan preferensi aplikasi sesuai kebutuhan operasional.",
    path: "/settings",
  },
  "/auth/login": {
    title: "Masuk ke Damanich Laundry",
    description:
      "Akses dashboard manajemen Damanich Laundry untuk memonitor pesanan dan kinerja bisnis.",
    path: "/auth/login",
    keywords: ["login damanich laundry", "masuk dashboard laundry"],
  },
  "/auth/forgot-password": {
    title: "Reset Kata Sandi Damanich Laundry",
    description:
      "Kirim permintaan pemulihan kata sandi untuk kembali mengelola dashboard laundry dengan aman.",
    path: "/auth/forgot-password",
  },
};

export function getPageMetadata(path: string, overrides?: Partial<PageSeoDescriptor>) {
  const base = pageSeoMap[path] ?? {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.description,
    path,
    keywords: siteMetadata.defaultKeywords,
  };

  return buildPageMetadata({ ...base, ...overrides, path: overrides?.path ?? base.path });
}

