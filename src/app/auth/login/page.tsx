"use client";

import LoginForm from "@/components/features/login-form";
import PrivacyBanner from "@/components/common/privacy-banner";
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
      console.log("Login page: Redirecting user to", profile.role, "dashboard");

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

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-purple flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PrivacyBanner />
      <LoginForm onSubmit={handleLogIn} />
    </>
  );
};

export default LoginPage;
