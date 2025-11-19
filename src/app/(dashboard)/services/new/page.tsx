import { getPageMetadata } from "@/lib/seo";
import CreateServicePageClient from "./CreateServicePageClient";

export const metadata = getPageMetadata("/services/new");

const CreateServicePage = () => {
  return <CreateServicePageClient />;
};

export default CreateServicePage;
