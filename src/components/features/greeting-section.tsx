"use client";

import { useAuth } from "@/contexts/auth-context";
import { generateUsername } from "@/lib/username-generator";
import { useMemo } from "react";
import TimeBasedGreeting from "@/components/common/time-based-greeting";

const GreetingSection = () => {
  const { user, profile } = useAuth();

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

  return (
    <h1 className="text-xl font-bold text-text-primary mb-6">
      <TimeBasedGreeting />, {displayName}
    </h1>
  );
};

export default GreetingSection;
