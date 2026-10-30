"use server";

import { formMessages } from "@/content/microcopy";
import { manilaToday } from "@/lib/dates";
import { withinRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { fieldErrors, submittedValues, type FormResult } from "@/lib/validation/forms";
import { giftCardSchema } from "@/lib/validation/giftCard";

const text = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
};

/** Demo checkout: validates and confirms, but takes no payment, stores nothing and sends nothing. */
export async function sendGiftCard(_previous: FormResult | null, formData: FormData): Promise<FormResult> {
  if (text(formData, "company")) return { ok: true, message: formMessages.giftCardSent };

  if (!withinRateLimit(`giftcard:${await getClientIp()}`)) {
    return { ok: false, errors: { form: [formMessages.rateLimited] }, values: submittedValues(formData) };
  }

  const choice = text(formData, "amount");
  const parsed = giftCardSchema(manilaToday(new Date())).safeParse({
    amount: choice === "custom" ? text(formData, "custom_amount") : choice,
    recipient_name: text(formData, "recipient_name"),
    recipient_email: text(formData, "recipient_email"),
    message: text(formData, "message"),
    send_date: text(formData, "send_date"),
  });
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error.issues);
    // The custom amount input is the field to point at when "Custom" is chosen.
    if (choice === "custom" && errors.amount) errors.custom_amount = errors.amount;
    return { ok: false, errors, values: submittedValues(formData) };
  }
  return { ok: true, message: formMessages.giftCardSent };
}
