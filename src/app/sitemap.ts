import type { MetadataRoute } from "next";
import { STAY_CATEGORIES } from "@/lib/stay-categories";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = ["", "/about", "/services", "/contact", "/history", "/profile", "/register", "/sign-in", "/extranet"];
  const stayPaths = STAY_CATEGORIES.map((c) => `/stay/${c.slug}`);
  const lastModified = new Date();

  return [...paths, ...stayPaths].map((path) => ({
    url: `${base}${path === "" ? "/" : path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/stay/") ? 0.75 : path === "/services" ? 0.9 : 0.8,
  }));
}
