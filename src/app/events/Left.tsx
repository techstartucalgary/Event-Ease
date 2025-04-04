"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAppContext from "@/hooks/useAppContext";
import { useFilters, MAX_PRICE } from "@/contexts/FilterContext";

// Define the form schema
const filterSchema = yup.object({
    date: yup.date().nullable(),
    sort: yup.string().oneOf(["asc", "desc"]).default("asc"),
    priceRange: yup.array().of(yup.number()).length(2),
    categories: yup.array().of(yup.string()),
});

type FilterFormValues = yup.InferType<typeof filterSchema>;

export default function Left() {
    const { refreshPage } = useAppContext();
    const { setFilters, applyFilters, filters: contextFilters } = useFilters();
    const [priceRange, setPriceRange] = useState(contextFilters.priceRange);
    const [isMaxPriceUnlimited, setIsMaxPriceUnlimited] = useState(
        contextFilters.priceRange[1] === MAX_PRICE
    );

    const categories = [
        "Technology",
        "Business",
        "Entertainment",
        "Sports",
        "Education",
    ];

    // Initialize React Hook Form
    const { control, handleSubmit, watch, setValue } =
        useForm<FilterFormValues>({
            resolver: yupResolver(filterSchema),
            defaultValues: {
                date: contextFilters.date,
                sort: contextFilters.sort,
                priceRange: contextFilters.priceRange,
                categories: contextFilters.categories,
            },
        });

    // Watch selected categories for UI updates
    const selectedCategories = watch("categories") || [];

    const handleCategoryToggle = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        setValue("categories", updatedCategories);
    };

    const handleUnlimitedMaxPrice = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = e.target.checked;
        setIsMaxPriceUnlimited(isChecked);

        if (isChecked) {
            // Set to unlimited
            const newValue = [priceRange[0], MAX_PRICE] as [number, number];
            setPriceRange(newValue);
            setValue("priceRange", newValue);
        } else {
            // Set to a default max (e.g., 1000)
            const newValue = [priceRange[0], 1000] as [number, number];
            setPriceRange(newValue);
            setValue("priceRange", newValue);
        }
    };

    const onSubmit = (data: FilterFormValues) => {
        // Update the filter context with the form data
        setFilters({
            date: data.date,
            sort: data.sort as "asc" | "desc",
            priceRange: data.priceRange as [number, number],
            categories: Array.isArray(data.categories)
                ? (data.categories.filter(Boolean) as string[])
                : [],
        });

        // Apply the filters
        applyFilters();

        // Refresh the page to trigger a re-fetch with the new filters
        refreshPage();
    };

    return (
        <div className="w-full md:w-72 bg-tertiary md:h-screen p-6 max-md:px-6 text-accent md:shadow-xl">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold mb-6"
            >
                Filters
            </motion.h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Date Filter */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <label className="text-sm font-medium">Date</label>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="date"
                                className="mt-1.5 transition-all duration-200 hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent"
                                onChange={(e) => {
                                    const value = e.target.value
                                        ? new Date(e.target.value)
                                        : null;
                                    field.onChange(value);
                                }}
                                value={
                                    field.value
                                        ? new Date(field.value)
                                              .toISOString()
                                              .split("T")[0]
                                        : ""
                                }
                            />
                        )}
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
                    <Controller
                        name="sort"
                        control={control}
                        render={({ field }) => (
                            <select
                                className="mt-1.5 transition-all duration-200 hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent"
                                {...field}
                            >
                                <option value="asc">A to Z</option>
                                <option value="desc">Z to A</option>
                            </select>
                        )}
                    />
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
                        <span className="text-sm">
                            {isMaxPriceUnlimited ? "∞" : `$${priceRange[1]}`}
                        </span>
                    </div>

                    {/* Unlimited max price toggle */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 mb-3"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                handleUnlimitedMaxPrice({
                                    target: { checked: !isMaxPriceUnlimited },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            className="flex items-center justify-between w-full p-1.5 rounded-lg transition-colors hover:bg-surface/30"
                        >
                            <span className="text-sm">No maximum price</span>
                            <div
                                className={`relative w-10 h-5 rounded-full transition-colors ${
                                    isMaxPriceUnlimited
                                        ? "bg-green-500"
                                        : "bg-surface"
                                }`}
                            >
                                <div
                                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                        isMaxPriceUnlimited
                                            ? "transform translate-x-5"
                                            : ""
                                    }`}
                                />
                            </div>
                        </button>
                    </motion.div>

                    <div className="relative h-1 mt-3">
                        <div className="absolute w-full h-1 bg-surface/50 rounded-full"></div>
                        <div
                            className="absolute h-1 bg-accent rounded-full"
                            style={{
                                left: `${(priceRange[0] / 1000) * 100}%`,
                                right: isMaxPriceUnlimited
                                    ? "0%"
                                    : `${100 - (priceRange[1] / 1000) * 100}%`,
                            }}
                        />
                        <Controller
                            name="priceRange"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[0]}
                                        onChange={(e) => {
                                            const newValue = [
                                                Math.min(
                                                    parseInt(e.target.value),
                                                    isMaxPriceUnlimited
                                                        ? 1000
                                                        : priceRange[1] - 1
                                                ),
                                                priceRange[1],
                                            ] as [number, number];
                                            setPriceRange(newValue);
                                            field.onChange(newValue);
                                        }}
                                        className="range-input z-20"
                                    />
                                    {!isMaxPriceUnlimited && (
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            value={Math.min(
                                                priceRange[1],
                                                1000
                                            )}
                                            onChange={(e) => {
                                                const newValue = [
                                                    priceRange[0],
                                                    Math.max(
                                                        parseInt(
                                                            e.target.value
                                                        ),
                                                        priceRange[0] + 1
                                                    ),
                                                ] as [number, number];
                                                setPriceRange(newValue);
                                                field.onChange(newValue);
                                            }}
                                            className="range-input z-20"
                                        />
                                    )}
                                </>
                            )}
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
                    <label className="text-sm font-medium mb-2">
                        Categories
                    </label>
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
                    type="submit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent text-surface font-medium py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                    Apply Filters
                </motion.button>
            </form>
        </div>
    );
}
