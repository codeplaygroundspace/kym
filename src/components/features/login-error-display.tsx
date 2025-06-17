"use client";

interface LoginErrorDisplayProps {
  error: string;
  email: string;
  onGoToSignUp: () => void;
}

const LoginErrorDisplay = ({
  error,
  email,
  onGoToSignUp,
}: LoginErrorDisplayProps) => {
  // Check if error indicates account not found
  const isAccountNotFoundError =
    error &&
    (error.includes("User not found") ||
      error.includes("No user found") ||
      error.includes("Invalid login credentials"));

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 ${
        isAccountNotFoundError
          ? "bg-blue-50 border-blue-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <p
            className={`text-sm font-medium ${
              isAccountNotFoundError ? "text-blue-800" : "text-red-600"
            }`}
          >
            {isAccountNotFoundError ? "Account Not Found" : "Login Failed"}
          </p>
          <p
            className={`text-sm mt-1 ${
              isAccountNotFoundError ? "text-blue-700" : "text-red-600"
            }`}
          >
            {isAccountNotFoundError
              ? `No account found with ${email}. Would you like to create one?`
              : "Please check your email and password and try again."}
          </p>
          {isAccountNotFoundError && (
            <div className="mt-3">
              <button
                onClick={onGoToSignUp}
                onKeyDown={(e) => handleKeyDown(e, onGoToSignUp)}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                tabIndex={0}
                aria-label="Create new account"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginErrorDisplay;
