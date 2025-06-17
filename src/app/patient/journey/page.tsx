"use client";

import { useEffect } from "react";
import Navbar from "@/components/common/nav-bar";
import PageHeader from "@/components/common/page-header";
import JourneyContent from "@/components/features/journey-content";
import { useAuth } from "@/contexts/auth-context";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { useMood } from "@/contexts/mood-context";

const JourneyPage = () => {
  const { user } = useAuth();
  const { trackPage } = useAnalytics();
  const { timelineEntries, isLoading, error } = useMood();

  useEffect(() => {
    trackPage("journey", {
      timestamp: new Date().toISOString(),
    });
  }, [trackPage]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <main>
        <div className="container mx-auto px-4 pt-10 pb-20 max-w-md">
          <PageHeader title="Journey" showTitle />

          <JourneyContent
            timelineEntries={timelineEntries}
            isLoading={isLoading}
            error={error}
            isAuthenticated={!!user}
          />
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default JourneyPage;
