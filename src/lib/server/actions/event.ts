'use server'

import { updateEvent } from "@/lib/server/helpers/event";

export async function updateEventAction(id: string, data: any) {
    try {
        await updateEvent(id, data);
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}