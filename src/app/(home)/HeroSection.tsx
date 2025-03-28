"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <div className="HeroSection gradient-bg h-96 max-md:h-[30rem] flex flex-col items-center justify-center text-white text-center px-4">
            {/* Main Title with animation */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
            >
                Welcome to EventEase
            </motion.h1>

            {/* Subtitle with animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-2"
            >
                <p className="text-xl md:text-2xl font-light opacity-90">
                    Your event, one platform
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4 mt-6"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-white to-[#e2e8f0] text-[#101e2e] rounded-full 
                              font-semibold text-lg transition-all duration-300
                              hover:bg-opacity-90
                              border border-white/20 shadow-lg hover:shadow-xl"
                >
                    Get Started
                </motion.button>

                <Link href="/events">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-full 
                                  font-semibold text-lg transition-all duration-300
                                  hover:bg-opacity-90
                                  border border-white/10 shadow-lg hover:shadow-xl"
                    >
                        Explore Events
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
