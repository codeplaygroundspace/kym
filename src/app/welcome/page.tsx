"use client";

import Link from "next/link";

const WelcomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col px-4 pb-8"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1504152692/photo/happy-pregnant-woman-looking-at-ultrasound-scan-at-home.jpg?s=1024x1024&w=is&k=20&c=YHuBgVmsjmbt9H3u3y_kWkJIegARQstd0gZI1St0C-0=')`,
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-black/100 opacity-40"></div>

      {/* Learn more button - top right */}
      <div className="relative z-10 flex justify-end pt-8">
        <Link
          href="/welcome/how-it-works"
          className="bg-bg-primary/20 backdrop-blur-sm text-white rounded-card-sm py-2 px-4 text-xs font-medium transition-all hover:bg-bg-primary/30"
        >
          Learn more
        </Link>
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end">
        <div className="w-full max-w-sm space-y-6">
          {/* Title */}
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Know your mind
          </h1>

          {/* Buttons */}
          <div className="space-y-4">
            <Link
              href="/sign-up"
              className="block w-full bg-primary text-white rounded-card-md py-2 px-6 font-semibold text-center transition-all shadow-lg"
            >
              Sign up
            </Link>
            <Link
              href="/log-in"
              className="block w-full bg-bg-primary/20 backdrop-blur-sm  text-white rounded-card-md py-2 px-6 font-semibold text-center transition-all"
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
