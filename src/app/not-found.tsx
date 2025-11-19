import { buildPageMetadata } from "@/lib/seo";
import NotFoundClient from "./NotFoundClient";

export const metadata = buildPageMetadata({
  title: "Halaman Tidak Ditemukan",
  description:
    "Maaf, halaman yang Anda cari tidak tersedia. Kembali ke dashboard untuk melanjutkan pengelolaan laundry.",
  path: "/404",
});

export default function NotFound() {
  return <NotFoundClient />;
}
