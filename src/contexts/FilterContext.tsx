"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
    filters: {
        date: Date | null;
        sort: "asc" | "desc";
        priceRange: [number, number]; // [min, max] - max can be Infinity
        categories: string[];
    };
    setFilters: (filters: Partial<FilterContextType["filters"]>) => void;
    applyFilters: () => void;
    isFiltersApplied: boolean;
};

// Use a very high number for "unlimited" max price
// We use a large number instead of Infinity to avoid potential issues with JSON serialization
const MAX_PRICE = 1000000;

const defaultFilters: FilterContextType["filters"] = {
    date: null,
    sort: "asc",
    priceRange: [0, MAX_PRICE],
    categories: [],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [filters, setFiltersState] = useState(defaultFilters);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);

    const setFilters = (newFilters: Partial<FilterContextType["filters"]>) => {
        setFiltersState((prev) => ({ ...prev, ...newFilters }));
    };

    const applyFilters = () => {
        setIsFiltersApplied(true);
    };

    return (
        <FilterContext.Provider
            value={{
                filters,
                setFilters,
                applyFilters,
                isFiltersApplied,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return context;
}

// Export the MAX_PRICE constant for use in other components
export { MAX_PRICE };
