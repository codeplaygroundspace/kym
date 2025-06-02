"use client";

import { useState } from "react";
import BackButton from "@/components/common/back-button";
import { GoogleIcon, AppleIcon } from "@/components/icons";

type UserType = "personal" | "practitioner";

interface SignupFormProps {
  onBackClick: () => void;
  onGoogleAuth: () => void;
  onAppleAuth: () => void;
  onSubmit: (data: { email: string; userType: UserType }) => void;
}

const SignupForm = ({
  onBackClick,
  onGoogleAuth,
  onAppleAuth,
  onSubmit,
}: SignupFormProps) => {
  const [selectedUserType, setSelectedUserType] =
    useState<UserType>("personal");
  const [email, setEmail] = useState("");

  const handleUserTypeChange = (type: UserType) => {
    setSelectedUserType(type);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ email, userType: selectedUserType });
  };

  return (
    <div className="bg-bg-primary rounded-t-card-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <BackButton onClick={onBackClick} size={20} />
        <h1 className="text-md font-semibold text-text-primary">Sign up</h1>
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
          aria-label="Sign up with Google"
        >
          <GoogleIcon size={20} />
          Sign up with Google
        </button>

        <button
          onClick={onAppleAuth}
          className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-sm py-2 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
          aria-label="Sign up with Apple"
        >
          <AppleIcon size={20} />
          Sign up with Apple
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-card-sm py-2 px-4 font-semibold transition-all shadow-lg mb-4"
        aria-label="Agree and sign up"
      >
        Agree & Sign up
      </button>

      {/* Terms and Privacy */}
      <div className="mt-2 text-center">
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
    </div>
  );
};

export default SignupForm;
