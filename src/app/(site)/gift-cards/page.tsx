import { GiftCardForm } from "@/components/sections/GiftCardForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPackages } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

// TODO(content): this description is 138 characters; the rule is 140-160. Text is from the deck.
export const metadata = pageMetadata({
  title: "Restaurant Gift Cards, San Fernando, Pampanga | Uling",
  description:
    "Give a Kapampangan feast. Uling digital gift cards from ₱1,000, delivered instantly and valid at both San Fernando branches for 12 months.",
  path: "/gift-cards",
});

export default async function GiftCardsPage() {
  const packages = await getPackages("gift_card");
  const amounts = packages.flatMap((pkg) => pkg.price_php ?? []);

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gift cards", path: "/gift-cards" },
        ])}
      />
      <PageIntro title="Uling gift cards, digital and delivered instantly">
        For birthdays, thank-yous and &ldquo;just because&rdquo;. Valid at both branches for 12 months.
      </PageIntro>
      <section aria-labelledby="gift-heading" className="mt-12">
        <h2 id="gift-heading" className="text-h2">
          Send a gift card
        </h2>
        <GiftCardForm amounts={amounts} />
      </section>
    </main>
  );
}
