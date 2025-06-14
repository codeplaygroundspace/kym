"use client";

import LoginForm from "@/components/features/login-form";

const LogInPage = () => {
  const handleGoogleLogIn = () => {
    // Google log in logic would go here
    console.log("Log in with Google");
  };

  const handleLogIn = (data: { email: string; password: string }) => {
    // Log in logic would go here
    console.log("Log in with:", data);
    // Navigate to home page after login
    window.location.href = "/";
  };

  return <LoginForm onGoogleAuth={handleGoogleLogIn} onSubmit={handleLogIn} />;
};

export default LogInPage;
