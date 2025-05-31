"use client";

import { motion } from "motion/react";

const MoodCheck = () => {
  const handleMoodClick = () => {
    // TODO: Implement mood selection functionality
    console.log("Mood check clicked");
  };

  // Breathing animation variants
  const breathingVariants = {
    initial: {
      scale: 1,
      opacity: 0.3,
    },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.7, 0.3],
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: [1, 1.05, 1],
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="flex justify-center mb-18 relative w-full">
      {/* Breathing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring - Purple to Pink */}
        <motion.div
          className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full"
          style={{
            background: `conic-gradient(from 0deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(192, 132, 252, 0.2), rgba(232, 121, 249, 0.2), rgba(244, 114, 182, 0.2), rgba(251, 113, 133, 0.2), rgba(139, 92, 246, 0.2))`,
            padding: "2px",
          }}
          variants={breathingVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0,
          }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full" />
        </motion.div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Middle ring - Blue to Green */}
        <motion.div
          className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem] rounded-full"
          style={{
            background: `conic-gradient(from 120deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3), rgba(34, 197, 94, 0.3), rgba(132, 204, 22, 0.3), rgba(234, 179, 8, 0.3), rgba(59, 130, 246, 0.3))`,
            padding: "3px",
          }}
          variants={breathingVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full" />
        </motion.div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Inner ring - Orange to Red */}
        <motion.div
          className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full"
          style={{
            background: `conic-gradient(from 240deg, rgba(245, 158, 11, 0.4), rgba(249, 115, 22, 0.4), rgba(239, 68, 68, 0.4), rgba(236, 72, 153, 0.4), rgba(217, 70, 239, 0.4), rgba(139, 92, 246, 0.4), rgba(245, 158, 11, 0.4))`,
            padding: "1px",
          }}
          variants={breathingVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1,
          }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full" />
        </motion.div>
      </div>

      {/* Main button */}
      <motion.button
        onClick={handleMoodClick}
        className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gray-100 dark:bg-gray-800 rounded-full flex flex-col items-center justify-center transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1.5,
        }}
        aria-label="Check your mood"
        tabIndex={0}
      >
        {/* <div className="text-4xl mb-2">✨</div> */}
        <span className="text-black dark:text-gray-300 font-medium text-center text-lg sm:text-xl md:text-2xl mb-2">
          How are you feeling?
        </span>
        {/* <div className="today-sublabel text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base text-center">
          Touch to reflect on today
        </div> */}
      </motion.button>
    </div>
  );
};

export default MoodCheck;
