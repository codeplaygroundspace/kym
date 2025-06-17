"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/contexts/auth-context";
import { useMood } from "@/contexts/mood-context";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { MOOD_OPTIONS } from "@/types/mood";

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { user } = useAuth();
  const { isLoading, error, hasLoggedToday, submitMood, clearError } =
    useMood();
  const { track } = useAnalytics();

  const handleMoodSelect = async (moodId: string) => {
    if (!user) {
      return;
    }

    if (isLoading) return;

    try {
      setSelectedMood(moodId);
      clearError();

      // Track analytics
      track("journey_entry_created", {
        mood_id: moodId,
        mood_label: MOOD_OPTIONS.find((m) => m.id === moodId)?.label,
        timestamp: new Date().toISOString(),
      });

      // Submit mood using context
      await submitMood(moodId);
    } catch (error) {
      console.error("MoodSelector - Error submitting mood:", error);
      setSelectedMood(null);
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
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-2xl p-4 text-center">
          <p className="text-sm text-green-700 dark:text-green-200">
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
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
          <p className="text-sm text-red-700 dark:text-red-200 text-center">
            {error}
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
                  : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600"
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
