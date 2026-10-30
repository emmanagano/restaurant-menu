import { z } from "zod";
import { formMessages } from "@/content/microcopy";

export function giftCardSchema(today: string) {
  return z.object({
    amount: z
      .string()
      .trim()
      // TODO(content): the deck gives no minimum or maximum for a custom amount.
      .regex(/^[1-9]\d{0,5}$/, formMessages.pick("gift card amount")),
    recipient_name: z.string().trim().min(1, formMessages.required("recipient name")).max(120),
    recipient_email: z
      .string()
      .trim()
      .min(1, formMessages.required("recipient email"))
      .max(254, formMessages.invalidEmail)
      .pipe(z.email(formMessages.invalidEmail)),
    message: z.string().trim().max(500).optional(),
    send_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, formMessages.pick("send date"))
      .refine((value) => value >= today, formMessages.pastDate),
  });
}
