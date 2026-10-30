"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { formLabels } from "@/content/microcopy";
import { submitEnquiry } from "@/lib/actions/enquiry";
import { track } from "@/lib/analytics";
import { manilaToday } from "@/lib/dates";
import { useNow } from "@/lib/useNow";
import type { EnquiryType } from "@/lib/validation/enquiry";

/**
 * Catering and private event enquiries share the deck's field list; the contact form
 * is name, email, branch and message. All three post to the same server action.
 */
export function EnquiryForm({
  type,
  submitLabel,
  branches = [],
}: {
  type: EnquiryType;
  submitLabel: string;
  branches?: string[];
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, null);
  const now = useNow();

  useEffect(() => {
    if (state?.ok) track("enquiry_submit", { type });
  }, [state, type]);

  const failed = state && !state.ok ? state : null;
  const error = (field: string) => failed?.errors[field]?.[0];
  const value = (field: string) => failed?.values?.[field] ?? "";

  return (
    <form action={formAction} noValidate className="mt-6 max-w-2xl space-y-5">
      <input type="hidden" name="type" value={type} />
      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="sr-only">
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TextField name="name" label={formLabels.name} required autoComplete="name" defaultValue={value("name")} error={error("name")} />
      <TextField name="email" label={formLabels.email} type="email" required autoComplete="email" defaultValue={value("email")} error={error("email")} />

      {type === "contact" ? (
        <SelectField name="location" label={formLabels.branch} defaultValue={value("location") || undefined} error={error("location")}>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </SelectField>
      ) : (
        <>
          <TextField name="phone" label={formLabels.phone} type="tel" inputMode="tel" autoComplete="tel" defaultValue={value("phone")} error={error("phone")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              name="event_date"
              label={formLabels.eventDate}
              type="date"
              min={now ? manilaToday(now) : undefined}
              defaultValue={value("event_date")}
              error={error("event_date")}
            />
            <TextField name="guests" label={formLabels.guests} type="number" inputMode="numeric" min={1} defaultValue={value("guests")} error={error("guests")} />
          </div>
          {type === "catering" && (
            <TextField name="location" label={formLabels.location} defaultValue={value("location")} error={error("location")} />
          )}
          <TextField name="budget" label={formLabels.budget} defaultValue={value("budget")} error={error("budget")} />
        </>
      )}

      <TextAreaField
        name="message"
        label={formLabels.message}
        required={type === "contact"}
        defaultValue={value("message")}
        error={error("message")}
      />

      <Button type="submit" disabled={pending}>
        {submitLabel}
      </Button>

      <p role="status" className="min-h-6 font-semibold">
        {state?.ok ? state.message : error("form")}
      </p>
    </form>
  );
}
