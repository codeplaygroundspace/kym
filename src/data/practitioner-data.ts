export interface PatientEntry {
  date: string;
  emoji: string;
  note: string;
  color: "red" | "orange" | "yellow" | "green" | "gray";
}

export interface Patient {
  id: number;
  name: string;
  initials: string;
  lastEntry: string;
  weeksOfStrength: number;
  status: "Pregnant" | "Postpartum";
  mood: number; // 1-5 scale
  moodEmoji: string;
  energy: number; // 1-5 scale
  trend: "up" | "down" | "stable";
  flagged: boolean;
  lastNote: string;
  hasMessages: boolean;
  daysSinceLastEntry: number;
  recentEntries: PatientEntry[];
}

export const mockPatients: Patient[] = [
  {
    id: 1,
    name: "Fernanda M.",
    initials: "FM",
    lastEntry: "2h ago",
    weeksOfStrength: 25,
    status: "Pregnant",
    mood: 2,
    moodEmoji: "😟",
    energy: 2,
    trend: "down",
    flagged: true,
    lastNote: "Nausea returned unexpectedly",
    hasMessages: false,
    daysSinceLastEntry: 0,
    recentEntries: [
      {
        date: "Today",
        emoji: "😟",
        note: "Nausea returned unexpectedly",
        color: "red",
      },
      {
        date: "Yesterday",
        emoji: "😐",
        note: "Felt tired, some back pain",
        color: "orange",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah K.",
    initials: "SK",
    lastEntry: "1d ago",
    weeksOfStrength: 32,
    status: "Pregnant",
    mood: 4,
    moodEmoji: "😊",
    energy: 4,
    trend: "up",
    flagged: false,
    lastNote: "Partner felt baby kick!",
    hasMessages: true,
    daysSinceLastEntry: 1,
    recentEntries: [
      {
        date: "Yesterday",
        emoji: "😊",
        note: "Partner felt baby kick!",
        color: "green",
      },
      { date: "Sunday", emoji: "😊", note: "Good energy day", color: "green" },
    ],
  },
  {
    id: 3,
    name: "Emma L.",
    initials: "EL",
    lastEntry: "3h ago",
    weeksOfStrength: 18,
    status: "Postpartum",
    mood: 3,
    moodEmoji: "😐",
    energy: 3,
    trend: "stable",
    flagged: false,
    lastNote: "Managing okay, still adjusting",
    hasMessages: false,
    daysSinceLastEntry: 0,
    recentEntries: [
      {
        date: "Today",
        emoji: "😐",
        note: "Managing okay, still adjusting",
        color: "yellow",
      },
      {
        date: "Yesterday",
        emoji: "😐",
        note: "Sleep was better",
        color: "yellow",
      },
    ],
  },
  {
    id: 4,
    name: "Maria S.",
    initials: "MS",
    lastEntry: "5d ago",
    weeksOfStrength: 12,
    status: "Postpartum",
    mood: 1,
    moodEmoji: "😞",
    energy: 1,
    trend: "down",
    flagged: true,
    lastNote: "Struggling with sleep and mood",
    hasMessages: false,
    daysSinceLastEntry: 5,
    recentEntries: [
      {
        date: "5 days ago",
        emoji: "😞",
        note: "Struggling with sleep and mood",
        color: "red",
      },
    ],
  },
  {
    id: 5,
    name: "Rachel P.",
    initials: "RP",
    lastEntry: "12h ago",
    weeksOfStrength: 28,
    status: "Pregnant",
    mood: 4,
    moodEmoji: "😊",
    energy: 5,
    trend: "up",
    flagged: false,
    lastNote: "Feeling energetic today",
    hasMessages: false,
    daysSinceLastEntry: 0,
    recentEntries: [
      {
        date: "Today",
        emoji: "😊",
        note: "Feeling energetic today",
        color: "green",
      },
      {
        date: "Yesterday",
        emoji: "😊",
        note: "Good day overall",
        color: "green",
      },
    ],
  },
];

export const getStatusColor = (
  status: Patient["status"],
  weeksOfStrength: number
): string => {
  if (status === "Pregnant") {
    if (weeksOfStrength < 20)
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
    if (weeksOfStrength < 30)
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
    return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300";
  }
  return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300";
};

export const getEntryColor = (color: PatientEntry["color"]): string => {
  switch (color) {
    case "red":
      return "border-l-red-500";
    case "orange":
      return "border-l-orange-500";
    case "yellow":
      return "border-l-yellow-500";
    case "green":
      return "border-l-green-500";
    default:
      return "border-l-gray-300";
  }
};

export type FilterType = "all" | "flagged" | "recent" | "inactive";

export const filterPatients = (
  patients: Patient[],
  searchTerm: string,
  selectedFilter: FilterType
): Patient[] => {
  return patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "flagged" && patient.flagged) ||
      (selectedFilter === "recent" && patient.daysSinceLastEntry === 0) ||
      (selectedFilter === "inactive" && patient.daysSinceLastEntry > 2);
    return matchesSearch && matchesFilter;
  });
};

export const getPatientStats = (patients: Patient[]) => {
  return {
    total: patients.length,
    flagged: patients.filter((p) => p.flagged).length,
    active: patients.filter((p) => p.daysSinceLastEntry === 0).length,
    inactive: patients.filter((p) => p.daysSinceLastEntry > 2).length,
  };
};
