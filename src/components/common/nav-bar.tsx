"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MessageCircleMore } from "lucide-react";
import { JourneyIcon, WisdomIcon } from "@/components/icons";

const navItems = {
  "/patient": {
    name: "Today",
    icon: () => <CalendarDays size={24} />,
  },
  "/patient/journey": {
    name: "Journey",
    icon: JourneyIcon,
  },
  "/patient/messages": {
    name: "Messages",
    icon: () => <MessageCircleMore size={24} />,
  },
  "/patient/wisdom": {
    name: "Wisdom",
    icon: WisdomIcon,
  },
};

export default function Navbar() {
  const pathname = usePathname();

  // Only show navbar on main pages, not on sub-pages
  const mainPages = [
    "/patient",
    "/patient/journey",
    "/patient/messages",
    "/patient/wisdom",
  ];
  const shouldShowNavbar = mainPages.includes(pathname);

  if (!shouldShowNavbar) {
    return null;
  }

  return (
    <aside className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 z-50">
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
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 ${
                  isActive ? "text-primary" : "text-menu-text"
                }`}
                tabIndex={0}
                aria-label={`Navigate to ${name}`}
              >
                <div
                  className={`mb-1 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary/10 dark:bg-primary/20"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
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
