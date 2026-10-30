"use client";

import { usePathname } from "next/navigation";
import { BookButton } from "@/components/ui/Button";
import { a11y } from "@/content/microcopy";

/** Mobile-only floating Book button. Hidden on /book, where you're already booking. */
export function FloatingBookButton() {
  if (usePathname() === "/book") return null;

  return (
    <BookButton
      aria-label={a11y.floatingBook}
      className="fixed bottom-4 right-4 z-40 shadow-card lg:hidden"
    />
  );
}
