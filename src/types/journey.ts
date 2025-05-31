export interface TimelineEntry {
  id: string;
  date: string;
  emoji: string;
  description: string;
  color: "orange" | "red" | "green";
}

export interface JourneyStats {
  weeksStrong: number;
  daysGrowing: number;
  completionPercentage: number;
}

export interface Milestone {
  title: string;
  description: string;
  emoji: string;
  weekReached?: number;
}
