import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IllustratedMap } from "@/components/sections/IllustratedMap";
import { LocationHours } from "@/components/sections/LocationHours";
import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/ui/JsonLd";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { buttons } from "@/content/microcopy";
import { locationCopy } from "@/content/locations";
import { getLocation, getLocationSlugs } from "@/lib/content";
import { breadcrumbJsonLd, restaurantJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getLocationSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const copy = locationCopy[slug];
  if (!copy) return {};
  return pageMetadata({ title: copy.title, description: copy.description, path: `/locations/${slug}` });
}

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

// TODO(content): location photo (3:2) once a stock shot is logged in `images`.
export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const [location, copy] = [await getLocation(slug), locationCopy[slug]];
  if (!location || !copy) notFound();

  const details = [
    ["Address", location.address],
    ["Phone", location.phone],
    ["Parking", location.parking],
    ["Good to know", location.feature],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd data={restaurantJsonLd(location)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: location.name, path: `/locations/${slug}` },
        ])}
      />
      <PageIntro title={copy.h1} />

      <div className="mt-8 flex flex-wrap gap-3">
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
        <TrackedButton href={`/book?branch=${slug}`} variant="book" event="book_click">
          {buttons.bookHere}
        </TrackedButton>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-10">
          <section aria-labelledby="details-heading">
            <h2 id="details-heading" className="text-h2">
              Visit {location.name}
            </h2>
            <dl className="mt-4 space-y-3">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-semibold">{label}</dt>
                  <dd className="text-ink-muted">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="hours-heading">
            <h2 id="hours-heading" className="text-h2">
              Opening hours
            </h2>
            <div className="mt-4 max-w-sm">
              <LocationHours hours={location.hours} />
            </div>
          </section>

          <p>
            <Link href="/menu" className="inline-flex min-h-tap items-center text-lead font-semibold underline">
              See the full menu →
            </Link>
          </p>
        </div>

        <section aria-labelledby="map-heading">
          <h2 id="map-heading" className="text-h2">
            Find us
          </h2>
          <div className="mt-4">
            <IllustratedMap label={copy.mapLabel} />
          </div>
        </section>
      </div>
    </main>
  );
}
