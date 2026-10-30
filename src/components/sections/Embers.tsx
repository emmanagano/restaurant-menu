"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Fixed positions (no Math.random) so server and client markup match.
const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: ((i * 53) % 97) + 1,
  bottom: (i * 29) % 35,
  size: ["size-1", "size-1.5", "size-2"][i % 3],
}));

/**
 * The site's one "peak" moment: coals catch and embers rise as the section scrolls in.
 * Only transform and opacity animate. With reduced motion (or no JS) the glow and embers stay still.
 */
export function Embers() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const embers = gsap.utils.toArray<HTMLElement>("[data-ember]", el);
      const glow = el.querySelector("[data-glow]");
      gsap.set(embers, { opacity: 0 });
      gsap.set(glow, { opacity: 0.2 });

      // Everything is built paused here so it belongs to this context and is reverted on unmount.
      const ignite = gsap.to(glow, { opacity: 1, duration: 1.8, ease: "power2.out", paused: true });
      const risers = embers.map((ember, i) => {
        const duration = gsap.utils.random(3, 6);
        return gsap
          .timeline({ paused: true, repeat: -1, delay: i * 0.25 })
          .fromTo(ember, { y: 0, x: 0, opacity: 0 }, { opacity: 1, duration: 0.6 })
          .to(
            ember,
            { y: -el.clientHeight * gsap.utils.random(0.5, 0.95), x: gsap.utils.random(-40, 40), duration, ease: "none" },
            0,
          )
          .to(ember, { opacity: 0, duration: duration * 0.4 }, duration * 0.6);
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        once: true,
        onEnter: () => {
          ignite.play();
          risers.forEach((riser) => riser.play());
        },
      });
    });

    return () => mm.revert();
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
