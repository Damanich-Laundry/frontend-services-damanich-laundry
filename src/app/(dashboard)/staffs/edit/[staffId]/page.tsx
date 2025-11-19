import { buildPageMetadata } from "@/lib/seo";
import EditStaffPageClient from "./EditStaffPageClient";

type EditStaffPageProps = {
  params: { staffId: string };
};

export const generateMetadata = ({ params }: EditStaffPageProps) => {
  const staffId = decodeURIComponent(params.staffId);

  return buildPageMetadata({
    title: `Edit Data Staff ${staffId}`,
    description:
      "Perbarui profil tim operasional laundry termasuk kontak, jabatan, dan status keaktifan.",
    path: `/staffs/edit/${staffId}`,
  });
};

const EditStaffPage = () => {
  return <EditStaffPageClient />;
};

export default EditStaffPage;

