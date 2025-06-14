"use client";

import UserAvatar from "./user-avatar";

interface PageHeaderProps {
  title?: string;
  showTitle?: boolean;
  showAvatar?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader = ({
  title,
  showTitle = false,
  showAvatar = true,
  className = "",
  children,
}: PageHeaderProps) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className="flex-1">
        {showTitle && title && (
          <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        )}
        {children}
      </div>

      {showAvatar && (
        <div className="flex-shrink-0">
          <UserAvatar size="md" />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
