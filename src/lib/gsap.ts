import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once here; import gsap from this module, never from "gsap" directly.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
