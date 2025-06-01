import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const JourneyIcon = ({
  size = 28,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.5 -0.5 16 16"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeMiterlimit="10"
    className={className}
    {...props}
  >
    <path d="M5.69375 3.175c0 1.4937500000000001 -2.38125 3.75 -2.38125 3.75s-2.3874999999999997 -2.2375 -2.3874999999999997 -3.75A2.3125 2.3125 0 0 1 3.3125 0.9375a2.3125 2.3125 0 0 1 2.38125 2.2375Z" />
    <path
      d="M2.71875 3.325a0.59375 0.59375 0 1 0 1.1875 0 0.59375 0.59375 0 1 0 -1.1875 0"
      fill="currentColor"
    />
    <path d="M2.7125 8.125h2.6875A1.4937500000000001 1.4937500000000001 0 0 1 6.875 9.5875a1.4937500000000001 1.4937500000000001 0 0 1 -1.4874999999999998 1.4937500000000001H2.4125a1.4937500000000001 1.4937500000000001 0 0 0 -1.4874999999999998 1.4874999999999998 1.4937500000000001 1.4937500000000001 0 0 0 1.4874999999999998 1.4937500000000001H11.0625" />
    <path d="m10.46875 5.7125 0 7.15625" />
    <path d="m10.46875 9.2875 2.9812499999999997 0 -0.59375 -1.1875 0.59375 -1.2 -2.9812499999999997 0 0 2.3874999999999997z" />
  </svg>
);

export const MessagesIcon = ({
  size = 28,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const WisdomIcon = ({
  size = 28,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.5 -0.5 16 16"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeMiterlimit="10"
    className={className}
    {...props}
  >
    <path d="M12.275 5.7125a4.7749999999999995 4.7749999999999995 0 1 0 -8.21875 3.2937499999999997 3.875 3.875 0 0 1 1.05625 2.6687499999999997h4.7749999999999995a3.79375 3.79375 0 0 1 1.04375 -2.6500000000000004 4.74375 4.74375 0 0 0 1.34375 -3.3125Z" />
    <path d="M5.1125 11.675h4.7749999999999995v1.1937499999999999a1.1937499999999999 1.1937499999999999 0 0 1 -1.1937499999999999 1.1937499999999999h-2.3874999999999997a1.1937499999999999 1.1937499999999999 0 0 1 -1.1937499999999999 -1.1937499999999999v-1.1937499999999999Z" />
    <path d="M9.16875 7.025a1.66875 1.66875 0 0 1 -3.3375 0c0 -1.43125 1.66875 -3.125 1.66875 -3.125s1.66875 1.7249999999999999 1.66875 3.125Z" />
    <path d="m0.34375 5.7125 1.1875 0" />
    <path d="m2.13125 0.9375 1.1937499999999999 0" />
    <path d="m2.13125 10.48125 1.1937499999999999 0" />
    <path d="m14.65625 5.7125 -1.1875 0" />
    <path d="m12.86875 10.48125 -1.1937499999999999 0" />
    <path d="m12.86875 0.9375 -1.1937499999999999 0" />
  </svg>
);

// Calendar icons from Streamline Atlas Line set
export const CalendarIcon = ({
  size = 28,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="3" width="10" height="8" rx="1" />
    <path d="M5 1v4M9 1v4M2 7h10" />
  </svg>
);

export const CalendarDotsIcon = ({
  size = 28,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.5 -0.5 16 16"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeMiterlimit="10"
    className={className}
    {...props}
  >
    <path d="M0.925 2.10625h13.149999999999999v2.9875000000000003H0.925Z" />
    <path d="M0.925 5.09375h13.149999999999999V14.0625H0.925Z" />
    <path d="m3.3125 8.08125 1.2 0" />
    <path d="m5.706250000000001 8.08125 1.1937499999999999 0" />
    <path d="m8.100000000000001 8.08125 1.1937499999999999 0" />
    <path d="m10.4875 8.08125 1.2 0" />
    <path d="m10.4875 11.075 1.2 0" />
    <path d="m3.3125 11.075 1.2 0" />
    <path d="m5.706250000000001 11.075 1.1937499999999999 0" />
    <path d="m8.100000000000001 11.075 1.1937499999999999 0" />
    <path d="m3.9124999999999996 0.3125 0 2.9875000000000003" />
    <path d="m7.5 0.3125 0 2.9875000000000003" />
    <path d="m11.087499999999999 0.3125 0 2.9875000000000003" />
  </svg>
);

export const CalendarDaysIcon = ({
  size = 28,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="3" width="10" height="8" rx="1" />
    <path d="M5 1v4M9 1v4M2 7h10" />
    <circle cx="5" cy="9" r="0.5" fill="currentColor" />
    <circle cx="7" cy="9" r="0.5" fill="currentColor" />
    <circle cx="9" cy="9" r="0.5" fill="currentColor" />
  </svg>
);

export const CalendarCheckIcon = ({
  size = 28,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="3" width="10" height="8" rx="1" />
    <path d="M5 1v4M9 1v4M2 7h10" />
    <path d="m5.5 9.5 1 1 2.5-2.5" />
  </svg>
);

export const BackIcon = ({
  size = 24,
  className = "",
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

// Export all icons as a collection for easier management
export const Icons = {
  Journey: JourneyIcon,
  Messages: MessagesIcon,
  Wisdom: WisdomIcon,
  Calendar: CalendarIcon,
  CalendarDots: CalendarDotsIcon,
  CalendarDays: CalendarDaysIcon,
  CalendarCheck: CalendarCheckIcon,
  Back: BackIcon,
} as const;

// Export icon names type for type safety
export type IconName = keyof typeof Icons;
