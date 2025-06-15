/**
 * Privacy-friendly username generator
 * Generates random, friendly usernames that don't reveal personal information
 */

const adjectives = [
  "Brave",
  "Calm",
  "Gentle",
  "Strong",
  "Wise",
  "Kind",
  "Bright",
  "Peaceful",
  "Hopeful",
  "Radiant",
  "Serene",
  "Vibrant",
  "Graceful",
  "Resilient",
  "Mindful",
  "Joyful",
  "Caring",
  "Warm",
  "Confident",
  "Balanced",
  "Creative",
  "Inspiring",
  "Nurturing",
  "Positive",
  "Thoughtful",
  "Empowered",
  "Centered",
  "Flourishing",
];

const nouns = [
  "Journey",
  "Path",
  "Spirit",
  "Heart",
  "Soul",
  "Mind",
  "Light",
  "Star",
  "Bloom",
  "Garden",
  "River",
  "Mountain",
  "Ocean",
  "Sky",
  "Dawn",
  "Sunset",
  "Butterfly",
  "Phoenix",
  "Tree",
  "Flower",
  "Moon",
  "Sun",
  "Wave",
  "Breeze",
  "Rainbow",
  "Pearl",
  "Crystal",
  "Compass",
  "Anchor",
  "Bridge",
  "Haven",
  "Oasis",
];

const colors = [
  "Rose",
  "Sage",
  "Coral",
  "Mint",
  "Lavender",
  "Amber",
  "Pearl",
  "Azure",
  "Ivory",
  "Jade",
  "Ruby",
  "Sapphire",
  "Golden",
  "Silver",
  "Violet",
  "Indigo",
];

/**
 * Generates a random privacy-friendly username
 * Format: [Adjective][Noun][Number] or [Color][Noun][Number]
 * Examples: "BraveJourney23", "RoseSpirit47", "CalmHeart91"
 */
export const generateUsername = (): string => {
  const useColor = Math.random() > 0.5;
  const firstWord = useColor
    ? colors[Math.floor(Math.random() * colors.length)]
    : adjectives[Math.floor(Math.random() * adjectives.length)];

  const secondWord = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 99) + 1;

  return `${firstWord}${secondWord}${number}`;
};

/**
 * Generates initials from a display name
 * Falls back to first letter + number if single word
 */
export const generateInitials = (displayName: string): string => {
  const words = displayName.trim().split(/\s+/);

  if (words.length >= 2) {
    return words
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  } else {
    // Single word - use first letter + last character (if it's a number)
    const name = words[0];
    const firstLetter = name[0].toUpperCase();
    const lastChar = name[name.length - 1];

    if (/\d/.test(lastChar)) {
      return firstLetter + lastChar;
    } else {
      return firstLetter + firstLetter; // Fallback: double the first letter
    }
  }
};

/**
 * Validates if a display name is appropriate
 * Basic validation - can be extended with more rules
 */
export const validateDisplayName = (
  name: string
): { isValid: boolean; error?: string } => {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: "Display name must be at least 2 characters long",
    };
  }

  if (trimmed.length > 30) {
    return {
      isValid: false,
      error: "Display name must be less than 30 characters",
    };
  }

  // Allow letters, numbers, spaces, and basic punctuation
  if (!/^[a-zA-Z0-9\s\-_.]+$/.test(trimmed)) {
    return {
      isValid: false,
      error:
        "Display name can only contain letters, numbers, spaces, and basic punctuation",
    };
  }

  return { isValid: true };
};
