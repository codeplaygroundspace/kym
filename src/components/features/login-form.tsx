"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import BackButton from "@/components/common/back-button";
import { GoogleIcon, AppleIcon } from "@/components/icons";

interface LoginFormProps {
  onBackClick: () => void;
  onGoogleAuth: () => void;
  onAppleAuth: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm = ({
  onBackClick,
  onGoogleAuth,
  onAppleAuth,
  onSubmit,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    onSubmit({ email, password });
  };

  return (
    <div className="bg-bg-primary rounded-t-card-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <BackButton onClick={onBackClick} size={20} />
        <h1 className="text-md font-semibold text-text-primary">Log in</h1>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={onGoogleAuth}
          className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-sm py-2 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
          aria-label="Log in with Google"
        >
          <GoogleIcon size={20} />
          Log in with Google
        </button>

        <button
          onClick={onAppleAuth}
          className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-sm py-2 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
          aria-label="Log in with Apple"
        >
          <AppleIcon size={20} />
          Log in with Apple
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

      {/* Password Input */}
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-card-sm py-2 px-4 font-semibold transition-all shadow-lg"
        aria-label="Continue to log in"
      >
        Continue
      </button>
    </div>
  );
};

export default LoginForm;
