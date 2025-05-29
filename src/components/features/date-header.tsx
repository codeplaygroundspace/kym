const DateHeader = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    const formatted = now.toLocaleDateString("en-US", options);
    // Add ordinal suffix to day
    const day = now.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return formatted.replace(/\d+/, `${day}${suffix}`);
  };

  return <p className="text-xs text-menu-text mb-2">{getCurrentDate()}</p>;
};

export default DateHeader;
