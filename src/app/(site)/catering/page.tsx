import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PackageCards } from "@/components/sections/PackageCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { buttons } from "@/content/microcopy";
import { getPackages } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Kapampangan Catering in Pampanga | Uling",
  description:
    "Fiesta trays, wedding buffets and office lunch boxes from Uling. Kapampangan catering anywhere in Pampanga, 20 to 500 guests. Plan your menu today.",
  path: "/catering",
});

export default async function CateringPage() {
  const packages = await getPackages("catering");

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Catering", path: "/catering" },
        ])}
      />
      <PageIntro title="Kapampangan catering in Pampanga for fiestas, weddings and offices">
        Bring the grill to your party. We cook on-site or deliver fiesta trays anywhere in Pampanga, for 20 to 500 guests.
      </PageIntro>
      <div className="mt-6">
        <Button href="#enquiry">{buttons.planMenu}</Button>
      </div>

      <section aria-labelledby="packages-heading" className="mt-16">
        <h2 id="packages-heading" className="text-h2">
          Catering packages
        </h2>
        <PackageCards packages={packages} />
      </section>

      <section id="enquiry" aria-labelledby="enquiry-heading" className="mt-16 scroll-mt-24">
        <h2 id="enquiry-heading" className="text-h2">
          {buttons.planMenu}
        </h2>
        <EnquiryForm type="catering" submitLabel={buttons.planMenu} />
      </section>
    </main>
  );
}
