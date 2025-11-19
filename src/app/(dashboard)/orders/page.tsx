import OrdersPageClient from "./OrdersPageClient";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("/orders");

const OrdersPage = () => {
  return <OrdersPageClient />;
};

export default OrdersPage;