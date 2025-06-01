const GreetingSection = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // TODO: Replace with actual user name from context/props in the future
  const userName = "Fernanda";

  return (
    <h1 className="text-xl font-bold text-text-primary mb-6">
      {getGreeting()}, {userName}
    </h1>
  );
};

export default GreetingSection;
