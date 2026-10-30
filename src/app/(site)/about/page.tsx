import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { getImageMap } from "@/lib/content";
import { sitePhotos } from "@/lib/images";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "About Uling: Kapampangan Cooking from San Fernando",
  description:
    "From Lola Pacing's charcoal grill to two San Fernando dining rooms. Meet the family, the farms and the fire behind Uling's Kapampangan cooking.",
  path: "/about",
});

const values = [
  { title: "Fire first.", text: "Almost everything we serve touches live charcoal." },
  {
    title: "Pampanga-grown.",
    text: "Pork, carabao milk, river fish and rice from farms within an hour of our door.",
  },
  {
    title: "Made in-house.",
    text: "Buro, atchara, tocino, longganisa, and the peanut sauce for our kare-kare.",
  },
];

export default async function AboutPage() {
  const story = (await getImageMap())[sitePhotos.story];

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageIntro title="About Uling, Kapampangan cooking from San Fernando" />

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
        <section aria-labelledby="story-heading" className="max-w-prose space-y-4 text-lead">
          <h2 id="story-heading" className="text-h2">
            From Lola&apos;s yard to your table
          </h2>
          <p>
            Uling began in Lola Pacing&apos;s kitchen in San Fernando, where Sunday lunch meant a charcoal grill in the
            yard and twelve cousins fighting over the crispy bits. Her grandson, Chef Migo Dizon, cooked in Manila and
            Singapore for a decade before coming home with one question: what would her table taste like today?
          </p>
          <p>
            The answer is Uling. We source pork, carabao milk and river fish from Pampanga farms, make our own buro and
            atchara, and cook almost everything over coals. Some recipes are exactly as Lola wrote them. Others
            we&apos;ve dared to change. Either way, you&apos;ll eat like family.
          </p>
          <p className="text-small italic text-ink-muted">
            Lola Pacing and Chef Migo are fictional characters for this concept.
          </p>
        </section>
        {story && <Photo image={story} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-3/2" />}
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {values.map((value) => (
          <section key={value.title}>
            <h2 className="text-h3">{value.title}</h2>
            <p className="mt-2 text-ink-muted">{value.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
