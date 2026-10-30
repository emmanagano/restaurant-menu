import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

/**
 * Supabase client for Server Components and server actions, using the anon key.
 *
 * The site has no user auth, so this client never reads or writes cookies.
 * Touching `cookies()` would make every content page dynamic and defeat
 * static generation. The service role key is never used here.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
  });
}
