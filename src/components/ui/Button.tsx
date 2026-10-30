import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttons } from "@/content/microcopy";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { cn } from "@/lib/cn";

export type Variant = "primary" | "secondary" | "outline-light" | "book";

const base =
  "inline-flex min-h-tap min-w-tap items-center justify-center rounded-pill px-6 py-3 text-center text-body font-semibold";

const variants: Record<Variant, string> = {
  primary: "bg-ember-dark text-on-dark hover:bg-leaf",
  secondary: "border-2 border-ink text-ink hover:bg-surface",
  "outline-light": "border-2 border-on-dark text-on-dark hover:bg-on-dark hover:text-ink",
  // The accent colour is reserved for the "Book a table" CTA.
  book: "bg-book text-book-ink hover:brightness-95",
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

/** Renders a link when `href` is set (navigation), otherwise a button (action). */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, children, href, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (href === undefined) {
    return (
      <button type="button" className={classes} {...(rest as ComponentProps<"button">)}>
        {children}
      </button>
    );
  }

  const linkProps = rest as ComponentProps<"a">;
  const internal = href.startsWith("/") || href.startsWith("#");
  return internal ? (
    <Link href={href} className={classes} {...linkProps}>
      {children}
    </Link>
  ) : (
    <a href={href} className={classes} {...linkProps}>
      {children}
    </a>
  );
}

/** The one primary action on every page. Sends `book_click` when pressed. */
export function BookButton({
  className,
  children,
  ...rest
}: { className?: string; children?: ReactNode } & Pick<ComponentProps<"a">, "aria-label">) {
  return (
    <TrackedButton href="/book" variant="book" event="book_click" className={className} {...rest}>
      {children ?? buttons.book}
    </TrackedButton>
  );
}
