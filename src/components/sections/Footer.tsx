import Link from "next/link";
import { getLocations } from "@/lib/content";
import { footer, nav } from "@/content/microcopy";

const exploreLinks = [
  { href: "/menu", label: nav.menu },
  { href: "/book", label: nav.book },
  { href: "/catering", label: "Catering" },
  { href: "/private-events", label: "Private events" },
  { href: "/gift-cards", label: nav.giftCards },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "inline-flex min-h-tap items-center rounded-control hover:underline";

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export async function Footer() {
  const locations = await getLocations();

  return (
    <footer data-surface="dark" className="bg-ember-dark pb-24 text-on-dark lg:pb-0">
      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-h3 font-semibold">Uling</p>
          <p className="mt-2 text-on-dark-muted">{footer.tagline}</p>
          <p className="mt-4">
            <a href={`mailto:${footer.email}`} className={linkClass}>
              {footer.email}
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-semibold">Explore</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 text-on-dark-muted md:grid-cols-1">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold">Find us</p>
          <ul className="mt-2 space-y-4 text-on-dark-muted">
            {locations.map((location) => (
              <li key={location.id}>
                <Link href={`/locations/${location.slug}`} className={linkClass}>
                  {location.name}
                </Link>
                <address className="not-italic">{location.address}</address>
                <a href={telHref(location.phone)} className={linkClass}>
                  {location.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto w-full max-w-page space-y-2 px-4 py-6 text-small text-on-dark-muted">
          <p>{footer.disclaimer}</p>
          <p>{footer.photoCredit}</p>
          <ul className="flex gap-4">
            <li>
              <Link href="/credits" className={`${linkClass} underline`}>
                Credits
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={`${linkClass} underline`}>
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
