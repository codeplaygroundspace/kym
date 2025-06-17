"use client";

interface SignupErrorDisplayProps {
  error: string;
  email: string;
  onGoToLogin: () => void;
}

const SignupErrorDisplay = ({
  error,
  email,
  onGoToLogin,
}: SignupErrorDisplayProps) => {
  // Check if error indicates user already exists
  const isUserExistsError =
    error &&
    (error.includes("already registered") ||
      error.includes("already exists") ||
      error.includes("User already registered"));

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
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
            {isUserExistsError ? "Account Already Exists" : "Sign Up Error"}
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
                onClick={onGoToLogin}
                onKeyDown={(e) => handleKeyDown(e, onGoToLogin)}
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
  );
};

export default SignupErrorDisplay;
