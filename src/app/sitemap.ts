import type { MetadataRoute } from "next";
import { getLocationSlugs } from "@/lib/content";
import { siteUrl } from "@/lib/seo/site";

const staticPaths = [
  "/",
  "/menu",
  "/book",
  "/catering",
  "/private-events",
  "/gift-cards",
  "/about",
  "/faq",
  "/contact",
  "/privacy",
  "/credits",
];

/** Static pages plus one entry per location, read from Supabase. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locationPaths = (await getLocationSlugs()).map((slug) => `/locations/${slug}`);
  return [...staticPaths, ...locationPaths].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
