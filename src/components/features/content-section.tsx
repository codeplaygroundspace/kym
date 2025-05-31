import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-xl font-bold text-text-primary mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
};

export default ContentSection;
