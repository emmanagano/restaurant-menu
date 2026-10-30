import type { MenuCategory } from "@/lib/content";
import { siteUrl } from "@/lib/seo/site";

const VEGETARIAN_DIET = "https://schema.org/VegetarianDiet";

export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function menuJsonLd(menu: MenuCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Uling menu",
    inLanguage: "en",
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      hasMenuItem: category.dishes.map((dish) => ({
        "@type": "MenuItem",
        name: dish.name,
        description: dish.description,
        offers: { "@type": "Offer", price: dish.price_php, priceCurrency: "PHP" },
        ...(dish.tags.includes("vegetarian") && { suitableForDiet: VEGETARIAN_DIET }),
      })),
    })),
  };
}
