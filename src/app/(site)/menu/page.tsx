import { DishCard, dishTagKeys } from "@/components/sections/DishCard";
import { MenuFilters } from "@/components/sections/MenuFilters";
import { BookButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { menuPage } from "@/content/microcopy";
import { getMenu } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, menuJsonLd } from "@/lib/seo/jsonld";

export const metadata = pageMetadata({
  title: "Kapampangan Menu: Sisig, Kare-Kare & Grills | Uling",
  description:
    "Browse our Kapampangan menu: sizzling sisig, kare-kare, tilapia sa buro, bringhe and halo-halo, with vegetarian and pork-free picks. Prices in pesos.",
  path: "/menu",
});

export default async function MenuPage() {
  const menu = await getMenu();
  const dishes = menu.flatMap((category) => category.dishes);
  const countWith = (tag: string) =>
    dishes.filter((dish) => (dishTagKeys(dish) as string[]).includes(tag)).length;
  const counts = {
    all: dishes.length,
    signature: countWith("signature"),
    spicy: countWith("spicy"),
    vegetarian: countWith("vegetarian"),
    pork_free: countWith("pork_free"),
  };

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd data={menuJsonLd(menu)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
        ])}
      />

      {/* TODO(content): the deck has no menu H1. "Kapampangan food menu" is the keyword-map phrase. */}
      <h1 className="text-title">Kapampangan food menu</h1>
      <p className="mt-4 max-w-prose text-lead text-ink-muted">{menuPage.intro}</p>

      <div className="mt-8">
        <MenuFilters counts={counts} total={dishes.length}>
          {menu.map((category) => (
            <section
              key={category.id}
              id={category.slug}
              aria-labelledby={`${category.slug}-heading`}
              data-category
              className="mt-12 scroll-mt-24"
            >
              <h2 id={`${category.slug}-heading`} className="text-h2">
                {category.name}
              </h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.dishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </ul>
              <div className="mt-6">
                <BookButton />
              </div>
            </section>
          ))}
        </MenuFilters>
      </div>

      <p className="mt-12 text-ink-muted">{menuPage.allergyNote}</p>
    </main>
  );
}
