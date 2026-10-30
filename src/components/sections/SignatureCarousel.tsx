"use client";

import { useRef, type ReactNode } from "react";
import { a11y } from "@/content/microcopy";

const arrow = "inline-flex size-tap items-center justify-center rounded-pill border-2 border-ink hover:bg-surface";

/** CSS scroll-snap carousel. The cards are server-rendered; the buttons just scroll by one card. */
export function SignatureCarousel({ label, children }: { label: string; children: ReactNode }) {
  const list = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = list.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" aria-label={a11y.previousDish} onClick={() => scrollByCard(-1)} className={arrow}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
            <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" aria-label={a11y.nextDish} onClick={() => scrollByCard(1)} className={arrow}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <ul
        ref={list}
        tabIndex={0}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4"
      >
        {children}
      </ul>
    </div>
  );
}
