import Image from "next/image";
import { Embers } from "@/components/sections/Embers";
import type { Image as ImageRow } from "@/lib/content";
import { imageSrc } from "@/lib/images";

export function PeakMoment({ photo }: { photo?: ImageRow }) {
  return (
    <section
      aria-labelledby="peak-heading"
      data-surface="dark"
      className="relative isolate overflow-hidden bg-ember-dark text-on-dark"
    >
      {photo && (
        <>
          {/* Texture only: the heading and line say everything, so the alt text is empty. */}
          <Image src={imageSrc(photo.path)} alt="" fill sizes="100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-ember-dark/80" />
        </>
      )}
      <Embers />
      <div className="relative mx-auto w-full max-w-page px-4 py-24 lg:py-32">
        <h2 id="peak-heading" className="text-h2">
          Watch it catch
        </h2>
        <p className="mt-4 max-w-xl text-lead text-on-dark-muted">
          Every plate starts the same way, with fire. Ours has been going since 11 this morning.
        </p>
      </div>
    </section>
  );
}
