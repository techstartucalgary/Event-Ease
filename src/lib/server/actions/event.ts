'use server'

import { processError } from "@/lib/helpers";
import { updateEvent, fetchFilteredEvents } from "@/lib/server/helpers/event";
import { BulkEventDataToUpdate } from "@/lib/types/event";

export async function updateEventAction(id: string, data: BulkEventDataToUpdate) {
    try {
        await updateEvent(id, data);
    } catch (error) {
        console.error(error);
        processError(error);
    }
}

type SearchEventsArgs = {
    searchTerm: string,
    page: number,
    limit: number
};

export async function searchEventsAction({ searchTerm, page, limit }: SearchEventsArgs) {
    try {
        const events = await fetchFilteredEvents({
            searchTerm,
            page: page - 1,
            limit
        });
        console.log("events", events, page, limit);
        return events;
    } catch (error) {
        console.error(error);
        processError(error);
        return [];
    }
}