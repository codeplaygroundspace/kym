const WeeksCounter = () => {
  // TODO: Replace with actual weeks calculation from user data
  const weeksCount = 25;

  return (
    <div className="mb-18">
      <div className="text-8xl font-extrabold leading-none mb-2 bg-gradient-to-b from-gray-900 to-gray-100 dark:from-gray-800 dark:to-gray-400 bg-clip-text text-transparent">
        {weeksCount}
      </div>
      <p className="text-menu-text text-base">weeks of strength</p>
    </div>
  );
};

export default WeeksCounter;
