import { PageIntro } from "@/components/sections/PageIntro";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { getFaqs } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "FAQ: Parking, Groups, Allergies & More | Uling",
  description:
    "Answers on parking, walk-ins, vegetarian options, allergies, kids, corkage, large groups and cancellations at Uling in San Fernando, Pampanga.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <PageIntro title="Frequently asked questions" />
      <Accordion className="mt-8 max-w-3xl">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} question={faq.question}>
            {faq.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
