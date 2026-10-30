import { cn } from "@/lib/cn";

/**
 * Progress through a multi-step flow. The current step carries `aria-current="step"`,
 * and completed steps get a check mark, so state never relies on colour alone.
 * On narrow screens only the current label is shown.
 */
export function Stepper({ steps, current, label }: { steps: readonly string[]; current: number; label: string }) {
  return (
    <ol aria-label={label} className="flex items-center gap-2">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li
            key={step}
            aria-current={active ? "step" : undefined}
            className={cn("flex items-center gap-2", active && "flex-1 md:flex-none")}
          >
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-8 shrink-0 items-center justify-center rounded-pill border-2 text-small font-semibold",
                done && "border-ember-dark bg-ember-dark text-on-dark",
                active && "border-ink",
                !done && !active && "border-line text-ink-muted",
              )}
            >
              {done ? (
                <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[3]">
                  <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            <span className={cn("text-small", active ? "font-semibold" : "sr-only md:not-sr-only text-ink-muted")}>
              {step}
              {done && <span className="sr-only"> (completed)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
