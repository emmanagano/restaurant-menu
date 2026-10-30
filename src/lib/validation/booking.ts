import { z } from "zod";
import { formMessages } from "@/content/microcopy";

export const MAX_PARTY_SIZE = 12;

export const PH_MOBILE = /^(?:\+?63|0)9\d{9}$/;

const isRealDate = (value: string) => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
};

export const bookingSchema = z.object({
  location: z.string().min(1, formMessages.pick("branch")),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, formMessages.pick("date"))
    .refine(isRealDate, formMessages.pick("date")),
  time: z.string().regex(/^\d{2}:\d{2}$/, formMessages.pick("time")),
  party_size: z.coerce
    .number(formMessages.required("party size"))
    .int(formMessages.required("party size"))
    .min(1, formMessages.required("party size"))
    .max(MAX_PARTY_SIZE, formMessages.partyTooLarge),
  name: z.string().trim().min(1, formMessages.required("name")).max(120, formMessages.required("name")),
  email: z
    .string()
    .trim()
    .min(1, formMessages.required("email"))
    .max(254, formMessages.invalidEmail)
    .pipe(z.email(formMessages.invalidEmail)),
  phone: z
    .string()
    .trim()
    .min(1, formMessages.required("phone"))
    .refine((value) => PH_MOBILE.test(value.replace(/[\s-]/g, "")), formMessages.invalidPhone),
  notes: z.string().trim().max(1000).optional(),
});

export type BookingField = keyof z.infer<typeof bookingSchema>;
export type BookingErrors = Partial<Record<BookingField, string>>;

/** Typed result returned by the server action. */
export type BookingResult =
  | { ok: true }
  | { ok: false; errors: BookingErrors & { form?: string } };
