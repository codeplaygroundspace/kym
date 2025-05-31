import { Milestone } from "@/types/journey";

const MilestoneCard = ({
  title,
  description,
  emoji,
}: Omit<Milestone, "weekReached">) => {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-6 rounded-2xl mb-14 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative z-10">
        <div className="text-4xl mb-4" role="img" aria-label="Celebration">
          {emoji}
        </div>
        <h3 className="text-xl font-semibold mb-2 tracking-tight">{title}</h3>
        <p className="text-sm opacity-90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default MilestoneCard;
