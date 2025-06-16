import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { MoodService } from "@/lib/services/mood-service";
import { MoodEntry } from "@/types/mood";
import { TimelineEntry } from "@/types/journey";

interface UseMoodEntriesOptions {
  limit?: number;
}

interface UseMoodEntriesReturn {
  moodEntries: MoodEntry[];
  timelineEntries: TimelineEntry[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getMoodStats: () => {
    totalEntries: number;
    averageMood: number;
    currentStreak: number;
    longestStreak: number;
    moodDistribution: Record<string, number>;
  };
}

/**
 * Custom hook for managing mood entries data
 * Handles fetching, state management, and conversion to timeline format
 */
export const useMoodEntries = (
  options: UseMoodEntriesOptions = {}
): UseMoodEntriesReturn => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { limit } = options;

  const fetchMoodEntries = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log("useMoodEntries - Fetching mood entries...");
      const entries = await MoodService.getUserMoodEntries(limit);
      console.log("useMoodEntries - Fetched entries:", entries);

      setMoodEntries(entries);
    } catch (err) {
      console.error("useMoodEntries - Error fetching mood entries:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load mood entries"
      );
    } finally {
      setIsLoading(false);
    }
  }, [user, limit]);

  const refreshMoodEntries = useCallback(async () => {
    await fetchMoodEntries();
  }, [fetchMoodEntries]);

  useEffect(() => {
    fetchMoodEntries();
  }, [fetchMoodEntries]);

  // Convert mood entries to timeline entries format
  const timelineEntries: TimelineEntry[] = moodEntries.map((entry) => {
    const entryDate = new Date(entry.created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel: string;
    if (entryDate.toDateString() === today.toDateString()) {
      dateLabel = "TODAY";
    } else if (entryDate.toDateString() === yesterday.toDateString()) {
      dateLabel = "YESTERDAY";
    } else {
      // For older entries, show appropriate date format
      const daysDiff = Math.floor(
        (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff <= 7) {
        dateLabel = entryDate
          .toLocaleDateString("en-US", {
            weekday: "long",
          })
          .toUpperCase();
      } else {
        dateLabel = entryDate
          .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          .toUpperCase();
      }
    }

    // Determine color based on mood value
    let color: "green" | "orange" | "red";
    if (entry.mood_value >= 4) {
      color = "green";
    } else if (entry.mood_value >= 3) {
      color = "orange";
    } else {
      color = "red";
    }

    return {
      id: entry.id,
      date: dateLabel,
      emoji: entry.mood_emoji,
      description: `Feeling ${entry.mood_label.toLowerCase()}`,
      color,
    };
  });

  // Calculate mood statistics
  const getMoodStats = useCallback(() => {
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

  return {
    moodEntries,
    timelineEntries,
    isLoading,
    error,
    refetch: refreshMoodEntries,
    getMoodStats,
  };
};
