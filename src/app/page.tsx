"use client";

import { useAuth } from "@/contexts/auth-context";

export default function RootPage() {
  const { isLoading } = useAuth();

  // Show a loading state while the middleware determines the correct route.
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

  // The middleware will handle all redirects.
  // This page can return null or a minimal loading indicator
  // as it will be quickly replaced.
  return null;
}
