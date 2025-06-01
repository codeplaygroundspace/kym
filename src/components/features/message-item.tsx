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
      className="bg-bg-primary rounded-2xl border border-none overflow-hidden cursor-pointer hover:shadow-sm transition-all duration-200"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Message from ${message.title}: ${message.description}`}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-full ${message.avatarColor} flex items-center justify-center text-lg`}
          >
            {message.icon}
          </div>
          {message.hasNotification && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-text-primary font-medium text-base leading-tight">
                {message.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mt-1 line-clamp-2">
                {message.description}
              </p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <span className="text-text-muted text-xs">
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
