import { LuPlay, LuHeadphones } from "react-icons/lu";
import { Course } from "@/data/wisdom-data";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
  onClick?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(course);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const MediaIcon = course.type === "video" ? LuPlay : LuHeadphones;
  const mediaLabel = course.type === "video" ? "Video Course" : "Audio Course";

  return (
    <div
      className="bg-bg-primary rounded-card-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 border border-none"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${course.title} course`}
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="w-full h-full object-cover"
        />

        {/* Media Type Indicator */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-card-sm text-xs font-medium ${
              course.type === "video"
                ? "bg-purple-500/80 text-white"
                : "bg-pink-500/80 text-white"
            }`}
          >
            <MediaIcon className="w-3 h-3" />
            {mediaLabel}
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center">
            <MediaIcon className="w-6 h-6 text-text-primary" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-text-primary mb-1 leading-tight">
          {course.title}
        </h3>
        {course.description && (
          <p className="text-sm text-text-secondary leading-relaxed">
            {course.description}
          </p>
        )}
        {course.duration && (
          <div className="text-xs text-text-muted mt-2">{course.duration}</div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
