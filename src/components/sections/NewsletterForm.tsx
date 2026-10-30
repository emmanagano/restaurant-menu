"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { buttons } from "@/content/microcopy";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { track } from "@/lib/analytics";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, null);

  useEffect(() => {
    if (state?.ok) track("newsletter_submit");
  }, [state]);

  const failed = state && !state.ok ? state : null;
  const emailError = failed?.errors.email?.[0];
  const formError = failed?.errors.form?.[0];

  return (
    <form action={formAction} noValidate className="mt-6 max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="mb-1 block font-semibold">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={failed?.values?.email ?? ""}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "newsletter-email-error" : undefined}
            className="min-h-tap w-full rounded-control border-2 border-ink bg-canvas px-4 text-body text-ink"
          />
        </div>
        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div aria-hidden="true" className="sr-only">
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" disabled={pending}>
          {buttons.subscribe}
        </Button>
      </div>

      {emailError && (
        <p id="newsletter-email-error" className="mt-2 flex items-start gap-2 font-semibold">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 size-5 shrink-0 fill-none stroke-current stroke-2">
            <path d="M12 8v5m0 3h.01M10.3 4.5 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {emailError}
        </p>
      )}
      <p role="status" className="mt-3 min-h-6 font-semibold">
        {state?.ok ? state.message : formError}
      </p>
    </form>
  );
}
