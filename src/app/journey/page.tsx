import Navbar from "@/components/common/nav-bar";

const JourneyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-8">Journey</h1>
          <p className="text-center text-gray-600">Your journey page content</p>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default JourneyPage;
