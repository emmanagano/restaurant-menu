import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PackageCards } from "@/components/sections/PackageCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { buttons } from "@/content/microcopy";
import { getImageMap, getPackages } from "@/lib/content";
import { sitePhotos } from "@/lib/images";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Private Dining & Party Venue in San Fernando | Uling",
  description:
    "Host birthdays, reunions and company dinners in Uling's Bodega room: up to 60 guests, its own grill station and family-style feasts. Enquire now.",
  path: "/private-events",
});

export default async function PrivateEventsPage() {
  const [packages, images] = await Promise.all([getPackages("event"), getImageMap()]);
  const bodega = images[sitePhotos.bodega];

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Private events", path: "/private-events" },
        ])}
      />
      <PageIntro title="Private dining and party venue in San Fernando, Pampanga">
        Birthdays, reunions, despedidas, company dinners. Our Bodega room seats up to 60, with its own grill station and sound system.
      </PageIntro>
      <div className="mt-6">
        <Button href="#enquiry">{buttons.enquireEvent}</Button>
      </div>

      {bodega && (
        <Photo image={bodega} sizes="(min-width: 1280px) 72rem, 100vw" className="mt-10 aspect-3/2 md:aspect-2/1" />
      )}

      <section aria-labelledby="packages-heading" className="mt-16">
        <h2 id="packages-heading" className="text-h2">
          Private event packages
        </h2>
        <PackageCards packages={packages} />
      </section>

      <section id="enquiry" aria-labelledby="enquiry-heading" className="mt-16 scroll-mt-24">
        <h2 id="enquiry-heading" className="text-h2">
          {buttons.enquireEvent}
        </h2>
        <EnquiryForm type="event" submitLabel={buttons.enquireEvent} />
      </section>
    </main>
  );
}
