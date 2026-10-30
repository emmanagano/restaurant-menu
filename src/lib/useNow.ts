import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};

// Rounded to the minute so the snapshot is stable between renders.
const getSnapshot = () => Math.floor(Date.now() / 60_000) * 60_000;

/** The current time, ticking each minute. `null` on the server and during hydration. */
export function useNow(): Date | null {
  const now = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return now === null ? null : new Date(now);
}
