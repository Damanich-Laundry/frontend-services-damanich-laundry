import { buildPageMetadata } from "@/lib/seo";
import EditOrderPageClient from "./EditOrderPageClient";

type EditOrderPageProps = {
  params: { orderId: string };
};

export const generateMetadata = ({ params }: EditOrderPageProps) => {
  const orderId = decodeURIComponent(params.orderId);

  return buildPageMetadata({
    title: `Edit Pesanan ${orderId}`,
    description:
      "Perbarui detail pesanan laundry termasuk status, pembayaran, dan catatan pelanggan.",
    path: `/orders/edit/${orderId}`,
  });
};

const EditOrderPage = () => {
  return <EditOrderPageClient />;
};

export default EditOrderPage;
