import JourneyTimeline from "@/components/features/journey-timeline";
import { TimelineEntry } from "@/types/journey";

interface JourneyContentProps {
  timelineEntries: TimelineEntry[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const JourneyContent = ({
  timelineEntries,
  isLoading,
  error,
  isAuthenticated,
}: JourneyContentProps) => {
  if (!isAuthenticated) {
    return (
      <div className="bg-bg-primary rounded-card-lg p-8 text-center">
        <p className="text-text-secondary">
          Please log in to view your journey
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-bg-primary rounded-card-lg p-8 text-center">
        <p className="text-text-secondary">Loading your journey...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-card-lg p-6 text-center">
        <p className="text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (timelineEntries.length === 0) {
    return (
      <div className="bg-bg-primary rounded-card-lg p-8 text-center">
        <p className="text-text-secondary mb-4">Your journey starts here! 🌱</p>
        <p className="text-sm text-text-muted">
          Track your daily mood to see your progress over time.
        </p>
      </div>
    );
  }

  return <JourneyTimeline entries={timelineEntries} />;
};

export default JourneyContent;
