import { buildPageMetadata } from "@/lib/seo";
import EditServicePageClient from "./EditServicePageClient";

type EditServicePageProps = {
  params: { serviceId: string };
};

export const generateMetadata = ({ params }: EditServicePageProps) => {
  const serviceId = decodeURIComponent(params.serviceId);

  return buildPageMetadata({
    title: `Edit Layanan ${serviceId}`,
    description:
      "Sesuaikan harga, estimasi pengerjaan, dan deskripsi layanan laundry Anda.",
    path: `/services/edit/${serviceId}`,
  });
};

const EditServicePage = () => {
  return <EditServicePageClient />;
};

export default EditServicePage;
