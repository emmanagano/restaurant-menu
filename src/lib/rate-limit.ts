const hits = new Map<string, number[]>();

/**
 * In-memory limiter: true while `key` is under `limit` hits per window.
 * State is per server instance, which is enough for a demo; use a shared store for production.
 */
export function withinRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  hits.set(key, [...recent, now]);
  return true;
}
