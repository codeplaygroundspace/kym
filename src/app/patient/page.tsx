import PageHeader from "@/components/common/page-header";
import DateHeader from "@/components/features/date-header";
import GreetingSection from "@/components/features/greeting-section";
import WeeksCounter from "@/components/features/weeks-counter";
import MoodSelector from "@/components/features/mood-selector";
import DailyQuote from "@/components/features/daily-quote";

export default function PatientDashboard() {
  return (
    <main>
      <div className="container mx-auto px-4 pt-10 pb-20 max-w-md">
        <PageHeader>
          <DateHeader />
          <GreetingSection />
        </PageHeader>
        <WeeksCounter />
        <MoodSelector />
        <DailyQuote />
      </div>
    </main>
  );
}
