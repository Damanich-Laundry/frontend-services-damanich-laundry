import StaffsPageClient from "./StaffsPageClient";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("/staffs");

const StaffsPage = () => {
  return <StaffsPageClient />;
};

export default StaffsPage;
