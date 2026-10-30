import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/lib/content";

export function Proof({
  recipeCount,
  diningRooms,
  reviews,
}: {
  recipeCount: number;
  diningRooms: number;
  reviews: Testimonial[];
}) {
  const stats = [
    { value: "4.8", label: "sample guest rating" },
    { value: String(recipeCount), label: "heirloom recipes" },
    { value: String(diningRooms), label: "dining rooms" },
  ];

  return (
    <section aria-labelledby="proof-heading" className="bg-surface">
      <div className="mx-auto w-full max-w-page px-4 py-16">
        <h2 id="proof-heading" className="text-h2">
          What our guests say
        </h2>
        <dl className="mt-8 grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-h2 font-semibold">{stat.value}</dd>
              <dt className="text-ink-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <h3 className="mt-12 text-h3">Sample reviews</h3>
        <ul className="mt-4 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <Card as="li" key={review.id} className="bg-canvas p-6">
              <figure>
                <blockquote className="text-lead">&ldquo;{review.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 text-ink-muted">
                  {review.author}
                  {review.source_label && `, ${review.source_label}`}
                </figcaption>
              </figure>
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
}
