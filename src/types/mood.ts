export interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  value: number;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_id: string;
  mood_label: string;
  mood_emoji: string;
  mood_value: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMoodEntryData {
  mood_id: string;
  mood_label: string;
  mood_emoji: string;
  mood_value: number;
  notes?: string;
  user_id?: string;
}

export interface UpdateMoodEntryData {
  mood_id?: string;
  mood_label?: string;
  mood_emoji?: string;
  mood_value?: number;
  notes?: string;
}

// Mood options available in the app
export const MOOD_OPTIONS: MoodOption[] = [
  { id: "struggling", emoji: "😰", label: "Struggling", value: 1 },
  { id: "low", emoji: "😔", label: "Low", value: 2 },
  { id: "okay", emoji: "😐", label: "Okay", value: 3 },
  { id: "good", emoji: "😊", label: "Good", value: 4 },
  { id: "great", emoji: "😄", label: "Great", value: 5 },
];

// Helper function to get mood option by ID
export const getMoodOptionById = (id: string): MoodOption | undefined => {
  return MOOD_OPTIONS.find((option) => option.id === id);
};

// Helper function to get mood option by value
export const getMoodOptionByValue = (value: number): MoodOption | undefined => {
  return MOOD_OPTIONS.find((option) => option.value === value);
};
