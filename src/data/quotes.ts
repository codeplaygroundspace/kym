export interface Quote {
  text: string;
  attribution: string;
}

export const quotes: Quote[] = [
  {
    text: "You are not alone in this journey. Every feeling is valid, every day is progress.",
    attribution: "From mothers who understand",
  },
  {
    text: "Your strength is greater than any challenge you face. Take it one moment at a time.",
    attribution: "Words of encouragement",
  },
  {
    text: "It's okay to not be okay. Healing isn't linear, and that's perfectly normal.",
    attribution: "Mental health reminder",
  },
  {
    text: "You are doing better than you think. Small steps forward are still steps forward.",
    attribution: "Daily affirmation",
  },
  {
    text: "Your feelings matter, your story matters, and you matter. Never forget that.",
    attribution: "Self-worth reminder",
  },
  {
    text: "Progress, not perfection. Every day you choose to keep going is a victory.",
    attribution: "Gentle motivation",
  },
  {
    text: "Be patient with yourself. Growth takes time, and you're exactly where you need to be.",
    attribution: "Mindful wisdom",
  },
  {
    text: "You have survived 100% of your difficult days so far. You're stronger than you know.",
    attribution: "Resilience reminder",
  },
  {
    text: "It's brave to ask for help, brave to feel your feelings, and brave to keep trying.",
    attribution: "Courage acknowledgment",
  },
  {
    text: "Tomorrow is a new day with new possibilities. Rest tonight knowing you've done enough.",
    attribution: "Evening comfort",
  },
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
