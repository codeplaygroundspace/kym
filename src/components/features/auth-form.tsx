"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import BackButton from "@/components/common/back-button";
import { GoogleIcon, AppleIcon } from "@/components/icons";

type UserType = "personal" | "practitioner";
type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
  onBackClick: () => void;
  onGoogleAuth: () => void;
  onAppleAuth: () => void;
  onSubmit: (data: {
    email: string;
    password?: string;
    userType: UserType;
  }) => void;
}

const AuthForm = ({
  mode,
  onBackClick,
  onGoogleAuth,
  onAppleAuth,
  onSubmit,
}: AuthFormProps) => {
  const [selectedUserType, setSelectedUserType] =
    useState<UserType>("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";
  const isSignup = mode === "signup";

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
    const data = {
      email,
      userType: selectedUserType,
      ...(isLogin && { password }),
    };
    onSubmit(data);
  };

  return (
    <div className="bg-bg-primary rounded-t-card-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <BackButton onClick={onBackClick} size={20} />
        <h1 className="text-md font-semibold text-text-primary">
          {isLogin ? "Log in" : "Sign up"}
        </h1>
      </div>

      {/* User Type Selection */}
      <div className="mb-6">
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

      {/* Social Auth Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={onGoogleAuth}
          className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-sm py-2 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
          aria-label={`${isLogin ? "Log in" : "Sign up"} with Google`}
        >
          <GoogleIcon size={20} />
          {isLogin ? "Log in" : "Sign up"} with Google
        </button>

        <button
          onClick={onAppleAuth}
          className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-sm py-2 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
          aria-label={`${isLogin ? "Log in" : "Sign up"} with Apple`}
        >
          <AppleIcon size={20} />
          {isLogin ? "Log in" : "Sign up"} with Apple
        </button>
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="w-full bg-gray-100 border border-gray-200 rounded-card-sm py-2 px-4 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          aria-label="Email address"
        />
      </div>

      {/* Password Input - Only for Login */}
      {isLogin && (
        <div className="mb-6">
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
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full bg-primary hover:bg-primary/90 text-white rounded-card-sm py-2 px-4 font-semibold transition-all shadow-lg ${
          isSignup ? "mb-6" : ""
        }`}
        aria-label={isLogin ? "Continue to log in" : "Agree and sign up"}
      >
        {isLogin ? "Continue" : "Agree & Sign up"}
      </button>

      {/* Terms and Privacy */}
      <div className="mt-0 text-center">
        <p className="text-[10px] text-text-muted">
          By {isLogin ? "logging in" : "signing up"} you agree to our{" "}
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
    </div>
  );
};

export default AuthForm;
