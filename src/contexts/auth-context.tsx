"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "@/types/auth";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { generateUsername } from "@/lib/username-generator";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    role: "patient" | "practitioner"
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  });

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
      console.log("Auth state change:", event, session?.user?.email);

      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setAuthState({
          user: null,
          profile: null,
          isLoading: false,
          error: null,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (user: User) => {
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

      console.log("Profile fetched:", profile);

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
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      console.log("Login successful:", data.user?.email);

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

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            display_name: displayName,
          },
        },
      });

      if (error) throw error;

      // Profile will be created automatically by the database trigger
      // and fetched by the auth state change listener
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

      setAuthState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Logout error:", error);
      setAuthState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Logout failed",
      }));
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
