"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useSignupForm } from "@/lib/hooks/use-signup-form";
import UserRoleSelector from "./user-role-selector";
import EmailVerificationScreen from "./email-verification-screen";
import SignupErrorDisplay from "./signup-error-display";

type UserRole = "patient" | "practitioner";

interface SignupFormProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    role: UserRole;
  }) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const { signup, isLoading, error } = useAuth();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");

  const {
    selectedUserRole,
    email,
    password,
    showPassword,
    isFormValid,
    handleUserRoleChange,
    handleEmailChange,
    handlePasswordChange,
    handleTogglePassword,
    resetForm,
    isValidEmail,
  } = useSignupForm();

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const result = await signup(email, password, selectedUserRole);

        // Check if email verification is needed
        if (result?.needsEmailVerification) {
          setVerificationEmail(result.email || email);
          setShowEmailVerification(true);
        } else {
          // Call optional onSubmit callback if provided
          onSubmit?.({ email, password, role: selectedUserRole });
        }
      } catch {
        // Error is handled by the auth context
      }
    }
  };

  const handleGoToLogin = () => {
    window.location.href = "/auth/login";
  };

  const handleSignUpWithDifferentEmail = () => {
    setShowEmailVerification(false);
    resetForm();
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  // Show email verification screen if needed
  if (showEmailVerification) {
    return (
      <EmailVerificationScreen
        email={verificationEmail}
        onGoToLogin={handleGoToLogin}
        onSignUpWithDifferentEmail={handleSignUpWithDifferentEmail}
      />
    );
  }

  return (
    <Card className="bg-bg-primary text-text-primary border-0 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-primary text-center">
          Sign up
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error Display */}
        {error && (
          <SignupErrorDisplay
            error={error}
            email={email}
            onGoToLogin={handleGoToLogin}
          />
        )}

        {/* User Role Selection */}
        <UserRoleSelector
          selectedRole={selectedUserRole}
          onRoleChange={handleUserRoleChange}
        />

        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className={`w-full bg-gray-100 border rounded-lg py-2 px-4 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
              email.trim() !== "" && !isValidEmail(email)
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-200"
            }`}
            aria-label="Email address"
            tabIndex={0}
          />
          {email.trim() !== "" && !isValidEmail(email) && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-4 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              aria-label="Password"
              tabIndex={0}
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              onKeyDown={(e) => handleKeyDown(e, handleTogglePassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? (
                <IoEyeOff className="w-5 h-5" />
              ) : (
                <IoEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
          disabled={!isFormValid || isLoading}
          className={`w-full rounded-lg py-2 px-4 font-semibold transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFormValid && !isLoading
              ? "bg-primary hover:bg-primary/90 text-white cursor-pointer focus:ring-primary"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Agree and sign up"
          tabIndex={0}
        >
          {isLoading ? "Creating account..." : "Agree & Sign up"}
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{" "}
            <button
              onClick={handleGoToLogin}
              onKeyDown={(e) => handleKeyDown(e, handleGoToLogin)}
              className="text-text-primary underline hover:text-primary transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              tabIndex={0}
              aria-label="Go to login page"
            >
              Login
            </button>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center">
          <p className="text-[10px] text-text-muted">
            By signing up you agree to our{" "}
            <button
              className="text-text-secondary underline hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              tabIndex={0}
              aria-label="View terms of use"
            >
              Terms of Use
            </button>{" "}
            and{" "}
            <button
              className="text-text-secondary underline hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              tabIndex={0}
              aria-label="View privacy policy"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
