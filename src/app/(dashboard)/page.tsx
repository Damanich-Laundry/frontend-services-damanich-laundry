import DashboardPageClient from "./DashboardPageClient";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("/");

export default function DashboardPage() {
  return <DashboardPageClient />;
}