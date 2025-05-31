"use client";

import React from "react";
import { LuPlus as Plus } from "react-icons/lu";

interface NewPostSectionProps {
  onCreatePost?: () => void;
}

const NewPostSection: React.FC<NewPostSectionProps> = ({ onCreatePost }) => {
  return (
    <div className="mb-6">
      <button
        onClick={onCreatePost}
        className="w-full bg-background rounded-2xl p-4 border border-gray-200 dark:border-gray-700 text-left text-text-muted hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        tabIndex={0}
        aria-label="Create new post"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <Plus className="w-5 h-5 text-purple-500" />
          </div>
          <span>Share your experience or ask for support...</span>
        </div>
      </button>
    </div>
  );
};

export default NewPostSection;
