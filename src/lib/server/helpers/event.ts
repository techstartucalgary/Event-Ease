import { Event } from "@/lib/server/models";
import {
  parseToJSON,
  processError,
  logError,
  getSearchRegex,
} from "@/lib/helpers";
import {
  NewEvent,
  BulkEventDataToUpdate,
  EventSchemaType,
} from "@/lib/types/event";
import {
  validateNewEventData,
  validateEventUpdates,
} from "@/lib/server/models/event";
import { SortOrder, UpdateQuery } from "mongoose";

export async function createEvent(data: NewEvent) {
  try {
    const event = await (await Event).create(validateNewEventData(data));
    return parseToJSON(event);
  } catch (error) {
    console.error("Error creating event", error);
    processError(error);
  }
}

export async function updateEvent(
  eventId: string,
  newData: BulkEventDataToUpdate
): Promise<EventSchemaType | null> {
  try {
    const validatedData = validateEventUpdates(newData);

    const updates = {} as UpdateQuery<EventSchemaType>;

    Object.entries(validatedData).forEach(([key, value]) => {
      if (value !== undefined) {
        updates[key] = value;
      }
    });

    if (Object.keys(updates).length > 0) {
      updates.updatedAt = new Date();
      const updatedEvent = await (
        await Event
      ).findByIdAndUpdate(
        eventId,
        { $set: updates },
        { new: true, lean: true }
      );
      return updatedEvent;
    }

    return null;
  } catch (error) {
    console.error("Error updating event", error);
    processError(error);
    return null;
  }
}

function sanitizeEventObject<T extends EventSchemaType>(event: T): T {
  const status =
    event.startDate && event.endDate
      ? new Date() < event.startDate
        ? "Upcoming"
        : new Date() > event.endDate
        ? "Completed"
        : "Ongoing"
      : "Unknown";

  return {
    ...parseToJSON(event),
    status,
  };
}

export async function getEventById(
  eventId: string
): Promise<EventSchemaType | null> {
  try {
    const event = await (await Event).findById(eventId).lean();
    return event ? sanitizeEventObject(event) : null;
  } catch (error) {
    logError("Error getting event by ID", error);
    return null;
  }
}

export async function getAllEvents() {
  try {
    return (await (await Event).find().lean()).map(sanitizeEventObject);
  } catch (error) {
    console.error("Error fetching all events", error);
    processError(error);
  }
}

export async function getEventsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<EventSchemaType[]> {
  try {
    const events = await (
      await Event
    )
      .find({
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
      })
      .lean();
    return events.map(sanitizeEventObject);
  } catch (error) {
    logError("Error fetching events by date range", error);
    return [];
  }
}

export async function getEventsByCreator(
  creatorId: string
): Promise<EventSchemaType[]> {
  try {
    const events = await (await Event).find({ creator: creatorId }).lean();
    return events.map(sanitizeEventObject);
  } catch (error) {
    logError("Error fetching events by creator", error);
    return [];
  }
}

export async function fetchEvents(
  eventIds: string[]
): Promise<EventSchemaType[]> {
  try {
    return (
      await (
        await Event
      )
        .find({ _id: { $in: eventIds } })
        .sort({ startDate: "ascending" })
        .lean()
    ).map(sanitizeEventObject);
  } catch (error) {
    console.error("Error fetching events", error);
    processError(error);
    return [];
  }
}

type SearchEventsPaginatedArgs = {
  searchTerm: string;
  page: number;
  limit: number;
  sortParam?: { [key: string]: SortOrder };
};

export async function searchEventsPaginated({
  searchTerm,
  page,
  limit,
  sortParam = { startDate: "ascending" },
}: SearchEventsPaginatedArgs): Promise<EventSchemaType[]> {
  try {
    const events = await (
      await Event
    )
      .find({ name: { $regex: getSearchRegex(searchTerm) } })
      .sort(sortParam)
      .skip(page * limit)
      .limit(limit)
      .lean();

    return events.map(sanitizeEventObject);
  } catch (error) {
    console.error("Error searching events", error);
    processError(error);
    return [];
  }
}

export async function deleteEventById(eventId: string): Promise<boolean> {
  try {
    const result = await (await Event).findByIdAndDelete(eventId);
    return !!result;
  } catch (error) {
    logError("Error deleting event by ID", error);
    return false;
  }
}
