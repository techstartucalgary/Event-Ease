"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard"; // Ensure the path is correct
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchEventsAction } from "@/lib/server/actions/event";
import { useFilters } from "@/contexts/FilterContext";

const LIMIT = 6; // Number of events per page

export default function ExploreEvents() {
    const [searchTerm, setSearchTerm] = useState("");
    const { filters, isFiltersApplied } = useFilters();

    // Use infinite query to fetch events
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
        queryKey: ["events", searchTerm, filters, isFiltersApplied],
        queryFn: async ({ pageParam = 1 }) => {
            return searchEventsAction({
                searchTerm,
                page: pageParam,
                limit: LIMIT,
                date: filters.date,
                sort: filters.sort,
                priceRange: filters.priceRange,
                categories: filters.categories,
            });
        },
        getNextPageParam: (lastPage, allPages) => {
            // If the last page has fewer items than the limit, there are no more pages
            return lastPage.length < LIMIT ? undefined : allPages.length + 1;
        },
        initialPageParam: 1,
    });

    // Flatten the pages array to get all events
    const events = data?.pages.flat() || [];

    return (
        <div className="max-w-[90%] mx-auto py-6 px-4 md:px-8 lg:px-16">
            {/* Title + search*/}
            <div className="w-full max-w-[1200px] mx-auto">
                <h1 className="text-3xl font-bold text-[#523D35] mb-4">
                    Explore Events
                </h1>
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#523D35]"
                    />
                    <svg
                        className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Events grid */}
            <div className="flex flex-wrap justify-center gap-6">
                {status === "pending" ? (
                    <div className="text-center py-10">Loading events...</div>
                ) : status === "error" ? (
                    <div className="text-center py-10 text-red-500">
                        Error loading events: {error.message}
                    </div>
                ) : events.length > 0 ? (
                    events.map((event) => (
                        <div
                            key={event._id}
                            className="w-full max-w-[350px] flex justify-center"
                        >
                            <EventCard
                                image={event.images[0]}
                                name={event.name}
                                description={event.description}
                                tags={[]} // Empty array since tags don't exist in the model
                                link={`/events/${event._id}`}
                            />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">No events found</div>
                )}
            </div>

            {/* Load more button */}
            {hasNextPage && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-[#523D35] text-white px-6 py-2 rounded-lg hover:bg-[#3a2b26] transition disabled:opacity-50"
                    >
                        {isFetchingNextPage
                            ? "Loading more..."
                            : "Load more events"}
                    </button>
                </div>
            )}
        </div>
    );
}
