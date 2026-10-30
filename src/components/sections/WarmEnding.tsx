import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { BookButton } from "@/components/ui/Button";

export function WarmEnding() {
  return (
    <section aria-labelledby="ending-heading" className="bg-surface">
      <div className="mx-auto w-full max-w-page px-4 py-16">
        <h2 id="ending-heading" className="text-h2">
          Stay close to the coals
        </h2>
        <p className="mt-4 max-w-prose text-lead text-ink-muted">
          Get first dibs on new dishes, fiesta specials and chef&apos;s table nights. One email a month,
          no spam.
        </p>
        <NewsletterForm />
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <p className="text-lead">
            <em>Salamat</em> for stopping by. See you at the table.
          </p>
          <BookButton />
        </div>
      </div>
    </section>
  );
}
