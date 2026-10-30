import { z } from "zod";
import { formMessages } from "@/content/microcopy";
import { PH_MOBILE } from "@/lib/validation/booking";

export const enquiryTypes = ["catering", "event", "contact"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

const optionalText = (max: number) => z.string().trim().max(max).optional();

export function enquirySchema(type: EnquiryType, today: string) {
  return z.object({
    type: z.enum(enquiryTypes),
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
      .refine((value) => value === "" || PH_MOBILE.test(value.replace(/[\s-]/g, "")), formMessages.invalidPhone),
    event_date: z
      .string()
      .trim()
      .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), formMessages.pick("date"))
      .refine((value) => value === "" || value >= today, formMessages.pastDate),
    guests: z
      .string()
      .trim()
      .refine((value) => value === "" || /^[1-9]\d{0,5}$/.test(value), formMessages.required("guest count")),
    location: optionalText(200),
    budget: optionalText(100),
    message:
      type === "contact"
        ? z.string().trim().min(1, formMessages.required("message")).max(2000)
        : optionalText(2000),
  });
}
