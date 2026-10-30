export const siteName = "Uling";

// NEXT_PUBLIC_SITE_URL wins. Netlify sets `URL` to the site's primary address at build time, so a
// missing variable can't leave localhost addresses in production sitemaps, canonicals and share tags.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000");

/** The share image served by app/opengraph-image.tsx (keep the size in step with that file). */
export const shareImage = {
  path: "/opengraph-image",
  twitterPath: "/twitter-image",
  width: 1200,
  height: 630,
  alt: "Uling: Kapampangan, over the coals.",
};
