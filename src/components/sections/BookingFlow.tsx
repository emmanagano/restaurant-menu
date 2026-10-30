"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorText, inputClass } from "@/components/ui/Field";
import { Stepper } from "@/components/ui/Stepper";
import { bookingPage, buttons, formMessages } from "@/content/microcopy";
import { bookTable } from "@/lib/actions/booking";
import { track } from "@/lib/analytics";
import { lastSeating, manilaToday, slotsFor, validateBooking } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { formatMinutes, type Hours } from "@/lib/hours";
import { useNow } from "@/lib/useNow";
import { MAX_PARTY_SIZE, type BookingErrors, type BookingField } from "@/lib/validation/booking";

export type BookingLocation = {
  slug: string;
  name: string;
  address: string;
  feature: string | null;
  hours: Hours;
};

type Values = Record<BookingField, string>;
type Errors = BookingErrors & { form?: string };

const EMPTY: Values = { location: "", date: "", time: "", party_size: "", name: "", email: "", phone: "", notes: "" };

/** Fields on each step; the last step (Confirm) only reviews and submits. */
const STEP_FIELDS: BookingField[][] = [["location"], ["date", "time"], ["party_size"], ["name", "email", "phone", "notes"], []];
const LAST_STEP = STEP_FIELDS.length - 1;

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 fill-none stroke-current stroke-[3]">
      <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookingFlow({ locations }: { locations: BookingLocation[] }) {
  const params = useSearchParams();
  const now = useNow();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  const [values, setValues] = useState<Values>(() => {
    const branch = params.get("branch");
    return { ...EMPTY, location: locations.some((l) => l.slug === branch) ? branch! : "" };
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState<Values | null>(null);

  const location = locations.find((l) => l.slug === values.location) ?? null;
  const clock = now ?? new Date();
  const slots = location && values.date ? slotsFor(location.hours, values.date, clock) : [];
  const last = location && values.date ? lastSeating(location.hours, values.date) : null;

  const set = (field: BookingField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  /** Moves focus after the new step is painted: to the field with an error, else the step heading. */
  const focusAfterPaint = (target: () => HTMLElement | null | undefined) =>
    requestAnimationFrame(() => target()?.focus());

  const goTo = (next: number, focusField?: BookingField) => {
    setStep(next);
    focusAfterPaint(() =>
      focusField
        ? formRef.current?.querySelector<HTMLElement>(`[name="${focusField}"]`)
        : document.getElementById(`step-heading-${next}`),
    );
  };

  const stepErrors = (fields: BookingField[]) => {
    const all = validateBooking(values, location?.hours ?? null, clock);
    return Object.fromEntries(Object.entries(all).filter(([field]) => fields.includes(field as BookingField))) as Errors;
  };

  const next = () => {
    const found = stepErrors(STEP_FIELDS[step]);
    setErrors(found);
    const first = STEP_FIELDS[step].find((field) => found[field]);
    if (first) focusAfterPaint(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`));
    else goTo(step + 1);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < LAST_STEP) return next();

    const all = validateBooking(values, location?.hours ?? null, clock);
    const failedStep = STEP_FIELDS.findIndex((fields) => fields.some((field) => all[field]));
    if (failedStep !== -1) {
      setErrors(all);
      return goTo(failedStep, STEP_FIELDS[failedStep].find((field) => all[field]));
    }

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await bookTable(formData);
      if (result.ok) {
        track("book_submit", { branch: values.location, party_size: Number(values.party_size) });
        setConfirmed(values);
        return;
      }
      setErrors(result.errors);
      const failed = STEP_FIELDS.findIndex((fields) => fields.some((field) => result.errors[field]));
      if (failed !== -1) goTo(failed, STEP_FIELDS[failed].find((field) => result.errors[field]));
    });
  };

  if (confirmed) {
    const branch = locations.find((l) => l.slug === confirmed.location)!;
    const date = new Intl.DateTimeFormat("en-PH", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
      new Date(`${confirmed.date}T00:00:00Z`),
    );
    const [h, m] = confirmed.time.split(":").map(Number);
    return (
      <Card className="p-6 md:p-8">
        <h2
          tabIndex={-1}
          ref={(el) => el?.focus()}
          className="text-h2"
        >
          {bookingPage.confirmationTitle(confirmed.name.trim())}
        </h2>
        <p className="mt-4 text-lead">
          {bookingPage.confirmationText(date, formatMinutes(h * 60 + m), branch.name, confirmed.email.trim())}
        </p>
        <p className="mt-4 font-semibold">({bookingPage.demoNote})</p>
        <div className="mt-6">
          <Button href="/menu" variant="secondary">
            {buttons.seeMenu}
          </Button>
        </div>
      </Card>
    );
  }

  const labels = bookingPage.fields;
  const describe = (field: BookingField) => (errors[field] ? `${field}-error` : undefined);
  const invalid = (field: BookingField) => (errors[field] ? true : undefined);
  const fieldError = (field: BookingField) =>
    errors[field] ? <ErrorText id={`${field}-error`}>{errors[field]}</ErrorText> : null;

  const panel = (index: number, children: ReactNode) => (
    <div hidden={step !== index}>
      <h2 id={`step-heading-${index}`} tabIndex={-1} className="text-h3">
        {bookingPage.steps[index]}
      </h2>
      {children}
    </div>
  );

  const summary: Array<[string, string, number]> = [
    [labels.location, location?.name ?? "", 0],
    [labels.date, values.date, 1],
    [labels.time, slots.find((slot) => slot.value === values.time)?.label ?? values.time, 1],
    [labels.party_size, values.party_size, 2],
    [labels.name, values.name.trim(), 3],
    [labels.email, values.email.trim(), 3],
    [labels.phone, values.phone.trim(), 3],
  ];

  return (
    <Card className="p-6 md:p-8">
      <Stepper steps={bookingPage.steps} current={step} label="Booking progress" />
      <p role="status" className="sr-only">
        {bookingPage.stepStatus(step + 1, bookingPage.steps.length, bookingPage.steps[step])}
      </p>

      <form ref={formRef} onSubmit={submit} noValidate className="mt-8 space-y-8">
        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div aria-hidden="true" className="sr-only">
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {panel(
          0,
          <fieldset className="mt-4">
            <legend className="sr-only">{labels.location}</legend>
            <div className="grid gap-4 md:grid-cols-2">
              {locations.map((option) => {
                const selected = values.location === option.slug;
                return (
                  <label key={option.slug} className="block">
                    <input
                      type="radio"
                      name="location"
                      value={option.slug}
                      checked={selected}
                      onChange={() => set("location", option.slug)}
                      aria-describedby={describe("location")}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        "block rounded-card border-2 p-5 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-leaf",
                        selected ? "border-ink bg-canvas" : "border-line hover:bg-canvas",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2 font-display text-h3">
                        {option.name}
                        {selected && <Check />}
                      </span>
                      <span className="mt-2 block text-ink-muted">{option.address}</span>
                      {option.feature && <span className="mt-1 block text-ink-muted">{option.feature}</span>}
                    </span>
                  </label>
                );
              })}
            </div>
            {fieldError("location")}
          </fieldset>,
        )}

        {panel(
          1,
          <div className="mt-4 space-y-6">
            <div>
              <label htmlFor="date" className="mb-1 block font-semibold">
                {labels.date}
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                min={now ? manilaToday(now) : undefined}
                value={values.date}
                onChange={(e) => set("date", e.target.value)}
                aria-invalid={invalid("date")}
                aria-describedby={describe("date")}
                className={cn(inputClass, "sm:w-auto")}
              />
              {fieldError("date")}
            </div>

            <fieldset>
              <legend className="mb-1 font-semibold">{labels.time}</legend>
              {!location || !values.date || values.date < manilaToday(clock) ? null : slots.length === 0 ? (
                <p className="font-semibold">{formMessages.noTimes}</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => {
                      const selected = values.time === slot.value;
                      return (
                        <label key={slot.value}>
                          <input
                            type="radio"
                            name="time"
                            value={slot.value}
                            checked={selected}
                            onChange={() => set("time", slot.value)}
                            aria-describedby={describe("time")}
                            className="peer sr-only"
                          />
                          <span
                            className={cn(
                              "inline-flex min-h-tap min-w-20 items-center justify-center gap-1 rounded-pill border-2 border-ink px-4 font-semibold peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-leaf",
                              selected ? "bg-ember-dark text-on-dark" : "hover:bg-canvas",
                            )}
                          >
                            {selected && <Check />}
                            {slot.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {last !== null && (
                    <p className="mt-3 text-ink-muted">{bookingPage.lastSeating(formatMinutes(last))}</p>
                  )}
                </>
              )}
              {fieldError("time")}
            </fieldset>
          </div>,
        )}

        {panel(
          2,
          <div className="mt-4">
            <label htmlFor="party_size" className="mb-1 block font-semibold">
              {labels.party_size}
            </label>
            <input
              id="party_size"
              name="party_size"
              type="number"
              inputMode="numeric"
              min={1}
              required
              value={values.party_size}
              onChange={(e) => set("party_size", e.target.value)}
              aria-invalid={invalid("party_size")}
              aria-describedby={describe("party_size")}
              className={cn(inputClass, "sm:w-40")}
            />
            {fieldError("party_size")}
            {Number(values.party_size) > MAX_PARTY_SIZE && (
              <p className="mt-2">
                <Link href="/private-events" className="inline-flex min-h-tap items-center font-semibold underline">
                  {buttons.enquireEvent}
                </Link>
              </p>
            )}
          </div>,
        )}

        {panel(
          3,
          <div className="mt-4 space-y-5">
            {(
              [
                ["name", "text", "name"],
                ["email", "email", "email"],
                ["phone", "tel", "tel"],
              ] as const
            ).map(([field, type, autoComplete]) => (
              <div key={field}>
                <label htmlFor={field} className="mb-1 block font-semibold">
                  {labels[field]}
                </label>
                <input
                  id={field}
                  name={field}
                  type={type}
                  autoComplete={autoComplete}
                  inputMode={field === "phone" ? "tel" : undefined}
                  required
                  value={values[field]}
                  onChange={(e) => set(field, e.target.value)}
                  aria-invalid={invalid(field)}
                  aria-describedby={describe(field)}
                  className={inputClass}
                />
                {fieldError(field)}
              </div>
            ))}
            <div>
              <label htmlFor="notes" className="mb-1 block font-semibold">
                {labels.notes}
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                maxLength={1000}
                value={values.notes}
                onChange={(e) => set("notes", e.target.value)}
                className={cn(inputClass, "py-3")}
              />
            </div>
          </div>,
        )}

        {panel(
          4,
          <div className="mt-4">
            <dl className="divide-y divide-line">
              {summary.map(([label, value, editStep]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className="flex items-center gap-3 text-right font-semibold">
                    {value}
                    <button
                      type="button"
                      onClick={() => goTo(editStep)}
                      className="inline-flex min-h-tap items-center underline"
                    >
                      {bookingPage.change}
                      <span className="sr-only"> {label}</span>
                    </button>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-semibold">({bookingPage.demoNote})</p>
          </div>,
        )}

        <p role="alert" className="min-h-6 font-semibold">
          {errors.form}
        </p>

        <div className="flex flex-wrap gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={() => goTo(step - 1)}>
              {bookingPage.back}
            </Button>
          )}
          <Button type="submit" disabled={pending}>
            {step < LAST_STEP ? bookingPage.next : bookingPage.confirm}
          </Button>
        </div>
      </form>
    </Card>
  );
}
