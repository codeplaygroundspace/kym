"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg";
  showNotification?: boolean;
  className?: string;
}

const UserAvatar = ({
  size = "md",
  showNotification = false,
  className = "",
}: UserAvatarProps) => {
  // TODO: Replace with actual user data from context/props
  const user = {
    name: "Fernanda M.",
    initials: "FM",
    avatar: null, // URL to avatar image if available
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-sm";
      case "lg":
        return "w-12 h-12 text-base";
      default:
        return "w-10 h-10 text-sm";
    }
  };

  return (
    <Link href="/patient/profile" className={`relative ${className}`}>
      <motion.div
        className={`
          ${getSizeClasses()}
          bg-primary/10 
          rounded-full 
          flex items-center justify-center 
          transition-all duration-200
          hover:bg-primary/20
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          cursor-pointer
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        tabIndex={0}
        role="button"
        aria-label={`View profile for ${user.name}`}
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={size === "sm" ? 32 : size === "lg" ? 48 : 40}
            height={size === "sm" ? 32 : size === "lg" ? 48 : 40}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="font-semibold text-primary">{user.initials}</span>
        )}
      </motion.div>

      {/* Notification dot */}
      {showNotification && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
      )}
    </Link>
  );
};

export default UserAvatar;
