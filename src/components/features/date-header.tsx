import { useMemo } from "react";

const DateHeader = () => {
  const currentDate = useMemo(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    const day = now.getDate();
    const getOrdinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const formatted = now.toLocaleDateString("en-GB", options);
    return formatted.replace(/\d+/, `${day}${getOrdinalSuffix(day)}`);
  }, []);

  return (
    <p
      className="text-xs text-menu-text mb-2"
      role="banner"
      aria-label="Current date"
    >
      {currentDate}
    </p>
  );
};

export default DateHeader;
