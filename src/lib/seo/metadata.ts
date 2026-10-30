import type { Metadata } from "next";
import { shareImage, siteName } from "@/lib/seo/site";

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
    // A page's own openGraph replaces the parent's wholesale, so the share image is set here.
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      type: "website",
      locale: "en_PH",
      images: [{ url: shareImage.path, width: shareImage.width, height: shareImage.height, alt: shareImage.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.twitterPath] },
  };
}
