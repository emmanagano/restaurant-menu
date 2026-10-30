"use client";

import { cn } from "@/lib/cn";
import { getHoursStatus, groupHours, type Hours } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

/**
 * Weekly hours are server-rendered. Once mounted, the browser adds the live
 * "Open now" status and marks today's row (Asia/Manila time).
 */
export function LocationHours({ hours }: { hours: Hours }) {
  const now = useNow();
  const status = now ? getHoursStatus(hours, now) : null;

  return (
    <div>
      {/* Reserve the line so the status doesn't shift the layout when it appears. */}
      <p className="min-h-6 font-semibold">{status?.label}</p>
      <ul className="mt-1 space-y-1">
        {groupHours(hours).map((group) => {
          const today = status !== null && group.days.includes(status.day);
          return (
            <li key={group.label} className={cn("flex justify-between gap-4", today && "font-semibold")}>
              <span>
                {group.label}
                {today && " · Today"}
              </span>
              <span>{group.range}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
