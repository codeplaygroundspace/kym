"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/contexts/auth-context";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { MoodService } from "@/lib/services/mood-service";
import { MOOD_OPTIONS } from "@/types/mood";

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { track } = useAnalytics();

  // Debug user authentication
  useEffect(() => {
    console.log("MoodSelector - User state:", {
      user: user ? { id: user.id, email: user.email } : null,
      isAuthenticated: !!user,
    });
  }, [user]);

  // Check if user has already logged mood today
  useEffect(() => {
    const checkTodaysMood = async () => {
      if (!user) {
        console.log("MoodSelector - No user, skipping mood check");
        return;
      }

      try {
        console.log("MoodSelector - Checking if user has logged mood today");
        const hasEntry = await MoodService.hasMoodEntryToday();
        console.log("MoodSelector - Has entry today:", hasEntry);
        setHasLoggedToday(hasEntry);
      } catch (error) {
        console.error("MoodSelector - Error checking today's mood:", error);
      }
    };

    checkTodaysMood();
  }, [user]);

  const handleMoodSelect = async (moodId: string) => {
    console.log("MoodSelector - Mood selected:", moodId);
    console.log(
      "MoodSelector - Current user:",
      user ? { id: user.id, email: user.email } : null
    );

    if (!user) {
      setError("Please log in to track your mood");
      return;
    }

    if (hasLoggedToday) {
      setError("You've already logged your mood today. Come back tomorrow!");
      return;
    }

    const moodOption = MOOD_OPTIONS.find((mood) => mood.id === moodId);
    if (!moodOption) {
      setError("Invalid mood selection");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedMood(moodId);

    try {
      console.log("MoodSelector - Creating mood entry with data:", {
        mood_id: moodOption.id,
        mood_label: moodOption.label,
        mood_emoji: moodOption.emoji,
        mood_value: moodOption.value,
      });

      // Save mood to Supabase
      const moodEntry = await MoodService.createMoodEntry({
        mood_id: moodOption.id,
        mood_label: moodOption.label,
        mood_emoji: moodOption.emoji,
        mood_value: moodOption.value,
      });

      console.log("MoodSelector - Mood entry created successfully:", moodEntry);

      // Track analytics event
      track("journey_entry_created", {
        mood_id: moodOption.id,
        mood_label: moodOption.label,
        mood_value: moodOption.value,
        timestamp: new Date().toISOString(),
      });

      setHasLoggedToday(true);
    } catch (error) {
      console.error("MoodSelector - Error saving mood:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save your mood. Please try again."
      );
      setSelectedMood(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, moodId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMoodSelect(moodId);
    }
  };

  if (hasLoggedToday) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary text-center mb-6">
          Mood logged for today! ✨
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-card-lg p-4 text-center">
          <p className="text-sm text-green-700 dark:text-green-300">
            Thank you for sharing how you&apos;re feeling today. Check your
            Journey page to see your progress!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Title */}
      <h2 className="text-xl font-semibold text-text-primary text-center mb-6">
        How are you feeling today?
      </h2>

      {/* Error Display */}
      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-card-sm p-3">
          <p className="text-sm text-red-700 dark:text-red-300 text-center">
            {error}
          </p>
        </div>
      )}

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-card-sm p-3">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Debug: User {user ? "authenticated" : "not authenticated"}
            {user && ` (${user.email})`}
          </p>
        </div>
      )}

      {/* Mood Options */}
      <div className="flex justify-center gap-3 px-4">
        {MOOD_OPTIONS.map((mood) => (
          <motion.button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            onKeyDown={(e) => handleKeyDown(e, mood.id)}
            disabled={isLoading}
            className={`
              flex flex-col items-center justify-center
              w-16 h-20 sm:w-20 sm:h-24
              rounded-2xl
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                selectedMood === mood.id
                  ? "bg-primary/10 border-2 border-primary shadow-lg"
                  : "bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            `}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            aria-label={`Select ${mood.label} mood`}
            aria-pressed={selectedMood === mood.id}
            tabIndex={0}
          >
            {/* Emoji */}
            <span
              className="text-2xl sm:text-3xl mb-1"
              role="img"
              aria-label={mood.label}
            >
              {mood.emoji}
            </span>

            {/* Label */}
            <span
              className={`
                text-xs font-medium text-center leading-tight
                ${selectedMood === mood.id ? "text-primary" : "text-text-muted"}
              `}
            >
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-text-secondary">Saving your mood...</p>
        </motion.div>
      )}

      {/* Selected Mood Feedback */}
      {selectedMood && !isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-text-secondary">
            Thanks for sharing how you&apos;re feeling today! 💚
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MoodSelector;
