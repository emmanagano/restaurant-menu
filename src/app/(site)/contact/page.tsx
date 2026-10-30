import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/ui/JsonLd";
import { footer, formLabels } from "@/content/microcopy";
import { getLocations } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Contact Uling, San Fernando, Pampanga",
  description:
    "Call, email or message Uling Downtown and Uling Dolores in San Fernando, Pampanga. Questions about bookings, catering or events? We reply within a day.",
  path: "/contact",
});

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export default async function ContactPage() {
  const locations = await getLocations();

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageIntro title="Contact Uling">
        Questions, feedback or a story about your Lola&apos;s sisig? We read everything.
      </PageIntro>

      <div className="mt-8 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="text-h2">
            {formLabels.sendMessage}
          </h2>
          <EnquiryForm
            type="contact"
            submitLabel={formLabels.sendMessage}
            branches={locations.map((location) => location.name)}
          />
        </section>

        <section aria-labelledby="reach-heading">
          <h2 id="reach-heading" className="text-h2">
            Call or email
          </h2>
          <ul className="mt-4 space-y-4">
            {locations.map((location) => (
              <li key={location.id}>
                <p className="font-semibold">{location.name}</p>
                <a href={telHref(location.phone)} className="inline-flex min-h-tap items-center underline">
                  {location.phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${footer.email}`} className="inline-flex min-h-tap items-center underline">
                {footer.email}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
