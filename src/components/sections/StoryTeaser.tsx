import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { Image } from "@/lib/content";

export function StoryTeaser({ photo }: { photo?: Image }) {
  return (
    <section aria-labelledby="story-heading" className="mx-auto w-full max-w-page px-4 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 id="story-heading" className="text-h2">
            From Lola&apos;s yard to your table
          </h2>
          {/* TODO(content): the deck asks for a three-line teaser but doesn't write one. This is the founder story's first paragraph. */}
          <p className="mt-4 max-w-prose text-lead text-ink-muted">
            Uling began in Lola Pacing&apos;s kitchen in San Fernando, where Sunday lunch meant a charcoal
            grill in the yard and twelve cousins fighting over the crispy bits. Her grandson, Chef Migo
            Dizon, cooked in Manila and Singapore for a decade before coming home with one question: what
            would her table taste like today?
          </p>
          <p className="mt-2 text-small italic text-ink-muted">
            Lola Pacing and Chef Migo are fictional characters for this concept.
          </p>
          <p className="mt-4">
            <Link href="/about" className="inline-flex min-h-tap items-center text-lead font-semibold underline">
              Read our story →
            </Link>
          </p>
        </div>
        {photo && <Photo image={photo} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-3/2" />}
      </div>
    </section>
  );
}
