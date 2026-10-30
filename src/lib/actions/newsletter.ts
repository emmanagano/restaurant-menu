"use server";

import { formMessages } from "@/content/microcopy";
import { withinRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { createClient } from "@/lib/supabase/server";
import { newsletterSchema, type NewsletterResult } from "@/lib/validation/newsletter";

const UNIQUE_VIOLATION = "23505";

export async function subscribeToNewsletter(
  _previous: NewsletterResult | null,
  formData: FormData,
): Promise<NewsletterResult> {
  // Honeypot: real visitors never see this field. Pretend it worked.
  if (formData.get("company")) {
    return { ok: true, message: formMessages.newsletterSuccess };
  }

  const ip = await getClientIp();
  if (!withinRateLimit(`newsletter:${ip}`)) {
    return { ok: false, errors: { form: [formMessages.rateLimited] } };
  }

  const parsed = newsletterSchema.safeParse({ email: formData.get("email") ?? "" });
  if (!parsed.success) {
    return {
      ok: false,
      errors: { email: parsed.error.issues.map((issue) => issue.message) },
      // Keep what they typed: React resets the form after an action.
      values: { email: String(formData.get("email") ?? "") },
    };
  }

  // Insert only: anon cannot read the table, so no `.select()` here.
  const { error } = await createClient()
    .from("newsletter")
    .insert({ email: parsed.data.email.toLowerCase() });

  if (error?.code === UNIQUE_VIOLATION) {
    return { ok: true, message: formMessages.newsletterDuplicate };
  }
  if (error) {
    return { ok: false, errors: { form: [formMessages.serverError] } };
  }
  return { ok: true, message: formMessages.newsletterSuccess };
}
