import Navbar from "@/components/common/nav-bar";
import JourneyStats from "@/components/features/journey-stats";
import MilestoneCard from "@/components/features/milestone-card";
import JourneyTimeline from "@/components/features/journey-timeline";

const JourneyPage = () => {
  // Sample data - in a real app, this would come from an API or database
  const timelineEntries = [
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
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="pb-20">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-8 text-text-primary">
            Journey
          </h1>

          <JourneyStats
            weeksStrong={25}
            daysGrowing={175}
            completionPercentage={62}
          />

          <JourneyTimeline entries={timelineEntries} />

          <MilestoneCard
            title="Viability Milestone"
            description="Your baby has reached 24 weeks - a moment to celebrate your strength."
            emoji="🎉"
          />
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default JourneyPage;
