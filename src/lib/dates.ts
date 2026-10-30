/** Today's date in Asia/Manila as YYYY-MM-DD. */
export function manilaToday(now: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(now);
}
