"use client";

import { useEffect } from "react";
import Link from "next/link";
import TimelineContent from "@/components/features/timeline-content";
import { useAuth } from "@/contexts/auth-context";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { useMood } from "@/contexts/mood-context";

const TimelinePage = () => {
  const { user } = useAuth();
  const { trackPage } = useAnalytics();
  const { moodEntries, timelineEntries, isLoading, error } = useMood();

  useEffect(() => {
    trackPage("timeline", {
      timestamp: new Date().toISOString(),
    });
  }, [trackPage]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <main>
        <div className="container mx-auto px-4 pt-10 pb-20 max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/patient/journey"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              aria-label="Back to journey"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-text-primary">Timeline</h1>
            <div></div>
          </div>

          {/* Content */}
          <TimelineContent
            timelineEntries={timelineEntries}
            moodEntries={moodEntries}
            isLoading={isLoading}
            error={error}
            isAuthenticated={!!user}
          />
        </div>
      </main>
    </div>
  );
};

export default TimelinePage;
