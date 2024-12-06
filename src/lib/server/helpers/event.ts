import { Event } from "@/lib/server/models";

export async function getAllEvents() {
    return await (await Event).find({});
}

export async function getEventById(id: string) {
    return await (await Event).findById(id);
}

export async function updateEvent(id: string, data: any) {
    await (await Event).findByIdAndUpdate(id, data);
}