"use client";

import SignupForm from "@/components/features/signup-form";
import PrivacyBanner from "@/components/common/privacy-banner";

const SignUpPage = () => {
  const handleGoogleSignUp = () => {
    // Google sign up logic would go here
    console.log("Sign up with Google");
  };

  const handleSignUp = (data: {
    email: string;
    userType: "personal" | "practitioner";
  }) => {
    // Sign up logic would go here
    console.log("Sign up with:", data);
  };

  return (
    <>
      <PrivacyBanner />
      <SignupForm onGoogleAuth={handleGoogleSignUp} onSubmit={handleSignUp} />
    </>
  );
};

export default SignUpPage;
