import Link from "next/link";
import { BookButton } from "@/components/ui/Button";
import { MobileMenu } from "@/components/sections/MobileMenu";
import { a11y, nav } from "@/content/microcopy";

const links = [
  { href: "/menu", label: nav.menu },
  { href: "/book", label: nav.book },
  { href: "/#locations", label: nav.locations },
  { href: "/catering", label: nav.cateringEvents },
  { href: "/gift-cards", label: nav.giftCards },
];

const linkClass =
  "inline-flex min-h-tap items-center rounded-control px-3 text-body font-semibold hover:underline";

function NavLinks({ orientation }: { orientation: "row" | "column" }) {
  return (
    <ul className={orientation === "row" ? "flex items-center gap-1" : "flex flex-col pt-2"}>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="relative mx-auto flex min-h-16 w-full max-w-page items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="inline-flex min-h-tap items-center font-display text-h3 font-semibold"
        >
          Uling
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks orientation="row" />
        </nav>
        <div className="hidden lg:block">
          <BookButton />
        </div>

        <nav aria-label="Main mobile" className="lg:hidden">
          <MobileMenu>
            <NavLinks orientation="column" />
          </MobileMenu>
        </nav>
      </div>

      {/* Floating Book button on mobile */}
      <BookButton
        aria-label={a11y.floatingBook}
        className="fixed bottom-4 right-4 z-40 shadow-card lg:hidden"
      />
    </header>
  );
}
