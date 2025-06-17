"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

interface SupabaseContextType {
  client: SupabaseClient;
  isConnected: boolean;
  connectionError: string | null;
  isInitializing: boolean;
  reconnect: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const checkConnection = async () => {
    try {
      setConnectionError(null);

      // Test connection by making a simple query
      const { error } = await supabase
        .from("profiles")
        .select("count")
        .limit(1);

      if (error) {
        console.error("Supabase connection error:", error);
        setConnectionError(error.message);
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Supabase connection test failed:", error);
      setConnectionError(
        error instanceof Error ? error.message : "Connection test failed"
      );
      setIsConnected(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const reconnect = async () => {
    setIsInitializing(true);
    await checkConnection();
  };

  useEffect(() => {
    // Initial connection check
    checkConnection();

    // Set up auth state change listener to monitor connection
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      // Re-check connection on auth changes
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        await checkConnection();
      }
    });

    // Set up periodic connection health check (every 30 seconds)
    const healthCheckInterval = setInterval(async () => {
      if (!isConnected) {
        await checkConnection();
      }
    }, 30000);

    return () => {
      subscription.unsubscribe();
      clearInterval(healthCheckInterval);
    };
  }, [isConnected]);

  return (
    <SupabaseContext.Provider
      value={{
        client: supabase,
        isConnected,
        connectionError,
        isInitializing,
        reconnect,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
}
