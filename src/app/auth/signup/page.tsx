"use client";

import SignupForm from "@/components/features/signup-form";
import PrivacyBanner from "@/components/common/privacy-banner";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
  const { user, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to their dashboard
    if (user && profile) {
      if (profile.role === "patient") {
        router.push("/patient");
      } else if (profile.role === "practitioner") {
        router.push("/practitioner");
      }
    }
  }, [user, profile, router]);

  const handleSignUp = () => {
    // Navigation will be handled by the useEffect above
  };

  return (
    <>
      <PrivacyBanner />
      <SignupForm onSubmit={handleSignUp} />
    </>
  );
};

export default SignUpPage;
