import type { Metadata } from "next";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

export const metadata: Metadata = { title: "This page went up in smoke. | Uling" };

/** 404 for `notFound()` calls inside the site, such as an unknown location. The layout supplies the chrome. */
export default function SiteNotFound() {
  return <NotFoundContent />;
}
