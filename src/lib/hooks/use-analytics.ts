import { useCallback } from "react";
import {
  trackEvent,
  trackPageView,
  trackInteraction,
  trackError,
  type AnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/analytics";

/**
 * Custom hook for analytics tracking
 * Provides convenient methods for tracking events, page views, interactions, and errors
 */
export const useAnalytics = () => {
  const track = useCallback(
    (event: AnalyticsEvent, properties?: AnalyticsProperties) => {
      trackEvent(event, properties);
    },
    []
  );

  const trackPage = useCallback(
    (page: string, properties?: AnalyticsProperties) => {
      trackPageView(page, properties);
    },
    []
  );

  const trackClick = useCallback(
    (element: string, properties?: AnalyticsProperties) => {
      trackInteraction("click", element, properties);
    },
    []
  );

  const trackHover = useCallback(
    (element: string, properties?: AnalyticsProperties) => {
      trackInteraction("hover", element, properties);
    },
    []
  );

  const trackFocus = useCallback(
    (element: string, properties?: AnalyticsProperties) => {
      trackInteraction("focus", element, properties);
    },
    []
  );

  const trackScroll = useCallback(
    (element: string, properties?: AnalyticsProperties) => {
      trackInteraction("scroll", element, properties);
    },
    []
  );

  const trackErrorEvent = useCallback(
    (error: string | Error, context?: string) => {
      trackError(error, context);
    },
    []
  );

  return {
    track,
    trackPage,
    trackClick,
    trackHover,
    trackFocus,
    trackScroll,
    trackError: trackErrorEvent,
  };
};
