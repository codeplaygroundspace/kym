"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TodayIcon,
  JourneyIcon,
  TogetherIcon,
  WisdomIcon,
} from "@/components/icons";

const navItems = {
  "/": {
    name: "Today",
    icon: TodayIcon,
  },
  "/journey": {
    name: "Journey",
    icon: JourneyIcon,
  },
  "/together": {
    name: "Together",
    icon: TogetherIcon,
  },
  "/wisdom": {
    name: "Wisdom",
    icon: WisdomIcon,
  },
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-md mx-auto">
        <nav
          className="flex flex-row items-center justify-around px-4 py-2"
          id="nav"
        >
          {Object.entries(navItems).map(([path, { name, icon: Icon }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-menu-text hover:text-primary"
                }`}
                tabIndex={0}
                aria-label={`Navigate to ${name}`}
              >
                <div className="w-4 h-4 mb-1">
                  <Icon />
                </div>
                <span className="text-xs text-center font-semibold">
                  {name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
