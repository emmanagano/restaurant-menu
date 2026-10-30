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
