import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://tlaavhjemifoqjasvevu.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWF2aGplbWlmb3FqYXN2ZXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTkxMzUsImV4cCI6MjA2NTQ3NTEzNX0.EFRD-vuOgMrGtXll4eO42j1CmKL8bYpz4MliW1XiSrE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});

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
