"use client";

import AuthForm from "@/components/features/auth-form";

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
    password?: string;
    userType: "personal" | "practitioner";
  }) => {
    // Sign up logic would go here
    console.log("Sign up with:", data);
  };

  return (
    <AuthForm
      mode="signup"
      onBackClick={handleBackClick}
      onGoogleAuth={handleGoogleSignUp}
      onAppleAuth={handleAppleSignUp}
      onSubmit={handleSignUp}
    />
  );
};

export default SignUpPage;
