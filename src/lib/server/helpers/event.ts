import { Event } from "@/lib/server/models";
import {
    parseToJSON,
    processError,
    logError,
    prefixWithCloudUrl,
} from "@/lib/helpers";
import {
    NewEvent,
    BulkEventDataToUpdate,
    EventSchemaType,
    PopulatedEvent,
} from "@/lib/types/event";
import {
    validateNewEventData,
    validateEventUpdates,
} from "@/lib/server/models/event";
import { SortOrder, UpdateQuery, FilterQuery } from "mongoose";
import { PopulatedOrganization } from "@/lib/types/organization";
import { populatedOrganizationFields } from "./organization";

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

function sanitizeEventObject(
    event: EventSchemaType | PopulatedEvent
) {
    const { images, creator, ...rest } = parseToJSON(event);

    return {
        ...rest,
        creator: {
            ...creator,
            picture: prefixWithCloudUrl("Organizations", `${creator._id}/${(creator as PopulatedOrganization).picture}`),
        },
        images: images.map((image) =>
            prefixWithCloudUrl("Events", `${event._id}/${image}`)
        ),
    };
}

export async function getAllEvents() {
    try {
        const events = await (await Event)
            .find()
            .populate<{ creator: PopulatedOrganization }>("creator", populatedOrganizationFields.join(" "))
            .lean();
        return events.map(sanitizeEventObject) as PopulatedEvent[];
    } catch (error) {
        logError("Error getting all events", error);
        processError(error);
        return [];
    }
}

export async function getEventById(
    eventId: string
) {
    try {
        const event = await (await Event)
            .findById(eventId)
            .populate<{ creator: PopulatedOrganization }>("creator", populatedOrganizationFields.join(" "))
            .lean();
        return event ? sanitizeEventObject(event) as PopulatedEvent : null;
    } catch (error) {
        logError("Error getting event by ID", error);
        return null;
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

type FetchFilteredEventsArgs = {
    searchTerm?: string;
    creatorId?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit: number;
    sortParam?: { [key: string]: SortOrder };
    priceRange?: { min: number; max?: number };
    categories?: string[];
};

export async function fetchFilteredEvents({
    searchTerm,
    creatorId,
    startDate,
    endDate,
    page = 0,
    limit,
    sortParam = { startDate: "ascending" },
}: // TODO: add priceRange and categories
    FetchFilteredEventsArgs): Promise<PopulatedEvent[]> {
    try {
        const query: FilterQuery<EventSchemaType> = {};

        if (creatorId) {
            query.creator = creatorId;
        }

        if (startDate && endDate) {
            query.startDate = { $gte: startDate };
            query.endDate = { $lte: endDate };
        } else if (startDate) {
            query.startDate = { $gte: startDate };
        } else if (endDate) {
            query.endDate = { $lte: endDate };
        }

        if (!!searchTerm) {
            const theKey = sortParam ? Object.keys(sortParam)[0] : "startDate";
            const sort = sortParam
                ? { [theKey]: sortParam[theKey] === "ascending" ? 1 : -1 }
                : { startDate: 1 };

            return (
                await (
                    await Event
                ).aggregate([
                    {
                        $search: {
                            index: "events_search_index",
                            text: {
                                query: searchTerm,
                                path: ["name", "description"],
                                fuzzy: {
                                    maxEdits: 2,
                                    prefixLength: 0,
                                    maxExpansions: 50,
                                },
                            },
                            returnStoredSource: true,
                        },
                    },
                    { $match: query },
                    { $addFields: { creatorId: { $toObjectId: "$creator" } } },
                    {
                        $lookup: {
                            from: "Organizations",
                            let: { creatorId: "$creatorId" },

                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$creatorId"] } } },
                                {
                                    $project: {
                                        _id: 1,
                                        name: 1,
                                        picture: 1,
                                        email: 1,
                                        phoneNumber: 1
                                    }
                                },
                            ],
                            as: "creator",
                        }
                    },
                    { $sort: sort as { [key: string]: 1 | -1 } },
                    { $skip: page * limit },
                    { $limit: limit },
                ])
            ).map(sanitizeEventObject) as PopulatedEvent[];
        }

        const events = await (
            await Event
        )
            .find(query)
            .populate<{ creator: PopulatedOrganization }>("creator", populatedOrganizationFields.join(" "))
            .sort(sortParam)
            .skip(page * limit)
            .limit(limit)
            .lean();

        return events.map(sanitizeEventObject) as PopulatedEvent[];
    } catch (error) {
        logError("Error fetching filtered events", error);
        processError(error);
        return [];
    }
}

// export async function getEventsByDateRange(
//   startDate: Date,
//   endDate: Date
// ): Promise<EventSchemaType[]> {
//   try {
//     const events = await (
//       await Event
//     )
//       .find({
//         startDate: { $gte: startDate },
//         endDate: { $lte: endDate },
//       })
//       .lean();
//     return events.map(sanitizeEventObject);
//   } catch (error) {
//     logError("Error fetching events by date range", error);
//     return [];
//   }
// }

// export async function getEventsByCreator(
//   creatorId: string
// ): Promise<EventSchemaType[]> {
//   try {
//     const events = await (await Event).find({ creator: creatorId }).lean();
//     return events.map(sanitizeEventObject);
//   } catch (error) {
//     logError("Error fetching events by creator", error);
//     return [];
//   }
// }

// type SearchEventsPaginatedArgs = {
//   searchTerm: string;
//   page: number;
//   limit: number;
//   sortParam?: { [key: string]: SortOrder };
// };

// export async function searchEventsPaginated({
//   searchTerm,
//   page,
//   limit,
//   sortParam = { startDate: "ascending" },
// }: SearchEventsPaginatedArgs): Promise<EventSchemaType[]> {
//   try {
//     const events = await (
//       await Event
//     )
//       .find({ name: { $regex: getSearchRegex(searchTerm) } })
//       .sort(sortParam)
//       .skip(page * limit)
//       .limit(limit)
//       .lean();

//     return events.map(sanitizeEventObject);
//   } catch (error) {
//     console.error("Error searching events", error);
//     processError(error);
//     return [];
//   }
// }
