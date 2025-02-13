'use server'

import { processError } from "@/lib/helpers";
import { updateEvent } from "@/lib/server/helpers/event";
import { BulkEventDataToUpdate } from "@/lib/types/event";

export async function updateEventAction(id: string, data: BulkEventDataToUpdate) {
    try {
        await updateEvent(id, data);
    } catch (error) {
        console.error(error);
        processError(error);
    }
}