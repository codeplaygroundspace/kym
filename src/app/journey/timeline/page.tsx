import Link from "next/link";
import JourneyTimeline from "@/components/features/journey-timeline";

const TimelinePage = () => {
  // Extended sample data - in a real app, this would come from an API or database
  const allTimelineEntries = [
    {
      id: "1",
      date: "YESTERDAY",
      emoji: "😐",
      description: "Felt tired, some back pain",
      color: "orange" as const,
    },
    {
      id: "2",
      date: "MONDAY",
      emoji: "😔",
      description: "Nausea returned unexpectedly",
      color: "red" as const,
    },
    {
      id: "3",
      date: "SUNDAY",
      emoji: "😊",
      description: "Partner felt baby kick!",
      color: "green" as const,
    },
    {
      id: "4",
      date: "SATURDAY",
      emoji: "😌",
      description: "Good energy, went for a walk",
      color: "green" as const,
    },
    {
      id: "5",
      date: "FRIDAY",
      emoji: "😴",
      description: "Very sleepy day, lots of rest",
      color: "orange" as const,
    },
    {
      id: "6",
      date: "THURSDAY",
      emoji: "🤢",
      description: "Morning sickness was strong",
      color: "red" as const,
    },
    {
      id: "7",
      date: "WEDNESDAY",
      emoji: "😊",
      description: "First ultrasound appointment",
      color: "green" as const,
    },
    {
      id: "8",
      date: "TUESDAY",
      emoji: "😰",
      description: "Anxiety about upcoming appointment",
      color: "orange" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main>
        <div className="container mx-auto px-4 pt-10 pb-8 max-w-md">
          <div className="mb-8">
            <Link
              href="/journey"
              className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors mb-4"
              tabIndex={0}
              aria-label="Go back to journey page"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-text-primary"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-text-primary">My Journey</h1>
          </div>

          <JourneyTimeline
            entries={allTimelineEntries}
            showViewAll={false}
            showTitle={false}
          />
        </div>
      </main>
    </div>
  );
};

export default TimelinePage;
