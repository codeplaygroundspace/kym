import { JourneyStats as JourneyStatsType } from "@/types/journey";

const JourneyStats = ({
  weeksStrong,
  daysGrowing,
  completionPercentage,
}: JourneyStatsType) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-14">
      <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5">
        <div className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
          {weeksStrong}
        </div>
        <div className="text-xs text-text-muted tracking-wide">
          weeks strong
        </div>
      </div>

      <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5">
        <div className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
          {daysGrowing}
        </div>
        <div className="text-xs text-text-muted tracking-wide">
          days growing
        </div>
      </div>

      <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5">
        <div className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
          {completionPercentage}%
        </div>
        <div className="text-xs text-text-muted tracking-wide">complete</div>
      </div>
    </div>
  );
};

export default JourneyStats;
