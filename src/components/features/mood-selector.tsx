"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  value: number;
}

const moodOptions: MoodOption[] = [
  { id: "struggling", emoji: "😰", label: "Struggling", value: 1 },
  { id: "low", emoji: "😔", label: "Low", value: 2 },
  { id: "okay", emoji: "😐", label: "Okay", value: 3 },
  { id: "good", emoji: "😊", label: "Good", value: 4 },
  { id: "great", emoji: "😄", label: "Great", value: 5 },
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string, moodValue: number) => {
    setSelectedMood(moodId);
    // TODO: Implement mood tracking functionality
    console.log(`Selected mood: ${moodId} (value: ${moodValue})`);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    moodId: string,
    moodValue: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMoodSelect(moodId, moodValue);
    }
  };

  return (
    <div className="mb-8">
      {/* Title */}
      <h2 className="text-xl font-semibold text-text-primary text-center mb-6">
        How are you feeling today?
      </h2>

      {/* Mood Options */}
      <div className="flex justify-center gap-3 px-4">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id, mood.value)}
            onKeyDown={(e) => handleKeyDown(e, mood.id, mood.value)}
            className={`
              flex flex-col items-center justify-center
              w-16 h-20 sm:w-20 sm:h-24
              rounded-2xl
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${
                selectedMood === mood.id
                  ? "bg-primary/10 border-2 border-primary shadow-lg"
                  : "bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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

      {/* Selected Mood Feedback */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-text-secondary">
            Thanks for sharing how you&apos;re feeling today
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MoodSelector;
