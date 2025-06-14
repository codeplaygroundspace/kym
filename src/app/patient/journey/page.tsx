import Navbar from "@/components/common/nav-bar";
import PageHeader from "@/components/common/page-header";
import MilestoneCard from "@/components/features/milestone-card";
import JourneyTimeline from "@/components/features/journey-timeline";
import { timelineEntries, currentMilestone } from "@/data/journey-data";

const JourneyPage = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <main>
        <div className="container mx-auto px-4 pt-10 pb-20 max-w-md">
          <PageHeader title="Journey" showTitle />

          <JourneyTimeline entries={timelineEntries} />

          <MilestoneCard
            title={currentMilestone.title}
            description={currentMilestone.description}
            emoji={currentMilestone.emoji}
          />
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default JourneyPage;
