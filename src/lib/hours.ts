export type DayHours = { open: string; close: string } | null;
/** Keyed by day of week, 0 = Sunday. Times are 24-hour "HH:mm". */
export type Hours = Record<number, DayHours>;

export type OpenStatus = { open: true; closesAt: number } | { open: false };

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MINUTES_PER_DAY = 24 * 60;

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** 600 -> "10 AM", 1320 -> "10 PM", 0 -> "12 AM", 570 -> "9:30 AM". */
export function formatMinutes(minutes: number) {
  const total = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h24 < 12 ? "AM" : "PM"}`;
}

/** "11:00", "22:00" -> "11 AM – 10 PM". */
export function formatRange({ open, close }: NonNullable<DayHours>) {
  return `${formatMinutes(toMinutes(open))} – ${formatMinutes(toMinutes(close))}`;
}

/** A close at or before the open time means the next day. */
function window(hours: Hours, day: number) {
  const h = hours[day];
  if (!h) return null;
  const open = toMinutes(h.open);
  let close = toMinutes(h.close);
  if (close <= open) close += MINUTES_PER_DAY;
  return { open, close };
}

export function isOpenNow(hours: Hours, now = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  const day = DAY_NAMES.indexOf(get("weekday"));
  const mins = Number(get("hour")) * 60 + Number(get("minute"));

  const today = window(hours, day);
  if (today && mins >= today.open && mins < today.close) {
    return { open: true, closesAt: today.close % MINUTES_PER_DAY };
  }

  // Yesterday's hours spilling past midnight.
  const yesterday = window(hours, (day + 6) % 7);
  if (yesterday && mins + MINUTES_PER_DAY < yesterday.close) {
    return { open: true, closesAt: yesterday.close % MINUTES_PER_DAY };
  }

  return { open: false };
}
