export type AnalyticsEvent =
  | "book_click"
  | "book_submit"
  | "menu_view"
  | "menu_filter"
  | "call_click"
  | "directions_click"
  | "enquiry_submit"
  | "newsletter_submit";

/** Never pass personal data (names, emails, phone numbers) in the payload. */
type Payload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Pushes to the tag manager data layer. A no-op until an analytics tool is connected. */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...payload });
}
