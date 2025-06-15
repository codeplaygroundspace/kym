"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form is valid
  const isFormValid =
    email.trim() !== "" && isValidEmail(email) && password.trim() !== "";

  // Check if error indicates account not found
  const isAccountNotFoundError =
    error &&
    (error.includes("User not found") ||
      error.includes("No user found") ||
      error.includes("Invalid login credentials"));

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        await login(email, password);
        // Call optional onSubmit callback if provided
        onSubmit?.({ email, password });
      } catch {
        // Error is handled by the auth context
      }
    }
  };

  const handleSignUpClick = () => {
    window.location.href = "/auth/signup";
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <Card className="bg-bg-primary text-text-primary border-0 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-primary text-center">
          Login to your account
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error Display */}
        {error && (
          <div
            className={`border rounded-card-sm p-4 ${
              isAccountNotFoundError
                ? "bg-blue-50 border-blue-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isAccountNotFoundError ? "text-blue-800" : "text-red-600"
                  }`}
                >
                  {isAccountNotFoundError
                    ? "Account Not Found"
                    : "Login Failed"}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    isAccountNotFoundError ? "text-blue-700" : "text-red-600"
                  }`}
                >
                  {isAccountNotFoundError
                    ? `No account found with ${email}. Would you like to create one?`
                    : "Please check your email and password and try again."}
                </p>
                {isAccountNotFoundError && (
                  <div className="mt-3">
                    <button
                      onClick={handleSignUpClick}
                      onKeyDown={(e) => handleKeyDown(e, handleSignUpClick)}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-card-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      tabIndex={0}
                      aria-label="Create new account"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className={`w-full bg-gray-100 border rounded-card-sm py-2 px-4 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
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
              className="w-full bg-gray-100 border border-gray-200 rounded-card-sm py-2 px-4 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
          className={`w-full rounded-card-sm py-2 px-4 font-semibold transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFormValid && !isLoading
              ? "bg-primary hover:bg-primary/90 text-white cursor-pointer focus:ring-primary"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Continue to log in"
          tabIndex={0}
        >
          {isLoading ? "Signing in..." : "Continue"}
        </button>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            {`Don't have an account? `}
            <button
              onClick={handleSignUpClick}
              onKeyDown={(e) => handleKeyDown(e, handleSignUpClick)}
              className="text-text-primary underline hover:text-primary transition-colors cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              tabIndex={0}
              aria-label="Create new account"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
