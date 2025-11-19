import { getPageMetadata } from "@/lib/seo";
import CreateCustomerPageClient from "./CreateCustomerPageClient";

export const metadata = getPageMetadata("/customers/new");

const CreateCustomerPage = () => {
  return <CreateCustomerPageClient />;
};

export default CreateCustomerPage;
