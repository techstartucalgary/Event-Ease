"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useAppContext from "@/hooks/useAppContext";

export default function NotFound() {
    const { navigateToPage } = useAppContext();

    return (
        <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-[#f8f8f5] to-white">
            <div className="text-center max-w-xl">
                {/* 404 Text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl font-bold text-[#768A96]">404</h1>
                </motion.div>

                {/* Error Message */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl font-bold text-[#2D3436] mb-4"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-600 mb-8 text-lg"
                >
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={() => navigateToPage("/")}
                        className="px-6 py-3 bg-[#768a96] text-white rounded-lg hover:bg-[#627885] transition-colors"
                    >
                        Back to Home
                    </button>

                    <Link href="/events">
                        <button className="px-6 py-3 border border-[#768a96] text-[#768a96] rounded-lg hover:bg-[#f8f8f5] transition-colors">
                            Explore Events
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
