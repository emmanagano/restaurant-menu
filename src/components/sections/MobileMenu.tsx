"use client";

import { useRef, useState, type ReactNode } from "react";
import { a11y } from "@/content/microcopy";

/** Toggle for the nav below the `lg` breakpoint. The links are rendered by the server. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? a11y.closeMenu : a11y.openMenu}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-tap items-center justify-center rounded-control"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6 fill-none stroke-current stroke-2"
          strokeLinecap="round"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <div
        id="mobile-nav"
        hidden={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full border-b border-line bg-canvas px-4 pb-4 shadow-card"
      >
        {children}
      </div>
    </div>
  );
}
