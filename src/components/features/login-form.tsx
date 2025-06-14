"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { GoogleIcon } from "@/components/icons";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

interface LoginFormProps {
  onGoogleAuth: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm = ({ onGoogleAuth, onSubmit }: LoginFormProps) => {
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

  const handleSignUpClick = () => {
    window.location.href = "/auth/signup";
  };

  return (
    <Card className="bg-bg-primary text-text-primary rounded-t-card-2xl rounded-b-none md:rounded-b-2xl border-0 shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-text-primary">
          Login to your account
        </CardTitle>
        <CardAction>
          <button
            onClick={handleSignUpClick}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors underline cursor-pointer"
          >
            Sign Up
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Social Auth Buttons */}
        <div>
          <button
            onClick={onGoogleAuth}
            className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-sm py-2 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
            aria-label="Log in with Google"
          >
            <GoogleIcon size={20} />
            Log in with Google
          </button>
        </div>

        {/* Email Input */}
        <div>
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
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-card-sm py-2 px-4 font-semibold transition-all shadow-lg"
          aria-label="Continue to log in"
        >
          Continue
        </button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
