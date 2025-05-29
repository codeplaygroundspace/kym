"use client";

const QuickActions = () => {
  const actions = [
    {
      title: "Today's Journal",
      status: "Unwritten",
      statusColor: "text-menu-text",
      onClick: () => console.log("Journal clicked"),
    },
    {
      title: "Your Vitals",
      status: "Track now",
      statusColor: "text-primary",
      onClick: () => console.log("Vitals clicked"),
    },
    {
      title: "Your Midwife",
      status: "Available",
      statusColor: "text-green-600",
      onClick: () => console.log("Midwife clicked"),
    },
  ];

  return (
    <div className="space-y-3 mb-8">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex justify-between items-center transition-all hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span className="font-medium text-foreground">{action.title}</span>
          <span className={`text-sm ${action.statusColor}`}>
            {action.status}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
