import { Milestone } from "@/types/journey";

const MilestoneCard = ({
  title,
  description,
  emoji,
}: Omit<Milestone, "weekReached">) => {
  return (
    <div className="bg-gradient-primary text-text-primary p-6 rounded-2xl mb-14 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative z-10">
        <div className="text-4xl mb-4" role="img" aria-label="Celebration">
          {emoji}
        </div>
        <h3 className="text-xl font-semibold mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MilestoneCard;
