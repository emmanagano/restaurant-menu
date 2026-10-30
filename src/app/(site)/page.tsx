import { Hero } from "@/components/sections/Hero";
import { PeakMoment } from "@/components/sections/PeakMoment";
import { Proof } from "@/components/sections/Proof";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { VisitUs } from "@/components/sections/VisitUs";
import { WarmEnding } from "@/components/sections/WarmEnding";
import { WaysToEnjoy } from "@/components/sections/WaysToEnjoy";
import { getImageMap, getLocations, getRecipeCount, getSignatureDishes, getTestimonials } from "@/lib/content";
import { sitePhotos } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Kapampangan Grill & Bar in San Fernando, Pampanga | Uling",
  description:
    "Charcoal-grilled sisig, kare-kare and carabao tapa in San Fernando, Pampanga. Heirloom Kapampangan recipes for family lunches and barkada nights. Book a table.",
  path: "/",
});

export default async function Home() {
  const [signature, recipeCount, locations, testimonials, images] = await Promise.all([
    getSignatureDishes(),
    getRecipeCount(),
    getLocations(),
    getTestimonials(),
    getImageMap(),
  ]);

  return (
    <main id="main">
      <Hero desktop={images[sitePhotos.heroDesktop]} mobile={images[sitePhotos.heroMobile]} />
      <section aria-label="Welcome" className="mx-auto w-full max-w-page px-4 py-16">
        <p className="max-w-prose text-lead">
          Pampanga has fed the Philippines for centuries. At Uling, we cook its greatest hits the old
          way, over glowing charcoal, and plate them like it&apos;s a fiesta every night. Sisig that
          still sizzles. Kare-kare with peanut sauce we grind ourselves. Halo-halo made with carabao
          milk. <em>Mangan ta na!</em> Let&apos;s eat.
        </p>
      </section>
      <SignatureDishes dishes={signature} />
      <PeakMoment photo={images[sitePhotos.embers]} />
      <StoryTeaser photo={images[sitePhotos.story]} />
      <WaysToEnjoy />
      <Proof recipeCount={recipeCount} diningRooms={locations.length} reviews={testimonials.slice(0, 3)} />
      <VisitUs locations={locations} />
      <WarmEnding />
    </main>
  );
}
