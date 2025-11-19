import ServicesPageClient from "./ServicesPageClient";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("/services");

const ServicesPage = () => {
  return <ServicesPageClient />;
};

export default ServicesPage;
