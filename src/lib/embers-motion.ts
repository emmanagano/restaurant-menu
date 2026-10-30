import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * The site's one "peak" moment: coals catch and embers rise as the section scrolls in.
 * Only transform and opacity animate. With reduced motion the glow and embers stay still.
 * Everything is built inside gsap.matchMedia(), so the returned function reverts it all.
 * This module (and GSAP with it) is imported on demand by components/sections/Embers.tsx.
 */
export function startEmbers(el: HTMLElement) {
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
}
