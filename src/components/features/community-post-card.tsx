"use client";

import React from "react";
import {
  LuHeart as Heart,
  LuMessageCircle as MessageCircle,
} from "react-icons/lu";

interface CommunityPost {
  id: number;
  user: string;
  avatar: string;
  time: string;
  category: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  isSupported?: boolean;
  isProfessional?: boolean;
  isCrisis?: boolean;
  location?: string;
}

interface CommunityPostCardProps {
  post: CommunityPost;
  isLiked: boolean;
  currentLikes: number;
  onLike: (postId: number, currentLikes: number) => void;
}

const CommunityPostCard: React.FC<CommunityPostCardProps> = ({
  post,
  isLiked,
  currentLikes,
  onLike,
}) => {
  return (
    <div className="bg-background rounded-2xl border border-none overflow-hidden">
      {/* Crisis Support Banner */}
      {post.isCrisis && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-3">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
            <Heart className="w-4 h-4" />
            <span className="font-medium">
              Crisis support available - You&apos;re not alone
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-lg">
              {post.avatar}
            </div>
            <div>
              <span className="font-semibold text-text-primary">
                {post.user}
              </span>
            </div>
          </div>
          <div className="text-sm text-text-muted">{post.time}</div>
        </div>

        {/* Post Content */}
        <p className="text-text-primary mb-3 leading-relaxed">{post.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-800 text-text-secondary text-xs px-2 py-1 rounded-xl"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Engagement */}
        <div className="flex items-center gap-6 pt-3">
          <button
            onClick={() => onLike(post.id, currentLikes)}
            className={`flex items-center gap-2 transition-all duration-200 transform hover:scale-105 ${
              isLiked
                ? "text-primary"
                : "text-text-secondary hover:text-primary"
            }`}
            tabIndex={0}
            aria-label={`Like post - ${currentLikes} likes`}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isLiked ? "fill-current scale-110" : ""
              }`}
            />
            <span className="text-sm">{currentLikes}</span>
          </button>
          <button
            className="flex items-center gap-2 text-text-secondary hover:text-blue-500 transition-colors"
            tabIndex={0}
            aria-label={`Comment on post - ${post.comments} comments`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>
      </div>

      {/* Crisis Support Actions */}
      {post.isCrisis && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 border-t border-red-200 dark:border-red-800">
          <div className="flex flex-wrap gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
              tabIndex={0}
              aria-label="Connect with counselor"
            >
              Connect with Counselor
            </button>
            <button
              className="bg-background border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-3 py-1 rounded-xl text-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              tabIndex={0}
              aria-label="Call crisis hotline"
            >
              Crisis Hotline
            </button>
            <button
              className="bg-background border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-3 py-1 rounded-xl text-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              tabIndex={0}
              aria-label="Find local support"
            >
              Local Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPostCard;
