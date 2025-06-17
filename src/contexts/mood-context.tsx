"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "@/contexts/auth-context";
import { MoodService } from "@/lib/services/mood-service";
import { MoodEntry, MOOD_OPTIONS } from "@/types/mood";
import { TimelineEntry } from "@/types/journey";

interface MoodStats {
  totalEntries: number;
  averageMood: number;
  currentStreak: number;
  longestStreak: number;
  moodDistribution: Record<string, number>;
}

interface MoodContextType {
  // Current state
  currentMood: MoodEntry | null;
  moodEntries: MoodEntry[];
  timelineEntries: TimelineEntry[];
  isLoading: boolean;
  error: string | null;
  hasLoggedToday: boolean;

  // Actions
  submitMood: (moodId: string, notes?: string) => Promise<void>;
  refreshEntries: () => Promise<void>;
  getMoodStats: () => MoodStats;
  clearError: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentMood, setCurrentMood] = useState<MoodEntry | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  // Convert mood entries to timeline format
  const timelineEntries: TimelineEntry[] = moodEntries.map((entry) => ({
    id: entry.id,
    date: entry.created_at,
    emoji: entry.mood_emoji,
    description: entry.notes || `Feeling ${entry.mood_label.toLowerCase()}`,
    color:
      entry.mood_value <= 2
        ? "red"
        : entry.mood_value <= 3
        ? "orange"
        : ("green" as "orange" | "red" | "green"),
  }));

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch mood entries
  const fetchMoodEntries = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const entries = await MoodService.getUserMoodEntries();

      setMoodEntries(entries);

      // Set current mood (most recent entry)
      if (entries.length > 0) {
        const sortedEntries = [...entries].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setCurrentMood(sortedEntries[0]);
      }

      // Check if user has logged today
      const hasEntry = await MoodService.hasMoodEntryToday();
      setHasLoggedToday(hasEntry);
    } catch (err) {
      console.error("MoodContext - Error fetching mood entries:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load mood entries"
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Submit new mood entry
  const submitMood = useCallback(
    async (moodId: string, notes?: string) => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      try {
        setError(null);

        const moodOption = MOOD_OPTIONS.find((m) => m.id === moodId);
        if (!moodOption) {
          throw new Error("Invalid mood selection");
        }

        const moodData = {
          mood_id: moodId,
          mood_label: moodOption.label,
          mood_emoji: moodOption.emoji,
          mood_value: moodOption.value,
          notes: notes || undefined,
        };

        const newEntry = await MoodService.createMoodEntry(moodData);

        // Update local state
        setMoodEntries((prev) => [newEntry, ...prev]);
        setCurrentMood(newEntry);
        setHasLoggedToday(true);

        // Refresh entries to ensure consistency
        await fetchMoodEntries();
      } catch (err) {
        console.error("MoodContext - Error submitting mood:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to submit mood";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [user, fetchMoodEntries]
  );

  // Refresh entries
  const refreshEntries = useCallback(async () => {
    await fetchMoodEntries();
  }, [fetchMoodEntries]);

  // Calculate mood statistics
  const getMoodStats = useCallback((): MoodStats => {
    if (moodEntries.length === 0) {
      return {
        totalEntries: 0,
        averageMood: 0,
        currentStreak: 0,
        longestStreak: 0,
        moodDistribution: {},
      };
    }

    // Calculate average mood
    const totalMoodValue = moodEntries.reduce(
      (sum, entry) => sum + entry.mood_value,
      0
    );
    const averageMood = Math.round(totalMoodValue / moodEntries.length);

    // Calculate current streak (consecutive days with entries)
    const sortedEntries = [...moodEntries].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].created_at);
      entryDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (entryDate.getTime() === expectedDate.getTime()) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
        break;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate mood distribution
    const moodDistribution = moodEntries.reduce((acc, entry) => {
      const mood = entry.mood_label;
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEntries: moodEntries.length,
      averageMood,
      currentStreak,
      longestStreak,
      moodDistribution,
    };
  }, [moodEntries]);

  // Initialize data when user changes
  useEffect(() => {
    if (user) {
      fetchMoodEntries();
    } else {
      // Reset state when user logs out
      setMoodEntries([]);
      setCurrentMood(null);
      setHasLoggedToday(false);
      setError(null);
      setIsLoading(false);
    }
  }, [user, fetchMoodEntries]);

  return (
    <MoodContext.Provider
      value={{
        currentMood,
        moodEntries,
        timelineEntries,
        isLoading,
        error,
        hasLoggedToday,
        submitMood,
        refreshEntries,
        getMoodStats,
        clearError,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}
