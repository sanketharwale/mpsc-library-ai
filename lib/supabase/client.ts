import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  client = createBrowserClient(url, key);
  return client;
}

/**
 * Lazy Supabase browser client.
 * This prevents Next.js build-time prerendering from requiring runtime
 * Supabase environment variables, while still validating them when the
 * client is actually used in the browser.
 */
export function createClient(): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get(_target, property, receiver) {
      const supabase = getClient();
      const value = Reflect.get(supabase as object, property, receiver);
      return typeof value === "function" ? value.bind(supabase) : value;
    },
  });
}
