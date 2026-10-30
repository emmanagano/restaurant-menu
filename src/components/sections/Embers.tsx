"use client";

import { useEffect, useRef } from "react";

// Fixed positions (no Math.random) so server and client markup match.
const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: ((i * 53) % 97) + 1,
  bottom: (i * 29) % 35,
  size: ["size-1", "size-1.5", "size-2"][i % 3],
}));

/**
 * Glow and embers, server-rendered as a still picture (also what reduced-motion and no-JS users see).
 * The GSAP motion sits below the fold, so it is only downloaded once the section is near the viewport.
 */
export function Embers() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    // With reduced motion nothing animates, so there is no reason to download GSAP at all.
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stop: (() => void) | undefined;
    let unmounted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import("@/lib/embers-motion").then(({ startEmbers }) => {
          if (!unmounted) stop = startEmbers(el);
        });
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);

    return () => {
      unmounted = true;
      observer.disconnect();
      stop?.();
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div data-glow className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-glow/30 to-transparent" />
      {EMBERS.map((ember, i) => (
        <span
          key={i}
          data-ember
          className={`absolute rounded-pill bg-glow opacity-70 ${ember.size}`}
          style={{ left: `${ember.left}%`, bottom: `${ember.bottom}%` }}
        />
      ))}
    </div>
  );
}
