"use server";

import { formMessages } from "@/content/microcopy";
import { manilaToday } from "@/lib/dates";
import { withinRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { createClient } from "@/lib/supabase/server";
import { enquirySchema, enquiryTypes, type EnquiryType } from "@/lib/validation/enquiry";
import { fieldErrors, submittedValues, type FormResult } from "@/lib/validation/forms";

const text = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
};

/** Catering, private event and contact enquiries. Stored in `enquiries`; nothing is emailed. */
export async function submitEnquiry(_previous: FormResult | null, formData: FormData): Promise<FormResult> {
  // Honeypot: real visitors never see this field. Pretend it worked.
  if (text(formData, "company")) return { ok: true, message: formMessages.enquirySent };

  if (!withinRateLimit(`enquiry:${await getClientIp()}`)) {
    return { ok: false, errors: { form: [formMessages.rateLimited] }, values: submittedValues(formData) };
  }

  const type = text(formData, "type") as EnquiryType;
  if (!enquiryTypes.includes(type)) {
    return { ok: false, errors: { form: [formMessages.serverError] } };
  }

  const parsed = enquirySchema(type, manilaToday(new Date())).safeParse({
    type,
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    event_date: text(formData, "event_date"),
    guests: text(formData, "guests"),
    location: text(formData, "location"),
    budget: text(formData, "budget"),
    message: text(formData, "message"),
  });
  if (!parsed.success) {
    return { ok: false, errors: fieldErrors(parsed.error.issues), values: submittedValues(formData) };
  }

  const data = parsed.data;
  // Insert only: anon cannot read the table, so no `.select()` here.
  const { error } = await createClient()
    .from("enquiries")
    .insert({
      type: data.type,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      event_date: data.event_date || null,
      guests: data.guests ? Number(data.guests) : null,
      location: data.location || null,
      budget: data.budget || null,
      message: data.message || null,
    });
  if (error) {
    return { ok: false, errors: { form: [formMessages.serverError] }, values: submittedValues(formData) };
  }
  return { ok: true, message: formMessages.enquirySent };
}
