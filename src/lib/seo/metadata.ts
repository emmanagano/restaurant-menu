import type { Metadata } from "next";
import { siteName } from "@/lib/seo/site";

/** Canonical URL, Open Graph and Twitter card for a page. Titles and descriptions come from the deck. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName, type: "website", locale: "en_PH" },
    twitter: { card: "summary_large_image", title, description },
  };
}
