import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/ui/JsonLd";
import { footer } from "@/content/microcopy";
import { getImages } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

// TODO(content): the deck has no title or description for /credits. These are a draft for review.
export const metadata = pageMetadata({
  title: "Photo Credits | Uling",
  description:
    "Photo and illustration credits for the Uling concept site: every photographer, source and license, listed from the same table that powers the site.",
  path: "/credits",
});

const sourceNames: Record<string, string> = {
  unsplash: "Unsplash",
  pexels: "Pexels",
  pixabay: "Pixabay",
  wikimedia: "Wikimedia Commons",
  own: "The designer",
};

export default async function CreditsPage() {
  const images = await getImages();

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Credits", path: "/credits" },
        ])}
      />
      <PageIntro title="Credits">{footer.photoCredit}</PageIntro>

      {/* TODO(content): shown until the first photo is logged in `images`. */}
      {images.length === 0 ? (
        <p className="mt-12 max-w-prose text-lead text-ink-muted">
          No photos are credited here yet. Each one is listed as soon as it is added to the site.
        </p>
      ) : (
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {images.map((image) => (
            <li key={image.id} className="rounded-card bg-surface p-6">
              <p className="font-semibold">{image.alt}</p>
              <p className="mt-2 text-ink-muted">
                {image.credit_line ?? [image.photographer, sourceNames[image.source]].filter(Boolean).join(", ")}
              </p>
              <p className="mt-1 text-small text-ink-muted">
                {[sourceNames[image.source], image.license].filter(Boolean).join(" · ")}
              </p>
              {image.source_url && (
                <a
                  href={image.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-tap items-center underline"
                >
                  Original source
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
