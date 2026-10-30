import Image from "next/image";
import type { Image as ImageRow } from "@/lib/content";
import { cn } from "@/lib/cn";
import { imageSrc } from "@/lib/images";

/** A logged photo. Width, height and alt come from its `images` row, so they always match the credit. */
export function Photo({
  image,
  sizes,
  className,
  priority = false,
}: {
  image: ImageRow;
  sizes: string;
  className?: string;
  /** Set for the photo that is likely the page's largest element; everything else loads at low priority. */
  priority?: boolean;
}) {
  return (
    <Image
      src={imageSrc(image.path)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      {...(priority ? { loading: "eager", fetchPriority: "high" } : { fetchPriority: "low" })}
      className={cn("h-auto w-full rounded-card object-cover", className)}
    />
  );
}
