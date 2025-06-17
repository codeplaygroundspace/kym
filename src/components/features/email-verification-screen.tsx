"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface EmailVerificationScreenProps {
  email: string;
  onGoToLogin: () => void;
  onSignUpWithDifferentEmail: () => void;
}

const EmailVerificationScreen = ({
  email,
  onGoToLogin,
  onSignUpWithDifferentEmail,
}: EmailVerificationScreenProps) => {
  return (
    <Card className="bg-bg-primary text-text-primary border-0 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-primary text-center">
          Check Your Email
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">
            Verify Your Email Address
          </h3>
          <p className="text-text-secondary">
            We&apos;ve sent a verification link to:
          </p>
          <p className="font-medium text-text-primary bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
            {email}
          </p>
          <p className="text-sm text-text-secondary">
            Click the link in your email to complete your account setup. You can
            close this page and return once you&apos;ve verified your email.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={onGoToLogin}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={onSignUpWithDifferentEmail}
            className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-primary font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Sign Up with Different Email
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerificationScreen;
