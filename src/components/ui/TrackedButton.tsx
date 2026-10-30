"use client";

import type { ReactNode } from "react";
import { Button, type Variant } from "@/components/ui/Button";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** A link styled as a Button that reports an analytics event when pressed. */
export function TrackedButton({
  event,
  payload,
  ...props
}: {
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean>;
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}) {
  return <Button {...props} onClick={() => track(event, payload)} />;
}
