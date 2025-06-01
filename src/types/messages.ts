export interface MessageItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  avatarColor: string;
  icon: string;
  hasNotification?: boolean;
}

export interface MessageItemProps {
  message: MessageItem;
}
