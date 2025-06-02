"use client";

import { useState } from "react";
import { IoLockClosed, IoChevronUp } from "react-icons/io5";
import BackButton from "@/components/common/back-button";
import { GoogleIcon, AppleIcon } from "@/components/icons";

type UserType = "personal" | "practitioner";

const SignUpPage = () => {
  const [selectedUserType, setSelectedUserType] =
    useState<UserType>("personal");
  const [email, setEmail] = useState("");
  const [showPrivacyBanner] = useState(true);

  const handleBackClick = () => {
    // Navigate to welcome page
    window.location.href = "/welcome";
  };

  const handleUserTypeChange = (type: UserType) => {
    setSelectedUserType(type);
  };

  const handleGoogleSignUp = () => {
    // Google sign up logic would go here
    console.log("Sign up with Google");
  };

  const handleAppleSignUp = () => {
    // Apple sign up logic would go here
    console.log("Sign up with Apple");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSignUp = () => {
    // Sign up logic would go here
    console.log("Sign up with email:", email);
  };

  return (
    <div className="min-h-screen bg-gradient-purple flex items-end justify-center px-4 pb-0">
      <div className="w-full max-w-sm">
        {/* Privacy Banner */}
        {showPrivacyBanner && (
          <div className="mb-4 flex justify-center">
            <div className="bg-black/50 backdrop-blur-sm rounded-card-lg px-4 py-3 flex items-center gap-3 text-white w-full">
              <div className="flex items-center gap-2 flex-1">
                <IoLockClosed className="w-5 h-5 text-purple-200" />
                <div>
                  <div className="text-sm font-medium">Our Privacy Promise</div>
                  <div className="text-xs text-purple-200">
                    We protect your personal data
                  </div>
                </div>
              </div>
              <a
                href="/privacy-promise"
                className="text-purple-200 hover:text-white transition-colors"
                aria-label="View privacy promise details"
              >
                <IoChevronUp className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-bg-primary rounded-t-card-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <BackButton onClick={handleBackClick} size={20} />
            <h1 className="text-md font-semibold text-text-primary">Sign up</h1>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <div className="bg-gray-100 rounded-card-lg p-1 flex">
              <button
                onClick={() => handleUserTypeChange("personal")}
                className={`flex-1 py-3 px-4 rounded-card-md text-sm font-medium transition-all ${
                  selectedUserType === "personal"
                    ? "bg-white text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                aria-pressed={selectedUserType === "personal"}
              >
                <div className="text-center">
                  <div className="font-medium">Personal</div>
                  <div className="text-xs opacity-75">Patients/Carers</div>
                </div>
              </button>
              <button
                onClick={() => handleUserTypeChange("practitioner")}
                className={`flex-1 py-3 px-4 rounded-card-md text-sm font-medium transition-all ${
                  selectedUserType === "practitioner"
                    ? "bg-white text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                aria-pressed={selectedUserType === "practitioner"}
              >
                <div className="text-center">
                  <div className="font-medium">Practitioner</div>
                  <div className="text-xs opacity-75">
                    Licensed practitioners
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignUp}
              className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-lg py-4 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
              aria-label="Sign up with Google"
            >
              <GoogleIcon size={20} />
              Sign up with Google
            </button>

            <button
              onClick={handleAppleSignUp}
              className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-lg py-4 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
              aria-label="Sign up with Apple"
            >
              <AppleIcon size={20} />
              Sign up with Apple
            </button>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="w-full bg-gray-100 border border-gray-200 rounded-card-lg py-4 px-4 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              aria-label="Email address"
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-card-lg py-4 px-4 font-semibold transition-all shadow-lg"
            aria-label="Agree and sign up"
          >
            Agree & Sign up
          </button>

          {/* Terms and Privacy */}
          <div className="mt-4 text-center">
            <p className="text-xs text-text-muted">
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
      </div>
    </div>
  );
};

export default SignUpPage;
