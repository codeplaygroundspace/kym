"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({ email, password });
    }
  };

  const handleSignUpClick = () => {
    window.location.href = "/auth/signup";
  };

  return (
    <Card className="bg-bg-primary text-text-primary border-0 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-primary text-center">
          Login to your account
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
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
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          disabled={!isFormValid}
          className={`w-full rounded-card-sm py-2 px-4 font-semibold transition-all shadow-lg ${
            isFormValid
              ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Continue to log in"
        >
          Continue
        </button>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            {`Don't have an account? `}
            <button
              onClick={handleSignUpClick}
              className="text-text-primary underline hover:text-primary transition-colors cursor-pointer font-medium"
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
