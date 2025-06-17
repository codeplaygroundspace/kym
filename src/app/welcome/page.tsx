"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAnalytics } from "@/lib/hooks/use-analytics";

const WelcomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const { trackPage, trackClick } = useAnalytics();

  useEffect(() => {
    const backgroundImages = [
      "/welcome-bg2.jpg",
      "/welcome-bg3.jpg",
      "/welcome-bg4.jpg",
    ];

    // Select a random background image on component mount
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);

    // Track page view
    trackPage("welcome", {
      backgroundImage: backgroundImages[randomIndex],
      timestamp: new Date().toISOString(),
    });
  }, [trackPage]);

  const handleLearnMoreClick = () => {
    trackClick("learn_more_button", {
      location: "welcome_page",
      destination: "/welcome/how-it-works",
    });
  };

  const handleSignUpClick = () => {
    trackClick("sign_up_button", {
      location: "welcome_page",
      destination: "/auth/signup",
    });
  };

  const handleLoginClick = () => {
    trackClick("login_button", {
      location: "welcome_page",
      destination: "/auth/login",
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col px-4 pb-8"
      style={{
        backgroundImage: backgroundImage
          ? `url('${backgroundImage}')`
          : undefined,
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-black/100 opacity-40"></div>

      {/* Learn more button - top right */}
      <div className="relative z-10 flex justify-end pt-8">
        <Link
          href="/welcome/how-it-works"
          onClick={handleLearnMoreClick}
          className="bg-bg-primary/20 backdrop-blur-sm text-white rounded-lg py-2 px-4 text-xs font-medium transition-all hover:bg-bg-primary/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Learn more about how KYM works"
          tabIndex={0}
        >
          Learn more
        </Link>
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-4xl font-bold text-white text-center mb-4 font-serif drop-shadow-lg">
            Know your mind
          </h1>

          {/* Intro text */}
          <p className="text-white/90 text-center text-lg leading-relaxed mb-8">
            Your mental health journey deserves support and understanding.
          </p>

          <div className="space-y-4">
            <Link
              href="/auth/signup"
              onClick={handleSignUpClick}
              className="block w-full bg-primary text-white rounded-xl py-2 px-6 font-semibold text-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Sign up for KYM account"
              tabIndex={0}
            >
              Sign up
            </Link>
            <Link
              href="/auth/login"
              onClick={handleLoginClick}
              className="block w-full bg-bg-primary/20 backdrop-blur-sm  text-white rounded-xl py-2 px-6 font-semibold text-center transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Log in to your KYM account"
              tabIndex={0}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
