import { getPageMetadata } from "@/lib/seo";
import ForgotPasswordPageClient from "./ForgotPasswordPageClient";

export const metadata = getPageMetadata("/auth/forgot-password");

const ForgotPasswordPage = () => {
  return <ForgotPasswordPageClient />;
};

export default ForgotPasswordPage;
