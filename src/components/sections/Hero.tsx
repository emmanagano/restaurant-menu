import { BookButton, Button } from "@/components/ui/Button";
import { buttons } from "@/content/microcopy";

// TODO(content): hero photo (16:9 desktop, 4:5 mobile crop, `priority`) once a stock shot is logged in `images`.
export function Hero() {
  return (
    <section data-surface="dark" className="bg-ember-dark text-on-dark">
      <div className="mx-auto flex w-full max-w-page flex-col items-start gap-6 px-4 py-20 lg:py-32">
        <h1 className="text-body font-semibold text-on-dark-muted">
          Modern Kapampangan grill &amp; bar in San Fernando, Pampanga
        </h1>
        <p className="max-w-3xl font-display text-h1 font-semibold">Kapampangan, over the coals.</p>
        <p className="max-w-xl text-lead text-on-dark-muted">
          Heirloom recipes from the culinary capital, cooked on live charcoal. Pull up a chair.
        </p>
        <div className="flex flex-wrap gap-3">
          <BookButton />
          <Button href="/menu" variant="outline-light">
            {buttons.seeMenu}
          </Button>
        </div>
      </div>
    </section>
  );
}
