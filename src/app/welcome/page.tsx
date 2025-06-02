"use client";

import Link from "next/link";

const WelcomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-end justify-center px-4 pb-16"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1504152692/photo/happy-pregnant-woman-looking-at-ultrasound-scan-at-home.jpg?s=1024x1024&w=is&k=20&c=YHuBgVmsjmbt9H3u3y_kWkJIegARQstd0gZI1St0C-0=')`,
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-purple opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm space-y-4">
        {/* Sign Up Button */}
        <Link
          href="/sign-up"
          className="block w-full bg-primary hover:bg-primary/90 text-white rounded-card-lg py-4 px-6 font-semibold text-center transition-all shadow-lg"
        >
          Sign up
        </Link>

        {/* Log In Button */}
        <Link
          href="/log-in"
          className="block w-full bg-black/50 backdrop-blur-sm hover:bg-black/60 text-white rounded-card-lg py-4 px-6 font-semibold text-center transition-all"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
