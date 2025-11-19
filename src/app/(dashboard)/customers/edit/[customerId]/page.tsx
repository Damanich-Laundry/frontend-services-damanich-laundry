import { buildPageMetadata } from "@/lib/seo";
import EditCustomerPageClient from "./EditCustomerPageClient";

type EditCustomerPageProps = {
  params: { customerId: string };
};

export const generateMetadata = ({ params }: EditCustomerPageProps) => {
  const customerId = decodeURIComponent(params.customerId);

  return buildPageMetadata({
    title: `Edit Pelanggan ${customerId}`,
    description:
      "Perbarui informasi pelanggan Damanich Laundry untuk menjaga data tetap akurat.",
    path: `/customers/edit/${customerId}`,
  });
};

const EditCustomerPage = () => {
  return <EditCustomerPageClient />;
};

export default EditCustomerPage;