"use client";

import { LuBookmark } from "react-icons/lu";

interface WisdomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "discover", label: "Discover", icon: null },
  { id: "saved", label: "Saved", icon: LuBookmark },
  { id: "watch", label: "Watch", icon: null },
  { id: "discharge", label: "Discharge", icon: null },
];

const WisdomTabs: React.FC<WisdomTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white dark:bg-gray-700 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
            tabIndex={0}
            aria-label={`Switch to ${tab.label} tab`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default WisdomTabs;
