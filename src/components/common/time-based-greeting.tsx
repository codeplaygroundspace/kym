"use client";

import { useState, useEffect } from "react";

interface TimeBasedGreetingProps {
  className?: string;
}

/**
 * Simple time-based greeting component for MVP
 * Shows appropriate greeting based on user's local time
 */
const TimeBasedGreeting = ({ className = "" }: TimeBasedGreetingProps) => {
  const [greeting, setGreeting] = useState<string>("Good day");

  const getGreeting = (): string => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 22) return "Good evening";
    return "Good evening";
  };

  useEffect(() => {
    // Update greeting on mount and every minute
    const updateGreeting = () => setGreeting(getGreeting());

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{greeting}</span>;
};

export default TimeBasedGreeting;
