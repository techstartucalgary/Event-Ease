"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Left() {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const categories = [
        "Technology",
        "Business",
        "Entertainment",
        "Sports",
        "Education",
    ];

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="w-full md:w-72 bg-tertiary md:h-screen p-6 text-accent shadow-xl">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold mb-6"
            >
                Filters
            </motion.h2>

            {/* Date Filter */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
            >
                <label className="text-sm font-medium">Date</label>
                <input
                    type="date"
                    className="mt-1.5 transition-all duration-200 hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent"
                />
            </motion.div>

            {/* Alphabetical Sort */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
            >
                <label className="text-sm font-medium">Sort</label>
                <select className="mt-1.5 transition-all duration-200 hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent">
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                </select>
            </motion.div>

            {/* Price Range Slider */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
            >
                <label className="text-sm font-medium">Price Range</label>
                <div className="flex items-center gap-4 mb-2 mt-1.5">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span>-</span>
                    <span className="text-sm">${priceRange[1]}</span>
                </div>
                <div className="relative h-1 mt-3">
                    <div className="absolute w-full h-1 bg-surface/50 rounded-full"></div>
                    <div
                        className="absolute h-1 bg-accent rounded-full"
                        style={{
                            left: `${(priceRange[0] / 1000) * 100}%`,
                            right: `${100 - (priceRange[1] / 1000) * 100}%`,
                        }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) =>
                            setPriceRange([
                                Math.min(
                                    parseInt(e.target.value),
                                    priceRange[1] - 1
                                ),
                                priceRange[1],
                            ])
                        }
                        className="range-input z-20"
                    />
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                            setPriceRange([
                                priceRange[0],
                                Math.max(
                                    parseInt(e.target.value),
                                    priceRange[0] + 1
                                ),
                            ])
                        }
                        className="range-input z-20"
                    />
                </div>
            </motion.div>

            {/* Categories */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
            >
                <label className="text-sm font-medium mb-2">Categories</label>
                <div className="space-y-1.5 mt-1.5">
                    {categories.map((category) => (
                        <motion.div
                            key={category}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <label className="flex items-center gap-3 cursor-pointer p-1.5 rounded-lg transition-colors hover:bg-surface/30">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        category
                                    )}
                                    onChange={() =>
                                        handleCategoryToggle(category)
                                    }
                                    className="rounded-md"
                                />
                                <span className="text-sm">{category}</span>
                            </label>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Apply Filters Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent text-surface font-medium py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
            >
                Apply Filters
            </motion.button>
        </div>
    );
}
