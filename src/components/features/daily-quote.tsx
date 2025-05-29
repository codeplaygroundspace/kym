const DailyQuote = () => {
  // TODO: Replace with dynamic quote system in the future
  const quote = {
    text: "You are not alone in this journey. Every feeling is valid, every day is progress.",
    attribution: "From mothers who understand",
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg pt-6 px-6 pb-[var(--navbar-clearance-height)] text-center">
      <blockquote className="text-foreground font-medium mb-4 leading-relaxed">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <cite className="text-menu-text text-sm not-italic">
        {quote.attribution}
      </cite>
    </div>
  );
};

export default DailyQuote;
