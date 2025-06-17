import { track as vercelTrack } from "@vercel/analytics";

// Custom event types for better TypeScript support
export type AnalyticsEvent =
  | "user_signup"
  | "user_login"
  | "user_logout"
  | "journey_entry_created"
  | "journey_entry_updated"
  | "message_sent"
  | "message_received"
  | "profile_updated"
  | "timeline_viewed"
  | "practitioner_dashboard_viewed"
  | "patient_dashboard_viewed"
  | "analytics_viewed"
  | "schedule_viewed"
  | "how_it_works_viewed"
  | "privacy_promise_viewed"
  | "page_view"
  | "user_action"
  | "user_interaction"
  | "error";

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined;
}

export interface PageViewData extends AnalyticsProperties {
  page: string;
  user_id?: string;
  timestamp?: string;
}

export interface UserActionData extends AnalyticsProperties {
  action: string;
  element?: string;
  page?: string;
  user_id?: string;
  timestamp?: string;
}

export interface JourneyEventData extends AnalyticsProperties {
  mood_id?: string;
  mood_label?: string;
  mood_value?: number;
  timestamp?: string;
  user_id?: string;
}

/**
 * Main tracking function with error handling
 */
export const track = (
  eventName: string,
  data?: AnalyticsProperties,
  context: string = "unknown"
): void => {
  try {
    // Add context and timestamp to all events
    const enrichedData = {
      ...data,
      context,
      timestamp: new Date().toISOString(),
    };

    // Send to Vercel Analytics
    vercelTrack(eventName, enrichedData);

    // Log in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Analytics Event:", {
        event: eventName,
        data: enrichedData,
      });
    }
  } catch {
    // Silently fail - analytics should never break the app
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics tracking failed for event:", eventName);
    }
  }
};

/**
 * Track a custom analytics event
 */
export const trackEvent = (
  event: AnalyticsEvent,
  properties?: AnalyticsProperties
): void => {
  try {
    track(event, properties);
  } catch {
    // Silently fail in development or if analytics is not available
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics event:", event, properties);
    }
  }
};

/**
 * Track page views with custom properties
 */
export const trackPageView = (
  page: string,
  properties?: AnalyticsProperties
): void => {
  try {
    track("page_view", { page, ...properties });
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.log("Page view:", page, properties);
    }
  }
};

/**
 * Track user interactions
 */
export const trackInteraction = (
  action: "click" | "hover" | "focus" | "scroll",
  element: string,
  properties?: AnalyticsProperties
): void => {
  try {
    track("user_interaction", { action, element, ...properties });
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.log("User interaction:", action, element, properties);
    }
  }
};

/**
 * Track user actions
 */
export const trackUserAction = (data: UserActionData): void => {
  try {
    track("user_action", data, "interaction");
  } catch {
    // Silently fail
    if (process.env.NODE_ENV === "development") {
      console.warn("User action tracking failed");
    }
  }
};

/**
 * Track journey events
 */
export const trackJourneyEvent = (data: JourneyEventData): void => {
  try {
    track("journey_event", data, "journey");
  } catch {
    // Silently fail
    if (process.env.NODE_ENV === "development") {
      console.warn("Journey event tracking failed");
    }
  }
};

/**
 * Track errors for debugging
 */
export const trackError = (error: string | Error, context?: string): void => {
  try {
    const errorMessage = error instanceof Error ? error.message : error;
    track("error", {
      error: errorMessage,
      context: context || "unknown",
      timestamp: new Date().toISOString(),
    });
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.error("Analytics error tracking failed");
    }
  }
};
