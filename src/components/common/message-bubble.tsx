"use client";

import React from "react";
import { MessageBubbleProps } from "@/types/message-bubble";

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  alignment = "left",
  variant = "default",
  className = "",
}) => {
  const getAlignmentClasses = () => {
    return alignment === "left" ? "justify-start" : "justify-end";
  };

  const getBubbleClasses = () => {
    const baseClasses = "px-4 py-3 rounded-2xl";

    let variantClasses = "";
    let roundingClasses = "";

    // Variant styles
    switch (variant) {
      case "primary":
        variantClasses = "bg-primary text-white";
        break;
      case "secondary":
        variantClasses = "bg-gray-200 dark:bg-gray-700 text-text-primary";
        break;
      default:
        variantClasses = "bg-gray-100 dark:bg-gray-800 text-text-primary";
    }

    // Rounding based on alignment (chat bubble style)
    if (alignment === "left") {
      roundingClasses = "rounded-tl-md";
    } else {
      roundingClasses = "rounded-tr-md";
    }

    return `${baseClasses} ${variantClasses} ${roundingClasses}`;
  };

  return (
    <div className={`flex ${getAlignmentClasses()} ${className}`}>
      <div className={getBubbleClasses()}>
        <p className="text-base leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
