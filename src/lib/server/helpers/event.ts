import { Event } from "@/lib/server/models";
import { EventUpdateType } from "@/lib/types/event";

export async function getAllEvents() {
    return await (await Event).find({});
}

export async function getEventById(id: string) {
    return await (await Event).findById(id);
}

export async function updateEvent(id: string, data: EventUpdateType) {
    await (await Event).findByIdAndUpdate(id, data);
}