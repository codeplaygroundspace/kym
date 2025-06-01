"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/components/icons";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  className = "",
  size = 24,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`flex items-center justify-center w-10 h-10 bg-bg-primary rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${className}`}
      tabIndex={0}
      aria-label="Go back"
    >
      <BackIcon size={size} className="text-text-primary" />
    </button>
  );
};

export default BackButton;
