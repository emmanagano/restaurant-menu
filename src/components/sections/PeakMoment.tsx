import { Embers } from "@/components/sections/Embers";

export function PeakMoment() {
  return (
    <section
      aria-labelledby="peak-heading"
      data-surface="dark"
      className="relative overflow-hidden bg-ember-dark text-on-dark"
    >
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
