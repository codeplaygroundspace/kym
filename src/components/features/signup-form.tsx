"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

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
  const [selectedUserRole, setSelectedUserRole] = useState<UserRole>("patient");
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

  // Check if error indicates user already exists
  const isUserExistsError =
    error &&
    (error.includes("already registered") ||
      error.includes("already exists") ||
      error.includes("User already registered"));

  const handleUserRoleChange = (role: UserRole) => {
    setSelectedUserRole(role);
  };

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
        await signup(email, password, selectedUserRole);
        // Call optional onSubmit callback if provided
        onSubmit?.({ email, password, role: selectedUserRole });
      } catch {
        // Error is handled by the auth context
      }
    }
  };

  const handleLoginClick = () => {
    window.location.href = "/auth/login";
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
          Sign up
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error Display */}
        {error && (
          <div
            className={`border rounded-lg p-4 ${
              isUserExistsError
                ? "bg-blue-50 border-blue-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isUserExistsError ? "text-blue-800" : "text-red-600"
                  }`}
                >
                  {isUserExistsError
                    ? "Account Already Exists"
                    : "Sign Up Error"}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    isUserExistsError ? "text-blue-700" : "text-red-600"
                  }`}
                >
                  {isUserExistsError
                    ? `An account with ${email} already exists. Would you like to log in instead?`
                    : error}
                </p>
                {isUserExistsError && (
                  <div className="mt-3">
                    <button
                      onClick={handleLoginClick}
                      onKeyDown={(e) => handleKeyDown(e, handleLoginClick)}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      tabIndex={0}
                      aria-label="Go to login page"
                    >
                      Go to Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* User Role Selection */}
        <div>
          <div className="bg-gray-100 rounded-2xl p-0.5 flex">
            <button
              onClick={() => handleUserRoleChange("patient")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleUserRoleChange("patient"))
              }
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                selectedUserRole === "patient"
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              aria-pressed={selectedUserRole === "patient"}
              tabIndex={0}
            >
              <div className="text-center">
                <div className="font-medium">Patient</div>
                <div className="text-[10px] opacity-75">Patients/Carers</div>
              </div>
            </button>
            <button
              onClick={() => handleUserRoleChange("practitioner")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleUserRoleChange("practitioner"))
              }
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                selectedUserRole === "practitioner"
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              aria-pressed={selectedUserRole === "practitioner"}
              tabIndex={0}
            >
              <div className="text-center">
                <div className="font-medium">Practitioner</div>
                <div className="text-[10px] opacity-75">
                  Licensed practitioners
                </div>
              </div>
            </button>
          </div>
        </div>

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
              onClick={handleLoginClick}
              onKeyDown={(e) => handleKeyDown(e, handleLoginClick)}
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
