"use client";

import React, { useState } from "react";
import { LuClock as Clock, LuUsers as Users } from "react-icons/lu";
import { communityData } from "@/data/community-data";
import Navbar from "@/components/common/nav-bar";
import CommunityPostCard from "@/components/features/community-post-card";
import CategoryFilters from "@/components/features/category-filters";
import NewPostSection from "@/components/features/new-post-section";

const TogetherPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [postLikes, setPostLikes] = useState<Record<number, number>>({});

  const { categories, posts, supportGroups } = communityData;

  const handleLikePost = (postId: number, currentLikes: number) => {
    const isLiked = likedPosts.has(postId);
    const newLikedPosts = new Set(likedPosts);

    if (isLiked) {
      newLikedPosts.delete(postId);
      setPostLikes((prev) => ({ ...prev, [postId]: currentLikes - 1 }));
    } else {
      newLikedPosts.add(postId);
      setPostLikes((prev) => ({ ...prev, [postId]: currentLikes + 1 }));
    }

    setLikedPosts(newLikedPosts);
  };

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-background border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-md">
          {/* Category Pills */}
          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10 pb-20 max-w-md">
        {/* Support Groups Section */}
        {selectedCategory === "Support Groups" && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Local Support Groups
            </h2>
            <div className="grid gap-4">
              {supportGroups.map((group, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-text-primary">
                      {group.name}
                    </h3>
                    <button
                      className="text-primary text-sm font-medium hover:opacity-80 transition-opacity"
                      tabIndex={0}
                      aria-label={`Join ${group.name}`}
                    >
                      Join
                    </button>
                  </div>
                  <p className="text-text-secondary text-sm mb-3">
                    {group.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {group.members} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {group.nextMeeting}
                    </span>
                    <span className="flex items-center gap-1">
                      📍 {group.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Post Section */}
        <NewPostSection />

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              isLiked={likedPosts.has(post.id)}
              currentLikes={postLikes[post.id] ?? post.likes}
              onLike={handleLikePost}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button
            className="border border-gray-300 dark:border-gray-600 text-text-secondary bg-background px-8 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            tabIndex={0}
            aria-label="Load more posts"
          >
            Continue Reading
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default TogetherPage;
