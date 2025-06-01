import { MessageItem } from "@/types/messages";

/**
 * Support Messages for Pregnant Women's Mental Health
 *
 * These messages are triggered when a pregnant woman indicates she's experiencing
 * depression, anxiety, or other mental health challenges. The app sends supportive,
 * actionable messages to help her cope and connect with appropriate resources.
 *
 * Message Categories:
 * - supportMessages: General mental health support (default display)
 * - anxietyMessages: Triggered when user reports anxiety symptoms
 * - depressionMessages: Triggered when user reports depression symptoms
 * - crisisMessages: Triggered for urgent mental health concerns
 */

export const supportMessages: MessageItem[] = [
  {
    id: "1",
    title: "Mental Health Support",
    description:
      "I noticed you're feeling down. You're not alone - let's explore some gentle coping strategies together.",
    timestamp: "2 min ago",
    avatarColor: "bg-purple-200",
    icon: "🧠",
    hasNotification: true,
  },
  {
    id: "2",
    title: "Breathing Exercise",
    description:
      "When anxiety feels overwhelming, try this 5-minute guided breathing exercise designed for pregnancy.",
    timestamp: "15 min ago",
    avatarColor: "bg-blue-200",
    icon: "🫁",
    hasNotification: false,
  },
  {
    id: "3",
    title: "Professional Support",
    description:
      "Speaking with a counselor can really help. I've found some pregnancy-specialized therapists near you.",
    timestamp: "1 hour ago",
    avatarColor: "bg-green-200",
    icon: "👩‍⚕️",
    hasNotification: false,
  },
  {
    id: "4",
    title: "Community Connection",
    description:
      "Other moms in your area are sharing similar experiences. Would you like to connect with them?",
    timestamp: "2 hours ago",
    avatarColor: "bg-pink-200",
    icon: "🤝",
    hasNotification: false,
  },
  {
    id: "5",
    title: "Self-Care Reminder",
    description:
      "Your feelings are valid. Taking care of your mental health is taking care of your baby too. 💜",
    timestamp: "Yesterday",
    avatarColor: "bg-indigo-200",
    icon: "💜",
    hasNotification: false,
  },
];

// Additional support message categories for different triggers
export const anxietyMessages: MessageItem[] = [
  {
    id: "anxiety-1",
    title: "Anxiety Relief",
    description:
      "Pregnancy anxiety is common and treatable. Let's try some grounding techniques that can help right now.",
    timestamp: "Just now",
    avatarColor: "bg-blue-200",
    icon: "🌊",
    hasNotification: true,
  },
  {
    id: "anxiety-2",
    title: "Mindfulness Exercise",
    description:
      "A 3-minute mindfulness practice designed specifically for expecting mothers experiencing worry.",
    timestamp: "5 min ago",
    avatarColor: "bg-teal-200",
    icon: "🧘‍♀️",
    hasNotification: false,
  },
];

export const depressionMessages: MessageItem[] = [
  {
    id: "depression-1",
    title: "You're Not Alone",
    description:
      "Prenatal depression affects 1 in 7 women. You're brave for recognizing these feelings. Help is available.",
    timestamp: "Just now",
    avatarColor: "bg-purple-200",
    icon: "🤗",
    hasNotification: true,
  },
  {
    id: "depression-2",
    title: "Gentle Movement",
    description:
      "Even 5 minutes of gentle stretching can help lift your mood. Here's a pregnancy-safe routine.",
    timestamp: "10 min ago",
    avatarColor: "bg-green-200",
    icon: "🌱",
    hasNotification: false,
  },
];

export const crisisMessages: MessageItem[] = [
  {
    id: "crisis-1",
    title: "Immediate Support",
    description:
      "I'm concerned about you. Please reach out to someone right now. You and your baby deserve care and support.",
    timestamp: "Now",
    avatarColor: "bg-red-200",
    icon: "🆘",
    hasNotification: true,
  },
  {
    id: "crisis-2",
    title: "Crisis Resources",
    description:
      "24/7 pregnancy crisis support line: Call now for immediate help from trained counselors.",
    timestamp: "Now",
    avatarColor: "bg-red-200",
    icon: "📞",
    hasNotification: true,
  },
];
