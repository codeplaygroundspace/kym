import { supabase } from "@/lib/supabase";
import {
  MoodEntry,
  CreateMoodEntryData,
  UpdateMoodEntryData,
} from "@/types/mood";

export class MoodService {
  /**
   * Create a new mood entry for the current user
   */
  static async createMoodEntry(data: CreateMoodEntryData): Promise<MoodEntry> {
    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Authentication error:", authError);
      throw new Error(`Authentication failed: ${authError.message}`);
    }

    if (!user) {
      throw new Error("User not authenticated. Please log in and try again.");
    }

    // Add user_id to the data
    const entryData = {
      ...data,
      user_id: user.id,
    };

    console.log("Creating mood entry with data:", entryData);

    const { data: moodEntry, error } = await supabase
      .from("mood_entries")
      .insert([entryData])
      .select()
      .single();

    if (error) {
      console.error("Error creating mood entry:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      throw new Error(`Failed to create mood entry: ${error.message}`);
    }

    return moodEntry;
  }

  /**
   * Get all mood entries for the current user, ordered by creation date (newest first)
   */
  static async getUserMoodEntries(limit?: number): Promise<MoodEntry[]> {
    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return [];
    }

    let query = supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data: moodEntries, error } = await query;

    if (error) {
      console.error("Error fetching mood entries:", error);
      throw new Error(`Failed to fetch mood entries: ${error.message}`);
    }

    return moodEntries || [];
  }

  /**
   * Get mood entries for a specific date range
   */
  static async getMoodEntriesInRange(
    startDate: string,
    endDate: string
  ): Promise<MoodEntry[]> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return [];
    }

    const { data: moodEntries, error } = await supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", startDate)
      .lte("created_at", endDate)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching mood entries in range:", error);
      throw new Error(`Failed to fetch mood entries: ${error.message}`);
    }

    return moodEntries || [];
  }

  /**
   * Get the most recent mood entry for the current user
   */
  static async getLatestMoodEntry(): Promise<MoodEntry | null> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return null;
    }

    const { data: moodEntry, error } = await supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return null;
      }
      console.error("Error fetching latest mood entry:", error);
      throw new Error(`Failed to fetch latest mood entry: ${error.message}`);
    }

    return moodEntry;
  }

  /**
   * Update a mood entry
   */
  static async updateMoodEntry(
    id: string,
    data: UpdateMoodEntryData
  ): Promise<MoodEntry> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: moodEntry, error } = await supabase
      .from("mood_entries")
      .update(data)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating mood entry:", error);
      throw new Error(`Failed to update mood entry: ${error.message}`);
    }

    return moodEntry;
  }

  /**
   * Delete a mood entry
   */
  static async deleteMoodEntry(id: string): Promise<void> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("mood_entries")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting mood entry:", error);
      throw new Error(`Failed to delete mood entry: ${error.message}`);
    }
  }

  /**
   * Get mood statistics for the current user
   */
  static async getMoodStats(days: number = 30): Promise<{
    averageMood: number;
    totalEntries: number;
    moodDistribution: Record<string, number>;
  }> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const moodEntries = await this.getMoodEntriesInRange(
      startDate.toISOString(),
      new Date().toISOString()
    );

    const totalEntries = moodEntries.length;
    const averageMood =
      totalEntries > 0
        ? moodEntries.reduce((sum, entry) => sum + entry.mood_value, 0) /
          totalEntries
        : 0;

    const moodDistribution = moodEntries.reduce((acc, entry) => {
      acc[entry.mood_label] = (acc[entry.mood_label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      averageMood: Math.round(averageMood * 100) / 100,
      totalEntries,
      moodDistribution,
    };
  }

  /**
   * Check if user has already logged mood today
   */
  static async hasMoodEntryToday(): Promise<boolean> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return false;
    }

    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const { data: moodEntries, error } = await supabase
      .from("mood_entries")
      .select("id")
      .eq("user_id", user.id)
      .gte("created_at", startOfDay.toISOString())
      .lt("created_at", endOfDay.toISOString())
      .limit(1);

    if (error) {
      console.error("Error checking today's mood entry:", error);
      return false;
    }

    return (moodEntries?.length || 0) > 0;
  }
}
