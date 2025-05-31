import Link from "next/link";
import Navbar from "@/components/common/nav-bar";
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
      <main className="pb-20">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="flex items-center mb-8">
            <Link
              href="/journey"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-4 transition-colors"
              tabIndex={0}
              aria-label="Go back to journey page"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Full Timeline
            </h1>
          </div>

          <JourneyTimeline entries={allTimelineEntries} showViewAll={false} />
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default TimelinePage;
