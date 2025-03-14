"use server";

import { processError } from "@/lib/helpers";
import { updateEvent, fetchFilteredEvents } from "@/lib/server/helpers/event";
import { BulkEventDataToUpdate } from "@/lib/types/event";
import { MAX_PRICE } from "@/contexts/FilterContext";

export async function updateEventAction(
    id: string,
    data: BulkEventDataToUpdate
) {
    try {
        await updateEvent(id, data);
    } catch (error) {
        console.error(error);
        processError(error);
    }
}

type SearchEventsArgs = {
    searchTerm: string;
    page: number;
    limit: number;
    date?: Date | null;
    sort?: "asc" | "desc";
    priceRange?: [number, number];
    categories?: string[];
};

export async function searchEventsAction({
    searchTerm,
    page,
    limit,
    date,
    sort,
    priceRange,
}: // TODO: add categories
SearchEventsArgs) {
    try {
        // Convert our filter parameters to what the backend expects
        const sortParam = sort
            ? ({ name: sort === "asc" ? "ascending" : "descending" } as {
                  [key: string]: "ascending" | "descending";
              })
            : undefined;

        // For now, we'll use the date as both start and end date if provided
        const startDate = date || undefined;

        // Handle price range - if max price is our special MAX_PRICE value,
        // we'll only filter by min price
        let priceRangeFilter;
        if (priceRange) {
            if (priceRange[1] === MAX_PRICE) {
                // Only filter by minimum price
                priceRangeFilter = { min: priceRange[0] };
            } else {
                // Filter by both min and max
                priceRangeFilter = { min: priceRange[0], max: priceRange[1] };
            }
        }

        const events = await fetchFilteredEvents({
            searchTerm,
            page: page - 1,
            limit,
            sortParam,
            startDate,
            priceRange: priceRangeFilter,
            // We'll add categories filtering to the backend later
        });

        return events;
    } catch (error) {
        console.error(error);
        processError(error);
        return [];
    }
}
