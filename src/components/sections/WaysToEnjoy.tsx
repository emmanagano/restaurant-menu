import { BookButton, Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { buttons } from "@/content/microcopy";

// TODO(content): "Order for pick-up" has no page in the deck or the page list yet, so the button goes to /menu until the pick-up flow is written.
const ways = [
  { title: "Dine in", text: "Two dining rooms in San Fernando, open daily.", cta: "book" },
  {
    title: "Takeaway & pasalubong",
    text: "Tocino, longganisa, buro and sans rival to bring home.",
    cta: { href: "/menu", label: buttons.orderPickup },
  },
  {
    title: "Catering",
    text: "Fiesta trays for 20 to 500 guests.",
    cta: { href: "/catering", label: buttons.planMenu },
  },
  {
    title: "Private events",
    text: "Birthdays, reunions, company dinners for up to 60.",
    cta: { href: "/private-events", label: buttons.enquire },
  },
  {
    title: "Gift cards",
    text: "The easiest way to say “treat yourself”.",
    cta: { href: "/gift-cards", label: buttons.buyGiftCard },
  },
] as const;

export function WaysToEnjoy() {
  return (
    <section aria-labelledby="ways-heading" className="mx-auto w-full max-w-page px-4 py-16">
      <h2 id="ways-heading" className="text-h2">
        Eat in, take home, or bring the party
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ways.map((way) => (
          <Card as="li" key={way.title} className="flex flex-col gap-3 p-6">
            <h3 className="text-h3">{way.title}</h3>
            <p className="text-ink-muted">{way.text}</p>
            <div className="mt-auto pt-2">
              {way.cta === "book" ? (
                <BookButton />
              ) : (
                <Button href={way.cta.href} variant="secondary">
                  {way.cta.label}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </ul>
    </section>
  );
}
