import { formMessages } from "@/content/microcopy";
import { formatMinutes, manilaClock, type Hours } from "@/lib/hours";
import {
  bookingSchema,
  type BookingErrors,
  type BookingField,
} from "@/lib/validation/booking";

const SLOT_MINUTES = 30;
const MINUTES_PER_DAY = 24 * 60;

export type Slot = { value: string; label: string; minutes: number };

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** Today's date in Asia/Manila as YYYY-MM-DD. */
export function manilaToday(now: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(now);
}

const weekdayOf = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();

/** Last time a table can be taken: 30 minutes before close ("Last seating 9:30 PM"). */
export function lastSeating(hours: Hours, date: string) {
  const day = hours[weekdayOf(date)];
  if (!day) return null;
  const open = toMinutes(day.open);
  let close = toMinutes(day.close);
  if (close <= open) close += MINUTES_PER_DAY;
  return close - SLOT_MINUTES;
}

/** Bookable slots for a date, every 30 minutes from opening to the last seating. */
export function slotsFor(hours: Hours, date: string, now: Date): Slot[] {
  const day = hours[weekdayOf(date)];
  const last = lastSeating(hours, date);
  if (!day || last === null) return [];

  const today = manilaToday(now);
  if (date < today) return [];
  const clock = manilaClock(now);
  const isToday = date === today;
  const slots: Slot[] = [];
  for (let minutes = toMinutes(day.open); minutes <= last; minutes += SLOT_MINUTES) {
    if (isToday && minutes <= clock.mins) continue;
    const wrapped = minutes % MINUTES_PER_DAY;
    const hh = String(Math.floor(wrapped / 60)).padStart(2, "0");
    const mm = String(wrapped % 60).padStart(2, "0");
    slots.push({ value: `${hh}:${mm}`, label: formatMinutes(wrapped), minutes });
  }
  return slots;
}

/**
 * Validates a booking. The browser runs this per step and the server runs it again on submit,
 * so both give the same answers. `hours` is the chosen branch's hours (null until one is picked).
 */
export function validateBooking(
  input: Record<string, unknown>,
  hours: Hours | null,
  now: Date,
): BookingErrors {
  const errors: BookingErrors = {};
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as BookingField;
      errors[field] ??= issue.message;
    }
  }

  const date = String(input.date ?? "");
  const time = String(input.time ?? "");
  if (!errors.date && date < manilaToday(now)) {
    errors.date = formMessages.pastDate;
  }
  if (hours && !errors.date && !errors.time) {
    if (!slotsFor(hours, date, now).some((slot) => slot.value === time)) {
      errors.time = formMessages.noTimes;
    }
  }
  return errors;
}
