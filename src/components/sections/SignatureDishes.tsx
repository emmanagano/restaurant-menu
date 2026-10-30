import Link from "next/link";
import { DishCard } from "@/components/sections/DishCard";
import { SignatureCarousel } from "@/components/sections/SignatureCarousel";
import type { Dish } from "@/lib/content";

// Order from the deck's homepage cards.
// TODO(content): the deck names two cards differently from the menu: "Kare-Kare with Bagoong"
// (menu: Kare-Kare) and "Buro Platter" (menu: Tilapia sa Buro). The menu names are used.
const CARD_SLUGS = [
  "sizzling-sisig",
  "charcoal-pork-belly",
  "kare-kare",
  "pindang-damulag",
  "tilapia-sa-buro",
  "halo-halo-kapampangan",
];

export function SignatureDishes({ dishes }: { dishes: Dish[] }) {
  const cards = CARD_SLUGS.flatMap((slug) => dishes.find((dish) => dish.slug === slug) ?? []);

  return (
    <section aria-labelledby="signature-heading" className="mx-auto w-full max-w-page px-4 py-16">
      <h2 id="signature-heading" className="text-h2">
        The dishes people drive to San Fernando for
      </h2>
      <div className="mt-8">
        <SignatureCarousel label="Signature dishes">
          {cards.map((dish) => (
            <DishCard key={dish.id} dish={dish} className="w-72 shrink-0 snap-start md:w-80" />
          ))}
        </SignatureCarousel>
      </div>
      <p className="mt-6">
        <Link href="/menu" className="inline-flex min-h-tap items-center text-lead font-semibold underline">
          See the full menu →
        </Link>
      </p>
    </section>
  );
}
