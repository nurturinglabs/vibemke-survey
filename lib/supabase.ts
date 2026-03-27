import { createClient } from "@supabase/supabase-js";

function getUrl() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ""
  );
}

function getAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
  );
}

export function getSupabase() {
  return createClient(getUrl(), getAnonKey());
}

export function createServiceClient() {
  return createClient(
    getUrl(),
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
}
