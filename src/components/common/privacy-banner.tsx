"use client";

import { IoLockClosed, IoChevronUp } from "react-icons/io5";

const PrivacyBanner = () => {
  return (
    <div className="mb-4 flex justify-center px-4">
      <a
        href="/welcome/privacy-promise"
        className="bg-black/50 backdrop-blur-sm rounded-card-lg px-4 py-3 flex items-center gap-3 text-white w-full max-w-sm hover:bg-black/60 transition-all"
        aria-label="View privacy promise details"
      >
        <div className="flex items-center gap-2 flex-1">
          <IoLockClosed className="w-5 h-5 text-purple-200" />
          <div>
            <div className="text-sm font-medium">Our Privacy Promise</div>
            <div className="text-xs text-purple-200">
              We protect your personal data
            </div>
          </div>
        </div>
        <IoChevronUp className="w-4 h-4 text-purple-200" />
      </a>
    </div>
  );
};

export default PrivacyBanner;
