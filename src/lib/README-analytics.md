# Vercel Analytics Setup

This project uses Vercel Analytics to track user interactions, page views, and custom events. The analytics system is designed to be type-safe, easy to use, and privacy-focused.

## 📦 Packages Installed

- `@vercel/analytics` - Core analytics tracking
- `@vercel/speed-insights` - Performance monitoring

## 🏗️ Architecture

### Core Files

- `src/lib/analytics.ts` - Core analytics functions and types
- `src/lib/hooks/use-analytics.ts` - React hook for easy component integration
- `src/app/layout.tsx` - Global Analytics and SpeedInsights components

## 🚀 Usage

### Basic Event Tracking

```tsx
import { useAnalytics } from "@/lib/hooks/use-analytics";

const MyComponent = () => {
  const { track, trackClick, trackPage } = useAnalytics();

  const handleButtonClick = () => {
    trackClick("cta_button", {
      location: "homepage",
      variant: "primary",
    });
  };

  useEffect(() => {
    trackPage("homepage", {
      userType: "new_visitor",
      timestamp: new Date().toISOString(),
    });
  }, [trackPage]);

  return <button onClick={handleButtonClick}>Click me</button>;
};
```

### Available Event Types

The system includes predefined event types for better TypeScript support:

- `user_signup` - User registration
- `user_login` - User authentication
- `user_logout` - User sign out
- `journey_entry_created` - New journal entry
- `journey_entry_updated` - Journal entry modification
- `message_sent` - Message sending
- `message_received` - Message receiving
- `profile_updated` - Profile changes
- `timeline_viewed` - Timeline page access
- `practitioner_dashboard_viewed` - Practitioner dashboard access
- `patient_dashboard_viewed` - Patient dashboard access
- `analytics_viewed` - Analytics page access
- `schedule_viewed` - Schedule page access
- `how_it_works_viewed` - How it works page access
- `privacy_promise_viewed` - Privacy promise page access

### Custom Event Tracking

```tsx
import { trackEvent } from "@/lib/analytics";

// Track custom events with properties
trackEvent("user_signup", {
  method: "email",
  source: "landing_page",
  timestamp: new Date().toISOString(),
});
```

### Page View Tracking

```tsx
import { trackPageView } from "@/lib/analytics";

// Track page views with context
trackPageView("patient_dashboard", {
  userType: "returning",
  sessionDuration: 1200,
  previousPage: "login",
});
```

### Interaction Tracking

```tsx
import { trackInteraction } from "@/lib/analytics";

// Track user interactions
trackInteraction("click", "navigation_menu", {
  menuItem: "journey",
  userType: "patient",
});

trackInteraction("scroll", "timeline_page", {
  scrollDepth: "75%",
  timeOnPage: 45,
});
```

### Error Tracking

```tsx
import { trackError } from "@/lib/analytics";

try {
  // Some operation that might fail
  await riskyOperation();
} catch (error) {
  trackError(error, "user_profile_update");
}
```

## 🎯 Hook Usage Examples

### useAnalytics Hook

```tsx
import { useAnalytics } from "@/lib/hooks/use-analytics";

const PatientDashboard = () => {
  const { track, trackPage, trackClick, trackError } = useAnalytics();

  useEffect(() => {
    trackPage("patient_dashboard");
  }, [trackPage]);

  const handleJourneyClick = () => {
    trackClick("journey_button", {
      section: "main_navigation",
    });
  };

  const handleError = (error: Error) => {
    trackError(error, "patient_dashboard_load");
  };

  return (
    <div>
      <button onClick={handleJourneyClick}>View Journey</button>
    </div>
  );
};
```

## 🔒 Privacy & Development

### Development Mode

In development mode, analytics events are logged to the console instead of being sent to Vercel Analytics.

### Error Handling

All analytics functions include error handling to prevent analytics failures from breaking your app.

### Privacy-First

- No personal data is tracked by default
- All tracking is anonymous unless explicitly configured
- Complies with privacy regulations

## 📊 Vercel Dashboard

To view your analytics data:

1. Go to your Vercel project dashboard
2. Navigate to the "Analytics" tab
3. View real-time and historical data
4. Set up custom events and funnels

## 🛠️ Configuration

### Environment Variables (Optional)

You can configure analytics behavior with environment variables:

```env
# .env.local
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### Custom Configuration

For advanced configuration, you can modify the Analytics component in `layout.tsx`:

```tsx
<Analytics
  mode={process.env.NODE_ENV === "development" ? "development" : "production"}
  debug={process.env.NODE_ENV === "development"}
/>
```

## 🚀 Best Practices

1. **Track Meaningful Events**: Focus on user actions that provide business value
2. **Use Consistent Naming**: Follow the predefined event types when possible
3. **Add Context**: Include relevant properties to make data actionable
4. **Respect Privacy**: Don't track sensitive personal information
5. **Test in Development**: Verify events are firing correctly using console logs
6. **Monitor Performance**: Use Speed Insights to track performance impact

## 📈 Common Tracking Patterns

### Authentication Flow

```tsx
// Login success
track("user_login", { method: "email", timestamp: new Date().toISOString() });

// Signup completion
track("user_signup", { source: "welcome_page", method: "email" });

// Logout
track("user_logout", { sessionDuration: calculateSessionDuration() });
```

### User Journey

```tsx
// Journey entry creation
track("journey_entry_created", {
  entryType: "mood",
  wordCount: entry.content.split(" ").length,
});

// Timeline interaction
trackClick("timeline_entry", {
  entryId: entry.id,
  entryAge: calculateDaysAgo(entry.createdAt),
});
```

### Navigation

```tsx
// Page transitions
trackPage("patient_messages", {
  previousPage: router.previousPath,
  loadTime: performance.now() - navigationStart,
});

// Menu interactions
trackClick("main_navigation", {
  destination: href,
  currentPage: router.pathname,
});
```

This analytics setup provides comprehensive tracking while maintaining type safety and privacy compliance. Use it to gain insights into user behavior and improve the KYM experience.
