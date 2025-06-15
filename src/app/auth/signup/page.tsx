"use client";

import SignupForm from "@/components/features/signup-form";
import PrivacyBanner from "@/components/common/privacy-banner";

const SignUpPage = () => {
  const handleSignUp = (data: {
    email: string;
    password: string;
    userType: "personal" | "practitioner";
  }) => {
    // Sign up logic would go here
    console.log("Sign up with:", data);
  };

  return (
    <>
      <PrivacyBanner />
      <SignupForm onSubmit={handleSignUp} />
    </>
  );
};

export default SignUpPage;
