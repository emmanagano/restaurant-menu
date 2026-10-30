import Link from "next/link";
import { LocationHours } from "@/components/sections/LocationHours";
import { Card } from "@/components/ui/Card";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { buttons } from "@/content/microcopy";
import type { Location } from "@/lib/content";

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export function VisitUs({ locations }: { locations: Location[] }) {
  return (
    <section id="locations" aria-labelledby="visit-heading" className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16">
      <h2 id="visit-heading" className="text-h2">
        Find your nearest Uling
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <Card as="li" key={location.id} className="flex flex-col gap-4 p-6">
            <h3 className="text-h3">
              <Link href={`/locations/${location.slug}`} className="inline-flex min-h-tap items-center underline">
                {location.name}
              </Link>
            </h3>
            <address className="not-italic text-ink-muted">{location.address}</address>
            <LocationHours hours={location.hours} />
            <p>{location.phone}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              {/* TODO(content): maps_url is empty until a public-landmark pin is chosen, so Directions stays hidden. */}
              {location.maps_url && (
                <TrackedButton
                  href={location.maps_url}
                  variant="secondary"
                  event="directions_click"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {buttons.directions}
                </TrackedButton>
              )}
              <TrackedButton href={telHref(location.phone)} variant="secondary" event="call_click">
                {buttons.call}
              </TrackedButton>
              <TrackedButton href={`/book?branch=${location.slug}`} variant="book" event="book_click">
                {buttons.bookHere}
              </TrackedButton>
            </div>
          </Card>
        ))}
      </ul>
    </section>
  );
}
