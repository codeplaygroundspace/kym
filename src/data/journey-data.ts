import { TimelineEntry, Milestone } from "@/types/journey";

/**
 * Journey Timeline Data
 *
 * Timeline entries representing the user's pregnancy journey experiences.
 * Each entry captures a moment in time with emotional context and description.
 */
export const timelineEntries: TimelineEntry[] = [
  {
    id: "1",
    date: "YESTERDAY",
    emoji: "😐",
    description: "Felt tired, some back pain",
    color: "orange",
  },
  {
    id: "2",
    date: "MONDAY",
    emoji: "😔",
    description: "Nausea returned unexpectedly",
    color: "red",
  },
  {
    id: "3",
    date: "SUNDAY",
    emoji: "😊",
    description: "Partner felt baby kick!",
    color: "green",
  },
];

/**
 * Journey Milestones
 *
 * Important milestones and achievements during the pregnancy journey.
 */
export const currentMilestone: Milestone = {
  title: "Viability Milestone",
  description:
    "Your baby has reached 24 weeks - a moment to celebrate your strength.",
  emoji: "🎉",
  weekReached: 24,
};
