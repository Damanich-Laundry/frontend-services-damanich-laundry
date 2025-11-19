import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/customers",
  "/customers/new",
  "/orders",
  "/orders/new",
  "/services",
  "/services/new",
  "/staffs",
  "/staffs/new",
  "/settings",
  "/auth/login",
  "/auth/forgot-password",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: `${siteMetadata.siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

