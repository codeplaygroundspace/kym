"use client";

import Link from "next/link";
import BackButton from "@/components/common/back-button";

const HowItWorksPage = () => {
  const handleBackClick = () => {
    window.location.href = "/welcome";
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={handleBackClick} size={20} />
          <h1 className="text-lg font-semibold text-text-primary">
            How it works
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-text-primary">
            Your mental health journey, simplified
          </h2>
          <p className="text-text-secondary text-base leading-relaxed">
            Know Your Mind helps you track, understand, and improve your mental
            wellbeing through personalized insights and professional support.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <div className="bg-white rounded-card-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Track Your Journey
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Log your daily mood, symptoms, and experiences. Build a
                  comprehensive picture of your mental health over time.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-card-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Get Insights
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Discover patterns and triggers in your mental health. Our
                  AI-powered analysis helps you understand what affects your
                  wellbeing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-card-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Connect with Care
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Share your data with healthcare providers and get personalized
                  recommendations for your mental health journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-purple-50 rounded-card-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3">
            Your privacy is our priority
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            All your data is encrypted and stored securely. You control who has
            access to your information and can revoke access at any time.
          </p>
          <Link
            href="/privacy-promise"
            className="text-primary font-medium text-sm hover:underline"
          >
            Learn more about our privacy promise →
          </Link>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-text-primary">
            Ready to start your journey?
          </h3>
          <div className="space-y-3">
            <Link
              href="/sign-up"
              className="block w-full bg-primary text-white rounded-card-lg py-4 px-6 font-semibold text-center transition-all shadow-lg hover:bg-primary/90"
            >
              Get started
            </Link>
            <Link
              href="/welcome"
              className="block w-full bg-gray-100 text-text-primary rounded-card-lg py-4 px-6 font-medium text-center transition-all hover:bg-gray-200"
            >
              Back to welcome
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
