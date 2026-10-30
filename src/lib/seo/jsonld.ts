import type { Faq, Location, MenuCategory } from "@/lib/content";
import type { DayHours } from "@/lib/hours";
import { footer } from "@/content/microcopy";
import { siteName, siteUrl } from "@/lib/seo/site";

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

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** One specification per distinct set of hours, listing every day that shares them. */
function openingHoursSpecification(hours: Record<number, DayHours>) {
  const groups = new Map<string, string[]>();
  for (const [day, value] of Object.entries(hours)) {
    if (!value) continue;
    const key = `${value.open}-${value.close}`;
    groups.set(key, [...(groups.get(key) ?? []), DAY_NAMES[Number(day)]]);
  }
  return [...groups].map(([key, dayOfWeek]) => {
    const [opens, closes] = key.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes };
  });
}

export function restaurantJsonLd(location: Location, fallbackImage?: string) {
  const hasGeo = location.lat !== null && location.lng !== null;
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: location.name,
    servesCuisine: ["Kapampangan", "Filipino"],
    // TODO(content): price range isn't in the deck.
    priceRange: "₱₱",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.split(`, ${location.barangay}`)[0],
      addressLocality: location.city,
      addressRegion: location.region,
      postalCode: location.address.match(/\b\d{4}\b/)?.[0],
      addressCountry: "PH",
    },
    // TODO(content): geo stays out until lat/lng hold a public-landmark pin.
    ...(hasGeo && { geo: { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng } }),
    telephone: location.phone,
    openingHoursSpecification: openingHoursSpecification(location.hours),
    acceptsReservations: true,
    hasMenu: new URL("/menu", siteUrl).toString(),
    // TODO(content): sameAs stays out until a real profile exists. The image is the shared hero photo
    // until each branch has its own.
    ...((location.image?.path ?? fallbackImage) && { image: location.image?.path ?? fallbackImage }),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Site-wide organisation, rendered in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl.toString(),
    slogan: footer.tagline,
    email: footer.email,
    // TODO(content): logo and sameAs stay out until a logo file and real profiles exist.
  };
}
