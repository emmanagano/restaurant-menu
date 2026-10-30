"use server";

import { formMessages } from "@/content/microcopy";
import { validateBooking } from "@/lib/booking";
import { parseHours } from "@/lib/content";
import { withinRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { createClient } from "@/lib/supabase/server";
import type { BookingResult } from "@/lib/validation/booking";

const text = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
};

/** Demo booking: stored in `bookings`, but no confirmation is sent anywhere. */
export async function bookTable(formData: FormData): Promise<BookingResult> {
  // Honeypot: real visitors never see this field. Pretend it worked.
  if (text(formData, "company")) return { ok: true };

  if (!withinRateLimit(`booking:${await getClientIp()}`)) {
    return { ok: false, errors: { form: formMessages.rateLimited } };
  }

  const input = {
    location: text(formData, "location"),
    date: text(formData, "date"),
    time: text(formData, "time"),
    party_size: text(formData, "party_size"),
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    notes: text(formData, "notes"),
  };

  const supabase = createClient();
  const { data: branch, error: branchError } = await supabase
    .from("locations")
    .select("id, hours")
    .eq("slug", input.location)
    .maybeSingle();
  if (branchError) return { ok: false, errors: { form: formMessages.serverError } };

  const errors = validateBooking(input, branch ? parseHours(branch.hours) : null, new Date());
  if (!branch) errors.location ??= formMessages.pick("branch");
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  // Insert only: anon cannot read the table, so no `.select()` here.
  const { error } = await supabase.from("bookings").insert({
    location_id: branch!.id,
    date: input.date,
    time: input.time,
    party_size: Number(input.party_size),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    notes: input.notes.trim() || null,
  });
  if (error) return { ok: false, errors: { form: formMessages.serverError } };

  return { ok: true };
}
