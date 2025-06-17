"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import BackButton from "@/components/common/back-button";
import { useAuth } from "@/contexts/auth-context";
import { generateUsername, generateInitials } from "@/lib/username-generator";
import {
  Shield,
  CircleHelp,
  LogOut,
  Edit3,
  Mail,
  Calendar,
  Trash2,
} from "lucide-react";

const ProfilePage = () => {
  const { logout, user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Generate a consistent fallback username for users without display_name
  const fallbackUsername = useMemo(() => {
    if (user?.id) {
      // Use user ID to seed a consistent username for this user
      const seed = user.id.slice(-8); // Use last 8 chars of user ID
      const seedNum = parseInt(seed, 16) || 12345;

      // Set a temporary seed for consistent generation
      const originalRandom = Math.random;
      Math.random = () => {
        const x = Math.sin(seedNum) * 10000;
        return x - Math.floor(x);
      };

      const username = generateUsername();

      // Restore original Math.random
      Math.random = originalRandom;

      return username;
    }
    return "Friend";
  }, [user?.id]);

  const displayName = profile?.display_name || fallbackUsername;

  // TODO: Replace with actual user data from context/state management
  const [userProfile, setUserProfile] = useState({
    name: displayName,
    email: user?.email || "user@email.com",
    initials: generateInitials(displayName),
    avatar: null, // TODO: Add avatar field to profile
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "March 2024",
  });

  const handleBackClick = () => {
    window.history.back();
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // Navigation will be handled by auth context and root page automatically
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      // Could show error toast here
    }
  };

  const profileMenuItems = [
    {
      icon: Shield,
      label: "Privacy & Security",
      href: "/patient/profile/privacy",
      description: "Manage your privacy settings",
    },
    {
      icon: CircleHelp,
      label: "Help & Support",
      href: "/patient/profile/help",
      description: "Get help and contact support",
    },
    {
      icon: Trash2,
      label: "Delete Account",
      href: "/patient/profile/delete-account",
      description: "Permanently delete your account and data",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton onClick={handleBackClick} size={20} />
            <h1 className="text-lg font-semibold text-text-primary">Profile</h1>
          </div>
          <button
            onClick={isEditing ? handleSaveProfile : handleEditToggle}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Edit3 size={16} />
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              {userProfile.avatar ? (
                <Image
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  width={80}
                  height={80}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-primary">
                  {userProfile.initials}
                </span>
              )}
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                <Edit3 size={12} />
              </button>
            )}
          </div>

          {/* Name */}
          {isEditing ? (
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) =>
                setUserProfile({ ...userProfile, name: e.target.value })
              }
              placeholder="Enter your display name"
              className="text-xl font-semibold text-text-primary bg-transparent border-b border-gray-300 dark:border-gray-600 text-center mb-2 focus:outline-none focus:border-primary"
            />
          ) : (
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              {userProfile.name}
            </h2>
          )}

          {!isEditing && (
            <p className="text-xs text-text-muted mb-4">
              Your privacy-friendly display name • Tap Edit to change
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-text-muted" />
              <div className="flex-1">
                <div className="text-sm text-text-muted">Email</div>
                {isEditing ? (
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                    className="text-text-primary bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary w-full"
                  />
                ) : (
                  <div className="text-text-primary">{userProfile.email}</div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-text-muted" />
              <div className="flex-1">
                <div className="text-sm text-text-muted">Member since</div>
                <div className="text-text-primary">{userProfile.joinDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          {profileMenuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                ${
                  index !== profileMenuItems.length - 1
                    ? "border-b border-gray-100 dark:border-gray-700"
                    : ""
                }
              `}
            >
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-text-secondary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-text-primary">
                  {item.label}
                </div>
                <div className="text-sm text-text-muted">
                  {item.description}
                </div>
              </div>
              <div className="text-text-muted">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-medium transition-colors ${
            isLoggingOut
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer"
          }`}
          whileHover={!isLoggingOut ? { scale: 1.02 } : {}}
          whileTap={!isLoggingOut ? { scale: 0.98 } : {}}
        >
          {isLoggingOut ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Logging Out...
            </>
          ) : (
            <>
              <LogOut className="w-5 h-5" />
              Logout
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ProfilePage;
