import CustomersPageClient from "./CustomersPageClient";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("/customers");

const CustomerPage = () => {
  return <CustomersPageClient />;
};

export default CustomerPage;
