import { getPageMetadata } from "@/lib/seo";
import CreateStaffPageClient from "./CreateStaffPageClient";

export const metadata = getPageMetadata("/staffs/new");

const CreateStaffPage = () => {
  return <CreateStaffPageClient />;
};

export default CreateStaffPage;

