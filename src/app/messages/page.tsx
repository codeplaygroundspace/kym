"use client";

import React from "react";
import Navbar from "@/components/common/nav-bar";
import MessageItem from "@/components/features/message-item";
import { supportMessages } from "@/data/messages";

const MessagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <main className="pb-20">
        <div className="container mx-auto px-4 pt-10 max-w-md">
          <h1 className="text-2xl font-bold text-text-primary mb-6">
            Messages
          </h1>

          {/* Messages List */}
          <div className="space-y-4">
            {supportMessages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default MessagesPage;
