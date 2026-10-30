import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = { as?: T } & Omit<ComponentProps<T>, "as">;

export function Card<T extends ElementType = "div">({ as, className, ...rest }: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("overflow-hidden rounded-card bg-surface shadow-card", className)}
      {...rest}
    />
  );
}
