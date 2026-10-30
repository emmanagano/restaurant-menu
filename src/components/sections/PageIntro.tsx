import type { ReactNode } from "react";

/** The page's one H1 and its intro line. */
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="max-w-3xl">
      <h1 className="text-title">{title}</h1>
      {children && <p className="mt-4 text-lead text-ink-muted">{children}</p>}
    </header>
  );
}
