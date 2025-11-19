import { getPageMetadata } from "@/lib/seo";
import CreateOrderPageClient from "./CreateOrderPageClient";

export const metadata = getPageMetadata("/orders/new");

const CreateOrderPage = () => {
  return <CreateOrderPageClient />;
};

export default CreateOrderPage;