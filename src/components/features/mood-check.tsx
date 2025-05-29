"use client";

const MoodCheck = () => {
  const handleMoodClick = () => {
    // TODO: Implement mood selection functionality
    console.log("Mood check clicked");
  };

  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={handleMoodClick}
        className="w-32 h-32 bg-green-200 rounded-full flex items-center justify-center transition-all hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-100"
        aria-label="Check your mood"
      >
        <span className="text-gray-700 font-medium text-center">
          How are you?
        </span>
      </button>
    </div>
  );
};

export default MoodCheck;
