"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MessageItemProps } from "@/types/messages";

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/messages/${message.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="bg-bg-primary rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 active:scale-[0.98]"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Message from ${message.title}: ${message.description}`}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full ${message.avatarColor} flex items-center justify-center text-base`}
          >
            {message.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={`font-semibold text-sm leading-tight truncate ${
                    message.hasNotification
                      ? "text-text-primary"
                      : "text-text-primary"
                  }`}
                >
                  {message.title}
                </h3>
                {message.hasNotification && (
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                )}
              </div>
              <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
                {message.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="text-text-muted text-xs font-medium">
                {message.timestamp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
