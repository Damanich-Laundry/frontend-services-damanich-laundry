import SettingsPageClient from "./SettingsPageClient";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("/settings");

const SettingsPage = () => {
  return <SettingsPageClient />;
};

export default SettingsPage;