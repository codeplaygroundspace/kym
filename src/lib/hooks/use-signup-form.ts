import { useState } from "react";

type UserRole = "patient" | "practitioner";

export const useSignupForm = () => {
  const [selectedUserRole, setSelectedUserRole] = useState<UserRole>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form is valid
  const isFormValid =
    email.trim() !== "" && isValidEmail(email) && password.trim() !== "";

  const handleUserRoleChange = (role: UserRole) => {
    setSelectedUserRole(role);
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

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  return {
    // State
    selectedUserRole,
    email,
    password,
    showPassword,
    isFormValid,
    // Handlers
    handleUserRoleChange,
    handleEmailChange,
    handlePasswordChange,
    handleTogglePassword,
    resetForm,
    // Validation
    isValidEmail,
  };
};
