"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Left from "./Left";
import Right from "./Right";
import { FilterProvider } from "@/contexts/FilterContext";

export default function Explore() {
    const [showFilters, setShowFilters] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // This ensures that if we close the filters on mobile and change screen size, the filters will open again
    useEffect(() => {
        // Set initial value
        setIsDesktop(window.innerWidth >= 768);

        // Handle resize
        const handleResize = () => {
            const isDesktopView = window.innerWidth >= 768;
            setIsDesktop(isDesktopView);
            if (isDesktopView) {
                setShowFilters(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <FilterProvider>
            <div className="relative min-h-screen">
                {/* Mobile Filter Toggle Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="fixed bottom-4 right-4 z-50 md:hidden bg-surface text-accent px-4 py-2 rounded-full shadow-lg"
                >
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                <div className="flex flex-col md:flex-row w-full">
                    {/* Filters Section */}
                    <AnimatePresence mode="wait">
                        {(showFilters || isDesktop) && (
                            <motion.div
                                className="md:sticky md:top-0 md:h-screen flex-shrink-0"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Left />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <Right />
                    </div>
                </div>
            </div>
        </FilterProvider>
    );
}
