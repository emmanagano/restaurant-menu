import { dishTagLabels } from "@/content/microcopy";
import { cn } from "@/lib/cn";

export type DishTagKey = keyof typeof dishTagLabels;

const base =
  "inline-flex items-center rounded-pill border border-ink px-3 py-1 text-small font-semibold text-ink";

/** A text label, so meaning never relies on colour alone. */
export function Tag({ children, className }: { children: string; className?: string }) {
  return <span className={cn(base, className)}>{children}</span>;
}

/** Dietary or signature tag, shown as words ("Spicy"), never as the deck's letters. */
export function DishTag({ tag }: { tag: DishTagKey }) {
  return <Tag>{dishTagLabels[tag]}</Tag>;
}
