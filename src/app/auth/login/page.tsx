"use client";

import LoginForm from "@/components/features/login-form";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const LoginPage = () => {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect if we have both user and profile, not loading, and haven't redirected yet
    if (!isLoading && user && profile && !hasRedirected.current) {
      hasRedirected.current = true;

      // Use setTimeout to ensure the authentication state is fully settled
      setTimeout(() => {
        if (profile.role === "patient") {
          router.replace("/patient");
        } else if (profile.role === "practitioner") {
          router.replace("/practitioner");
        }
      }, 100);
    }
  }, [user, profile, isLoading, router]);

  const handleLogIn = () => {
    // Reset redirect flag when new login attempt is made
    hasRedirected.current = false;
    // Navigation will be handled by the useEffect above
  };

  // Render the form immediately - no loading state for public routes
  // If user is authenticated, the useEffect will handle redirection
  return <LoginForm onSubmit={handleLogIn} />;
};

export default LoginPage;
