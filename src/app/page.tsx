import Navbar from "@/components/common/nav-bar";
import DateHeader from "@/components/features/date-header";
import GreetingSection from "@/components/features/greeting-section";
import WeeksCounter from "@/components/features/weeks-counter";
import MoodCheck from "@/components/features/mood-check";
import QuickActions from "@/components/features/quick-actions";
import DailyQuote from "@/components/features/daily-quote";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="container mx-auto px-4 pt-10 pb-0 max-w-md">
          <DateHeader />
          <GreetingSection />
          <WeeksCounter />
          <MoodCheck />
          <QuickActions />
          <DailyQuote />
        </div>
      </main>
      <Navbar />
    </div>
  );
}
