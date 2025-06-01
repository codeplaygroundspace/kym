import { useMemo } from "react";
import { getRandomQuote } from "@/data/quotes";

const DailyQuote = () => {
  // Get a random quote that stays consistent for this component instance
  const quote = useMemo(() => getRandomQuote(), []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-card-lg pt-6 px-6 pb-6 text-center mt-8">
      <blockquote className="text-text-primary font-medium mb-4 leading-relaxed">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <cite className="text-text-muted text-sm not-italic">
        {quote.attribution}
      </cite>
    </div>
  );
};

export default DailyQuote;
