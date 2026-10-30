import { headers } from "next/headers";

/** Client IP for rate limiting. Netlify sets the first header; `x-forwarded-for` covers local runs. */
export async function getClientIp() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-nf-client-connection-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}
