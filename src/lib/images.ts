/**
 * `images.path` is either a file in /public ("/images/hero.jpg")
 * or an object path in the public Supabase Storage bucket.
 */
export function imageSrc(path: string) {
  if (path.startsWith("/")) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
}

/** Site photos placed by hand. Each path has a row in `images` (see supabase/migrations). */
export const sitePhotos = {
  heroDesktop: "/images/hero-desktop.jpg",
  heroMobile: "/images/hero-mobile.jpg",
  story: "/images/story.jpg",
  bodega: "/images/bodega.jpg",
  embers: "/images/embers.jpg",
} as const;

const licenseUrls: Record<string, string> = {
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "Pexels License": "https://www.pexels.com/license/",
};

/** Link to the text of a license, so credits can point at the terms they rely on. */
export const licenseUrl = (license: string | null) => (license ? licenseUrls[license] : undefined);
