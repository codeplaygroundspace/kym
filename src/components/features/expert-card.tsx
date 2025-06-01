import { Expert } from "@/data/wisdom-data";
import Image from "next/image";

interface ExpertCardProps {
  expert: Expert;
  onClick?: (expert: Expert) => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(expert);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="bg-bg-primary rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 border border-none"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${expert.name}'s profile`}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          <Image
            src={expert.avatar}
            alt={expert.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-text-muted mb-1">{expert.specialty}</div>
          <div className="font-semibold text-text-primary truncate">
            {expert.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
