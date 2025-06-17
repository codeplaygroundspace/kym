"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/common/back-button";
import { useAuth } from "@/contexts/auth-context";
import { Trash2 } from "lucide-react";

const DeleteAccountPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBackClick = () => {
    router.back();
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      console.log("Account deletion requested for user:", user?.id);

      // Send deletion request to admin
      const response = await fetch("/api/delete-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          userEmail: user?.email,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit deletion request");
      }

      // Show success message and redirect
      alert(
        "Your account deletion request has been submitted. We'll process it within 24 hours and send you a confirmation email."
      );

      // Redirect to welcome page
      router.replace("/welcome");
    } catch (error) {
      console.error("Failed to submit deletion request:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit deletion request. Please try again."
      );
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={handleBackClick} size={20} />
          <h1 className="text-lg font-semibold text-text-primary">
            Delete Account
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Delete Account
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Request to permanently remove your account and all of its
                contents from KYM. We&apos;ll process your request within 24
                hours and send you a confirmation email.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-medium text-text-primary">
              What will be deleted:
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full"></div>
                Your profile and account information
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full"></div>
                All your mood entries and journey data
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full"></div>
                Message history with practitioners
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full"></div>
                All app preferences and settings
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> Account deletion is permanent and
              cannot be undone. If you&apos;re experiencing difficulties,
              consider reaching out to our support team first - we&apos;re here
              to help.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}
        </div>

        {/* Delete Action Card */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-900 dark:text-red-100 mb-1">
                Danger Zone
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                Once submitted, we&apos;ll process your deletion request within
                24 hours.
              </p>
            </div>
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Are you sure?
              </h3>
              <p className="text-text-secondary text-sm">
                This will permanently delete your account and all your data.
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-text-primary font-medium py-2 px-4 rounded-xl transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-xl transition-colors"
              >
                {isDeleting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountPage;
