"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ErrorText, TextAreaField, TextField } from "@/components/ui/Field";
import { buttons, demoNotes, formLabels } from "@/content/microcopy";
import { sendGiftCard } from "@/lib/actions/giftCard";
import { manilaToday } from "@/lib/dates";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { useNow } from "@/lib/useNow";

export function GiftCardForm({ amounts }: { amounts: number[] }) {
  const [state, formAction, pending] = useActionState(sendGiftCard, null);
  const [choice, setChoice] = useState(amounts[0] ? String(amounts[0]) : "custom");
  const now = useNow();

  const failed = state && !state.ok ? state : null;
  const error = (field: string) => failed?.errors[field]?.[0];
  const value = (field: string) => failed?.values?.[field] ?? "";

  const options = [...amounts.map((amount) => ({ value: String(amount), label: formatPrice(amount) })), { value: "custom", label: formLabels.custom }];

  return (
    <form action={formAction} noValidate className="mt-6 max-w-2xl space-y-5">
      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="sr-only">
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="mb-1 font-semibold">{formLabels.amount}</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const selected = choice === option.value;
            return (
              <label key={option.value}>
                <input
                  type="radio"
                  name="amount"
                  value={option.value}
                  checked={selected}
                  onChange={() => setChoice(option.value)}
                  aria-describedby={error("amount") ? "amount-error" : undefined}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "inline-flex min-h-tap min-w-20 items-center justify-center rounded-pill border-2 border-ink px-5 font-semibold peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-leaf",
                    selected ? "bg-ember-dark text-on-dark" : "hover:bg-surface",
                  )}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
        {choice !== "custom" && error("amount") && <ErrorText id="amount-error">{error("amount")}</ErrorText>}
      </fieldset>

      {choice === "custom" && (
        <TextField
          name="custom_amount"
          label={formLabels.customAmount}
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={value("custom_amount")}
          error={error("custom_amount")}
          className="sm:w-56"
        />
      )}

      <TextField name="recipient_name" label={formLabels.recipientName} required defaultValue={value("recipient_name")} error={error("recipient_name")} />
      <TextField name="recipient_email" label={formLabels.recipientEmail} type="email" required defaultValue={value("recipient_email")} error={error("recipient_email")} />
      <TextAreaField name="message" label={formLabels.giftMessage} defaultValue={value("message")} error={error("message")} />
      <TextField
        name="send_date"
        label={formLabels.sendDate}
        type="date"
        required
        min={now ? manilaToday(now) : undefined}
        defaultValue={value("send_date")}
        error={error("send_date")}
        className="sm:w-56"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {buttons.sendGiftCard}
        </Button>
        <p className="font-semibold">({demoNotes.giftCard})</p>
      </div>

      <p role="status" className="min-h-6 font-semibold">
        {state?.ok ? state.message : error("form")}
      </p>
    </form>
  );
}
