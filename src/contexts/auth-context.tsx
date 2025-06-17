"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { AuthState } from "@/types/auth";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { generateUsername } from "@/lib/username-generator";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    role: "patient" | "practitioner"
  ) => Promise<{ needsEmailVerification?: boolean; email?: string } | void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  });

  // Create Supabase client using the modern SSR client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchUserProfile = useCallback(
    async (user: User) => {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Profile fetch error:", error);
          throw error;
        }

        setAuthState({
          user,
          profile,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setAuthState({
          user,
          profile: null,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch profile",
        });
      }
    },
    [supabase]
  );

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          setAuthState((prev) => ({
            ...prev,
            isLoading: false,
            error: sessionError.message,
          }));
          return;
        }

        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Initial session error:", error);
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Session initialization failed",
        }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.id);

      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        // User signed out or session expired
        setAuthState({
          user: null,
          profile: null,
          isLoading: false,
          error: null,
        });
      }

      // Refresh the server state to sync with middleware
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router, supabase.auth, fetchUserProfile]);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      // Refresh server state to sync with middleware
      router.refresh();

      // Profile will be fetched automatically by the auth state change listener
    } catch (error) {
      console.error("Login failed:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }));
      throw error;
    }
  };

  const signup = async (
    email: string,
    password: string,
    role: "patient" | "practitioner"
  ) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Generate a privacy-friendly display name
      const displayName = generateUsername();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            display_name: displayName,
          },
          emailRedirectTo: window.location.origin + "/welcome",
        },
      });

      if (error) throw error;

      // Check if email verification is required
      if (data.user && !data.session) {
        // Email verification required
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: null,
        }));

        // Return a special indicator that email verification is needed
        return { needsEmailVerification: true, email };
      }

      // If we have a session, refresh server state
      if (data.session) {
        router.refresh();
      }

      // Profile will be created automatically by the database trigger
      // and fetched by the auth state change listener if session exists
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Signup failed",
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // The auth state will be updated by the onAuthStateChange listener
      // but we can also set it immediately for faster UI response
      setAuthState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      });

      // Refresh server state to sync with middleware
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setAuthState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Logout failed",
      }));
      throw error; // Re-throw to let the UI handle the error
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
