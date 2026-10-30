import { Suspense } from "react";
import { BookingFlow } from "@/components/sections/BookingFlow";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { bookingPage } from "@/content/microcopy";
import { getLocations } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Book a Table at Uling, San Fernando, Pampanga",
  description:
    "Reserve a table at Uling Downtown or Uling Dolores in San Fernando, Pampanga. Groups up to 12, open daily from 10 AM. Book in under a minute.",
  path: "/book",
});

export default async function BookPage() {
  const locations = await getLocations();

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book a table", path: "/book" },
        ])}
      />
      <h1 className="text-title">Book a table at Uling, San Fernando</h1>
      <p className="mt-4 text-lead text-ink-muted">{bookingPage.intro}</p>

      <div className="mt-8">
        {/* useSearchParams (for ?branch=) needs a Suspense boundary on a static page.
            The placeholder matches the measured height of the first step (45rem on mobile,
            31rem from md up) so the footer doesn't jump when the form arrives. */}
        <Suspense fallback={<Card className="min-h-181 md:min-h-124" />}>
          <BookingFlow
            locations={locations.map(({ slug, name, address, feature, hours }) => ({
              slug,
              name,
              address,
              feature,
              hours,
            }))}
          />
        </Suspense>
      </div>
    </main>
  );
}
