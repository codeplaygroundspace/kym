import Link from "next/link";
import { TimelineEntry } from "@/types/journey";

interface JourneyTimelineProps {
  entries: TimelineEntry[];
  showViewAll?: boolean;
  showTitle?: boolean;
}

const colorClasses = {
  orange: "bg-orange-500",
  red: "bg-red-500",
  green: "bg-green-500",
};

const JourneyTimeline = ({
  entries,
  showViewAll = true,
  showTitle = true,
}: JourneyTimelineProps) => {
  return (
    <div className="mb-8">
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          {showViewAll && (
            <Link
              href="/journey/timeline"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              tabIndex={0}
              aria-label="View all journey entries"
            >
              View all
            </Link>
          )}
        </div>
      )}

      <div className={`space-y-6 ${!showTitle ? "mt-0" : ""}`}>
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  colorClasses[entry.color]
                } flex-shrink-0`}
                aria-hidden="true"
              />
              <div className="w-px bg-gray-200 dark:bg-gray-700 h-12 mt-2" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm text-text-muted uppercase tracking-wide mb-1">
                {entry.date}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl" role="img" aria-label="Status emoji">
                  {entry.emoji}
                </span>
                <span className="text-text-primary font-medium">
                  {entry.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTimeline;
