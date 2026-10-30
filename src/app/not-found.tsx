import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

export const metadata: Metadata = { title: "This page went up in smoke. | Uling" };

/**
 * Global 404 for unmatched URLs. It sits outside the (site) layout, so it brings its own header
 * and footer, which keeps a main landmark and the skip-link target on every unmatched URL.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <NotFoundContent />
      <Footer />
    </>
  );
}
