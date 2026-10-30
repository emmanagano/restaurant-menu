/** Typed result shared by the enquiry and gift card server actions. */
export type FormResult =
  | { ok: true; message: string }
  | { ok: false; errors: Record<string, string[]>; values?: Record<string, string> };

/** Flattens zod issues into `{ field: [messages] }`. */
export function fieldErrors(issues: Array<{ path: PropertyKey[]; message: string }>) {
  const errors: Record<string, string[]> = {};
  for (const issue of issues) {
    const field = String(issue.path[0] ?? "form");
    (errors[field] ??= []).push(issue.message);
  }
  return errors;
}

/** Everything the visitor typed, as strings, so a failed submit can refill the form. */
export function submittedValues(formData: FormData) {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "company") values[key] = value;
  }
  return values;
}
