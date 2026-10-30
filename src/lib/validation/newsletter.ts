import { z } from "zod";
import { formMessages } from "@/content/microcopy";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, formMessages.required("email"))
    .max(254, formMessages.invalidEmail)
    .pipe(z.email(formMessages.invalidEmail)),
});

/** Typed result returned by the server action. */
export type NewsletterResult =
  | { ok: true; message: string }
  | { ok: false; errors: { email?: string[]; form?: string[] }; values?: { email: string } };
