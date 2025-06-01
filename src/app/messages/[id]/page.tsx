"use client";

import React from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/common/back-button";
import MessageBubble from "@/components/common/message-bubble";
import {
  supportMessages,
  anxietyMessages,
  depressionMessages,
  crisisMessages,
} from "@/data/messages";
import { MessageItem } from "@/types/messages";

const MessageDetailPage: React.FC = () => {
  const params = useParams();
  const messageId = params.id as string;

  // Combine all message arrays to find the message
  const allMessages: MessageItem[] = [
    ...supportMessages,
    ...anxietyMessages,
    ...depressionMessages,
    ...crisisMessages,
  ];

  const message = allMessages.find((msg) => msg.id === messageId);

  if (!message) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 pt-10 max-w-md">
          <div className="flex items-center mb-6">
            <BackButton />
          </div>
          <div className="text-center py-20">
            <h1 className="text-xl font-semibold text-text-primary mb-2">
              Message Not Found
            </h1>
            <p className="text-text-secondary">
              The message you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 pt-4 pb-4 max-w-md">
        {/* Header with Back Button, Avatar and Title */}
        <div className="flex items-center gap-3 mb-4">
          <BackButton />
          <div className="relative flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-full ${message.avatarColor} flex items-center justify-center text-sm`}
            >
              {message.icon}
            </div>
            {message.hasNotification && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-text-primary leading-tight truncate ">
              {message.title}
            </h1>
          </div>
        </div>

        {/* Message Content */}
        <div className="bg-bg-primary rounded-2xl border border-none overflow-hidden">
          <div className="p-0">
            {/* Message Bubble */}
            <div className="mt-2">
              <MessageBubble
                message={message.description}
                alignment="left"
                variant="default"
              />
            </div>
          </div>
        </div>

        {/* Bottom OK Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors">
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailPage;
