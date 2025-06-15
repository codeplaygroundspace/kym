"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type UserType = "personal" | "practitioner";

interface SignupFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    userType: UserType;
  }) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [selectedUserType, setSelectedUserType] =
    useState<UserType>("personal");
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

  const handleUserTypeChange = (type: UserType) => {
    setSelectedUserType(type);
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

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({ email, password, userType: selectedUserType });
    }
  };

  const handleLoginClick = () => {
    window.location.href = "/auth/login";
  };

  return (
    <Card className="bg-bg-primary text-text-primary border-0 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-primary text-center">
          Sign up
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* User Type Selection */}
        <div>
          <div className="bg-gray-100 rounded-card-lg p-0.5 flex">
            <button
              onClick={() => handleUserTypeChange("personal")}
              className={`flex-1 py-3 px-2 rounded-card-md text-sm font-medium transition-all ${
                selectedUserType === "personal"
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              aria-pressed={selectedUserType === "personal"}
            >
              <div className="text-center">
                <div className="font-medium">Personal</div>
                <div className="text-[10px] opacity-75">Patients/Carers</div>
              </div>
            </button>
            <button
              onClick={() => handleUserTypeChange("practitioner")}
              className={`flex-1 py-3 px-2 rounded-card-md text-sm font-medium transition-all ${
                selectedUserType === "practitioner"
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              aria-pressed={selectedUserType === "practitioner"}
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
          aria-label="Agree and sign up"
        >
          Agree & Sign up
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
              className="text-text-primary underline hover:text-primary transition-colors cursor-pointer font-medium"
            >
              Login
            </button>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center">
          <p className="text-[10px] text-text-muted">
            By signing up you agree to our{" "}
            <button className="text-text-secondary underline hover:text-text-primary transition-colors">
              Terms of Use
            </button>{" "}
            and{" "}
            <button className="text-text-secondary underline hover:text-text-primary transition-colors">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
