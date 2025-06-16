import Link from "next/link";
import JourneyTimeline from "@/components/features/journey-timeline";
import { TimelineEntry } from "@/types/journey";
import { MoodEntry } from "@/types/mood";

interface TimelineContentProps {
  timelineEntries: TimelineEntry[];
  moodEntries: MoodEntry[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const TimelineContent = ({
  timelineEntries,
  moodEntries,
  isLoading,
  error,
  isAuthenticated,
}: TimelineContentProps) => {
  if (!isAuthenticated) {
    return (
      <div className="bg-bg-primary rounded-card-lg p-8 text-center">
        <p className="text-text-secondary">
          Please log in to view your timeline
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-bg-primary rounded-card-lg p-8 text-center">
        <p className="text-text-secondary">Loading your timeline...</p>
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
        <p className="text-text-secondary mb-4">No entries yet! 🌱</p>
        <p className="text-sm text-text-muted mb-6">
          Start tracking your daily mood to build your timeline.
        </p>
        <Link
          href="/patient"
          className="inline-block bg-primary text-white px-6 py-2 rounded-card-md font-medium transition-colors hover:bg-primary/90"
        >
          Track Your Mood
        </Link>
      </div>
    );
  }

  const calculateTrackingDays = () => {
    if (moodEntries.length === 0) return 0;
    const oldestEntry = moodEntries[moodEntries.length - 1];
    return Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(oldestEntry.created_at).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  };

  return (
    <>
      <JourneyTimeline
        entries={timelineEntries}
        showViewAll={false}
        showTitle={false}
      />

      {/* Stats */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-card-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Your Progress
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {timelineEntries.length}
            </div>
            <div className="text-sm text-text-muted">Total entries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {calculateTrackingDays()}
            </div>
            <div className="text-sm text-text-muted">Days tracking</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineContent;
