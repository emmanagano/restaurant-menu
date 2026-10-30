import { getImageProps } from "next/image";
import { BookButton, Button } from "@/components/ui/Button";
import { buttons } from "@/content/microcopy";
import type { Image } from "@/lib/content";
import { imageSrc } from "@/lib/images";

/** Art-directed hero photo: the 16:9 crop from `md` up, the 4:5 crop below. Above the fold, so it loads first. */
function HeroPhoto({ desktop, mobile }: { desktop: Image; mobile: Image }) {
  const common = { sizes: "100vw", quality: 75 };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    alt: "",
    src: imageSrc(desktop.path),
    width: desktop.width,
    height: desktop.height,
  });
  const {
    props: { srcSet: mobileSrcSet, alt, ...img },
  } = getImageProps({
    ...common,
    alt: desktop.alt,
    src: imageSrc(mobile.path),
    width: mobile.width,
    height: mobile.height,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      {/* next/image can't render <picture>; getImageProps supplies the optimised srcSets above. */}
      <img {...img} alt={alt} srcSet={mobileSrcSet} className="absolute inset-0 size-full object-cover" />
    </picture>
  );
}

export function Hero({ desktop, mobile }: { desktop?: Image; mobile?: Image }) {
  const hasPhoto = Boolean(desktop && mobile);

  return (
    <section data-surface="dark" className="relative isolate overflow-hidden bg-ember-dark text-on-dark">
      {hasPhoto && (
        <>
          <HeroPhoto desktop={desktop!} mobile={mobile!} />
          {/* Dark wash so the headline stays readable over the photo. */}
          <div aria-hidden="true" className="absolute inset-0 bg-ember-dark/80 md:bg-linear-to-r md:from-ember-dark/90 md:via-ember-dark/65 md:to-ember-dark/20" />
        </>
      )}
      <div className="relative mx-auto flex min-h-144 w-full max-w-page flex-col items-start justify-center gap-6 px-4 py-20 lg:min-h-168 lg:py-32">
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
