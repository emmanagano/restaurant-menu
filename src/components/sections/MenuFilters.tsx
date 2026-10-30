"use client";

import { useEffect, useState, type ReactNode } from "react";
import { menuFilters, menuPage } from "@/content/microcopy";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Filter = keyof typeof menuFilters;

const filters = Object.keys(menuFilters) as Filter[];

/**
 * Filter buttons for the menu. The dishes themselves are rendered on the server and
 * stay in the HTML; the chosen filter is set as `data-filter` and CSS hides the rest.
 */
export function MenuFilters({
  counts,
  total,
  children,
}: {
  counts: Record<Filter, number>;
  total: number;
  children: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    track("menu_view");
  }, []);

  return (
    <div data-filter={filter}>
      <div role="group" aria-label={menuPage.filterGroupLabel} className="flex flex-wrap gap-2">
        {filters.map((key) => {
          const pressed = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={pressed}
              onClick={() => {
                setFilter(key);
                track("menu_filter", { filter: key });
              }}
              className={cn(
                "inline-flex min-h-tap items-center gap-2 rounded-pill border-2 border-ink px-5 text-body font-semibold",
                pressed ? "bg-ember-dark text-on-dark" : "hover:bg-surface",
              )}
            >
              {pressed && (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[3]">
                  <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {menuFilters[key]}
            </button>
          );
        })}
      </div>
      <p role="status" className="sr-only">
        {menuPage.status(counts[filter], total)}
      </p>
      {children}
    </div>
  );
}
