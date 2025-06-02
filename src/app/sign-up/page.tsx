"use client";

import SignupForm from "@/components/features/signup-form";
import PrivacyBanner from "@/components/common/privacy-banner";

const SignUpPage = () => {
  const handleBackClick = () => {
    // Navigate to welcome page
    window.location.href = "/welcome";
  };

  const handleGoogleSignUp = () => {
    // Google sign up logic would go here
    console.log("Sign up with Google");
  };

  const handleAppleSignUp = () => {
    // Apple sign up logic would go here
    console.log("Sign up with Apple");
  };

  const handleSignUp = (data: {
    email: string;
    userType: "personal" | "practitioner";
  }) => {
    // Sign up logic would go here
    console.log("Sign up with:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-purple flex flex-col justify-end px-0 pb-0">
      <div className="w-full">
        <PrivacyBanner />
        <SignupForm
          onBackClick={handleBackClick}
          onGoogleAuth={handleGoogleSignUp}
          onAppleAuth={handleAppleSignUp}
          onSubmit={handleSignUp}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
