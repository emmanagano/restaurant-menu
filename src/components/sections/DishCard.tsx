import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { DishTag, type DishTagKey } from "@/components/ui/Tag";
import type { Dish } from "@/lib/content";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { imageSrc } from "@/lib/images";

const TAG_ORDER: DishTagKey[] = ["signature", "spicy", "vegetarian", "pork_free", "seafood"];

/** Keys used for display and for the menu filter (`data-tags`). */
export function dishTagKeys(dish: Dish): DishTagKey[] {
  const keys = new Set<string>(dish.tags);
  if (dish.is_signature) keys.add("signature");
  return TAG_ORDER.filter((key) => keys.has(key));
}

export function DishCard({ dish, className }: { dish: Dish; className?: string }) {
  const tags = dishTagKeys(dish);
  const alt = dish.image?.alt ?? dish.alt ?? "";

  return (
    <Card as="li" data-dish data-tags={tags.join(" ")} className={cn("flex flex-col", className)}>
      {dish.image && (
        <Image
          src={imageSrc(dish.image.path)}
          alt={alt}
          width={dish.image.width}
          height={dish.image.height}
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
          style={{ aspectRatio: `${dish.image.width} / ${dish.image.height}` }}
          className="w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-h3">{dish.name}</h3>
          <p className="shrink-0 text-lead font-semibold">{formatPrice(dish.price_php)}</p>
        </div>
        <p className="text-ink-muted">{dish.description}</p>
        {tags.length > 0 && (
          <ul aria-label="Dish tags" className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <DishTag tag={tag} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
