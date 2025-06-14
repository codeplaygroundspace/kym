"use client";

import { useState } from "react";
import { GoogleIcon } from "@/components/icons";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

type UserType = "personal" | "practitioner";

interface SignupFormProps {
  onGoogleAuth: () => void;
  onSubmit: (data: { email: string; userType: UserType }) => void;
}

const SignupForm = ({ onGoogleAuth, onSubmit }: SignupFormProps) => {
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

  const handleLoginClick = () => {
    window.location.href = "/auth/login";
  };

  return (
    <Card className="bg-bg-primary text-text-primary rounded-t-card-2xl rounded-b-none md:rounded-b-2xl border-0 shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-text-primary">
          Sign up
        </CardTitle>
        <CardAction>
          <button
            onClick={handleLoginClick}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors underline cursor-pointer"
          >
            Login
          </button>
        </CardAction>
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

        {/* Social Auth Buttons */}
        <div>
          <button
            onClick={onGoogleAuth}
            className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary rounded-card-sm py-2 px-4 flex items-center justify-center gap-3 transition-all font-medium border border-gray-200"
            aria-label="Sign up with Google"
          >
            <GoogleIcon size={20} />
            Sign up with Google
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

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-card-sm py-2 px-4 font-semibold transition-all shadow-lg"
          aria-label="Agree and sign up"
        >
          Agree & Sign up
        </button>

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
