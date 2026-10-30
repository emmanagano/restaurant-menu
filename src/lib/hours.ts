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

/** Day of week (0 = Sunday) and minutes since midnight, in Asia/Manila. */
export function manilaClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return {
    day: DAY_NAMES.indexOf(get("weekday")),
    mins: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function isOpenNow(hours: Hours, now = new Date()): OpenStatus {
  const { day, mins } = manilaClock(now);

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

/** Status labels from the content deck: "Open now · Closes at 10 PM", "Opens at 11 AM", "Closed today". */
export function getHoursStatus(hours: Hours, now = new Date()) {
  const { day, mins } = manilaClock(now);
  const status = isOpenNow(hours, now);
  if (status.open) {
    return { day, label: `Open now · Closes at ${formatMinutes(status.closesAt)}` };
  }
  const today = window(hours, day);
  if (today && mins < today.open) {
    return { day, label: `Opens at ${formatMinutes(today.open)}` };
  }
  return { day, label: "Closed today" };
}

const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Consecutive days with the same hours, Monday first: "Mon–Thu", "Fri–Sat", "Sun" or "Daily". */
export function groupHours(hours: Hours) {
  const rangeOf = (day: number) => {
    const h = hours[day];
    return h ? formatRange(h) : "Closed";
  };
  const groups: { days: number[]; range: string }[] = [];
  for (const day of WEEK_ORDER) {
    const range = rangeOf(day);
    const last = groups[groups.length - 1];
    if (last && last.range === range) last.days.push(day);
    else groups.push({ days: [day], range });
  }
  return groups.map(({ days, range }) => ({
    days,
    range,
    label:
      days.length === 7
        ? "Daily"
        : days.length === 1
          ? DAY_NAMES[days[0]]
          : `${DAY_NAMES[days[0]]}–${DAY_NAMES[days[days.length - 1]]}`,
  }));
}
