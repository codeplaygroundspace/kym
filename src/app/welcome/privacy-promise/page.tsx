"use client";

import Link from "next/link";
import BackButton from "@/components/common/back-button";

const PrivacyPromisePage = () => {
  const handleBackClick = () => {
    window.location.href = "/sign-up";
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={handleBackClick} size={20} />
          <h1 className="text-lg font-semibold text-text-primary">
            Our Privacy Promise
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-text-primary">
            Your privacy is our priority
          </h2>
          <p className="text-text-secondary text-base leading-relaxed">
            We believe your mental health data should be private, secure, and
            under your complete control. Here&apos;s how we protect you.
          </p>
        </div>

        {/* Privacy Principles */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-lg">🔒</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  End-to-End Encryption
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  All your data is encrypted before it leaves your device. Even
                  we can&apos;t read your personal information without your
                  permission.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-lg">👤</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  You Own Your Data
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Your data belongs to you. Export it, delete it, or control who
                  has access at any time. No hidden fees or restrictions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-lg">🛡️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  HIPAA Compliant
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  We meet the highest standards for healthcare data protection.
                  Your information is stored securely and accessed only when you
                  authorize it.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-lg">🚫</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  No Data Selling
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  We never sell your data to third parties. Our business model
                  is based on helping you, not exploiting your information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3">
            Complete Transparency
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            We believe in being completely transparent about how we handle your
            data. You can review our detailed privacy policy and security
            practices at any time.
          </p>
          <div className="space-y-2">
            <Link
              href="/privacy-policy"
              className="block text-primary font-medium text-sm hover:underline"
            >
              Read our full Privacy Policy →
            </Link>
            <Link
              href="/security"
              className="block text-primary font-medium text-sm hover:underline"
            >
              Learn about our Security Practices →
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-primary/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3">
            Questions about privacy?
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            Our privacy team is here to help. Contact us anytime with questions
            about how we protect your data.
          </p>
          <Link
            href="mailto:privacy@knowyourmind.com"
            className="text-primary font-medium text-sm hover:underline"
          >
            privacy@knowyourmind.com
          </Link>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-text-primary">
            Ready to get started?
          </h3>
          <div className="space-y-3">
            <Link
              href="/sign-up"
              className="block w-full bg-primary text-white rounded-2xl py-4 px-6 font-semibold text-center transition-all shadow-lg hover:bg-primary/90"
            >
              Sign up now
            </Link>
            <Link
              href="/welcome"
              className="block w-full bg-gray-100 text-text-primary rounded-2xl py-4 px-6 font-medium text-center transition-all hover:bg-gray-200"
            >
              Back to welcome
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPromisePage;
