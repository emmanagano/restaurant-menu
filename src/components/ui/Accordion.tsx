import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Native <details>/<summary>: keyboard-operable and works without JavaScript,
 * so crawlers and no-JS visitors still get every answer in the HTML.
 */
export function AccordionItem({
  question,
  children,
  className,
}: {
  question: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <details className={cn("group border-b border-line", className)}>
      <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between gap-4 py-4 text-lead font-semibold [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6 shrink-0 fill-none stroke-current stroke-2 group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="pb-4 text-body text-ink-muted">{children}</div>
    </details>
  );
}

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-t border-line", className)}>{children}</div>;
}
