import { getPageMetadata } from "@/lib/seo";
import LoginPageClient from "./LoginPageClient";

export const metadata = getPageMetadata("/auth/login");

const LoginPage = () => {
  return <LoginPageClient />;
};

export default LoginPage;
