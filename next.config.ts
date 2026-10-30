import type { NextConfig } from "next";
import { locationCopy } from "./src/content/locations";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : "";
const isDev = process.env.NODE_ENV !== "production";

// Basic CSP. Next's hydration scripts are inline, and nonces would make every page dynamic,
// so scripts allow 'unsafe-inline'. Add the analytics host here when one is connected.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${supabaseOrigin}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin}${isDev ? " ws:" : ""}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

// An unknown /locations/[slug] that throws notFound() reaches the browser as a 404 with an empty HTML
// body (Next 16.4 prerenders it as an error shell). Sending it to a path that doesn't exist renders the
// global 404 page on the server instead, which is what any other unmatched URL gets.
const knownLocations = Object.keys(locationCopy).join("|");

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: `/locations/:slug((?!(?:${knownLocations})$)[^/]+)`, destination: "/not-found-rewrite" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  cacheComponents: true,
  // Explicit false keeps today's prefetching and silences the unset warning. true gave soft 404s on
  // unknown /locations/[slug] (see the project notes), so re-test those before changing it.
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
