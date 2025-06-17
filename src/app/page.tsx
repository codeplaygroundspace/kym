"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/lib/supabase";

export default function RootPage() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const lastAuthState = useRef<{
    user: User | null;
    profile: Profile | null;
  } | null>(null);

  useEffect(() => {
    if (!isLoading) {
      // Check if auth state has actually changed
      const currentAuthState = { user, profile };
      const hasAuthStateChanged =
        JSON.stringify(lastAuthState.current) !==
        JSON.stringify(currentAuthState);

      if (hasAuthStateChanged) {
        lastAuthState.current = currentAuthState;

        if (user && profile) {
          // User is authenticated, redirect to their dashboard
          setTimeout(() => {
            if (profile.role === "patient") {
              router.replace("/patient");
            } else if (profile.role === "practitioner") {
              router.replace("/practitioner");
            }
          }, 100);
        } else {
          // User is not authenticated, redirect to welcome page
          setTimeout(() => {
            router.replace("/welcome");
          }, 100);
        }
      }
    }
  }, [user, profile, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // This will be briefly shown before redirect
  return null;
}
