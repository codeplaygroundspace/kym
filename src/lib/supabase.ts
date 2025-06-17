import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

// Modern SSR-compatible client for browser usage
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// For server-side operations that require elevated permissions
// Only create admin client if service role key is available
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Types for our database
export interface Profile {
  id: string;
  email: string;
  role: "patient" | "practitioner";
  display_name?: string; // Privacy-friendly display name
  avatar_url?: string; // Profile avatar URL
  created_at: string;
  updated_at: string;
}
