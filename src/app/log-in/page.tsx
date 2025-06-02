"use client";

import LoginForm from "@/components/features/login-form";

const LogInPage = () => {
  const handleBackClick = () => {
    // Navigate to welcome page
    window.location.href = "/welcome";
  };

  const handleGoogleLogIn = () => {
    // Google log in logic would go here
    console.log("Log in with Google");
  };

  const handleAppleLogIn = () => {
    // Apple log in logic would go here
    console.log("Log in with Apple");
  };

  const handleLogIn = (data: { email: string; password: string }) => {
    // Log in logic would go here
    console.log("Log in with:", data);
    // Navigate to home page after login
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-purple flex flex-col justify-end px-0 pb-0">
      <div className="w-full">
        <LoginForm
          onBackClick={handleBackClick}
          onGoogleAuth={handleGoogleLogIn}
          onAppleAuth={handleAppleLogIn}
          onSubmit={handleLogIn}
        />
      </div>
    </div>
  );
};

export default LogInPage;
