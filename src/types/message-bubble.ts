export interface MessageBubbleProps {
  message: string;
  alignment?: "left" | "right";
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export type MessageAlignment = "left" | "right";
export type MessageVariant = "default" | "primary" | "secondary";
