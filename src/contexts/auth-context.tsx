"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
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
    // TODO: Initialize Supabase auth listener
    // For now, simulate loading completion
    setTimeout(() => {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      // TODO: Implement Supabase login
      console.log("Login attempt:", { email, password });
      throw new Error("Supabase integration pending");
    } catch (error) {
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
    name: string,
    role: "patient" | "practitioner"
  ) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      // TODO: Implement Supabase signup
      console.log("Signup attempt:", { email, password, name, role });
      throw new Error("Supabase integration pending");
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
      // TODO: Implement Supabase logout
      setAuthState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Logout error:", error);
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
