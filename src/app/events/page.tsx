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
                    className="fixed bottom-6 right-6 z-50 md:hidden bg-surface text-accent p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    aria-label={showFilters ? "Hide Filters" : "Show Filters"}
                >
                    <i className="fas fa-filter text-xl"></i>
                </button>

                <div className="flex flex-col md:flex-row w-full">
                    {/* Filters Section - Desktop */}
                    <AnimatePresence mode="wait">
                        {isDesktop && (
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

                {/* Mobile Filters Overlay */}
                <AnimatePresence>
                    {showFilters && !isDesktop && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowFilters(false)}
                            />

                            {/* Filter Panel */}
                            <motion.div
                                className="fixed bottom-0 left-0 right-0 z-50 md:hidden max-h-[90vh] overflow-y-auto rounded-t-xl bg-tertiary"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 300,
                                }}
                            >
                                <div className="bg-tertiary w-full py-2 px-4 flex justify-between items-center sticky top-0 z-10">
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="p-2 text-accent hover:text-accent/80 transition-colors"
                                        aria-label="Close filters"
                                    >
                                        <i className="fas fa-times text-lg"></i>
                                    </button>
                                    <div className="w-16 h-1 bg-accent/30 rounded-full" />
                                    <div className="w-8"></div>{" "}
                                    {/* Spacer for balance */}
                                </div>
                                <div className="p-4">
                                    <Left />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </FilterProvider>
    );
}
