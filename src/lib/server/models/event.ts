import { Model, Schema } from "mongoose";
import {
    BulkEventDataToUpdate,
    EventSchemaType,
    NewEvent,
} from "@/lib/types/event";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";
import * as yup from "yup";
import { getStringSchema } from "@/lib/helpers";
import { ObjectId } from "mongodb";

const EventSchema = new Schema<EventSchemaType>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Organization",
    },
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    tickets: {
        type: [
            {
                type: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],
        default: [],
    },
}, { collection: "Events", timestamps: true, versionKey: false });

export function validateNewEventData(params: NewEvent) {
    // Validate the provided params for creating a new event
    const {
        name,
        description,
        images,
        creator,
        tags,
        tickets,
        location,
        startDate,
        endDate,
    } = params;

    const schema = yup.object().shape({
        name: getStringSchema({ message: "Event name is required" }),
        description: getStringSchema({
            message: "Event description is required",
        }),
        images: yup.array().of(yup.string()).required("Images are required"),
        creator: getStringSchema({ message: "Creator ID is required" }),
        location: getStringSchema({ message: "Location is required" }),
        tags: yup.array().of(yup.string()).required("Tags are required"),
        startDate: yup.date().required("Start date is required"),
        endDate: yup
            .date()
            .min(yup.ref("startDate"), "End date must be after start date")
            .required("End date is required"),
        tickets: yup
            .array()
            .of(
                yup.object({
                    type: yup.string().required("Ticket type is required"),
                    quantity: yup
                        .number()
                        .min(0, "Quantity must be at least 0")
                        .required("Ticket quantity is required"),
                    price: yup
                        .number()
                        .min(0, "Price must be at least 0")
                        .required("Ticket price is required"),
                })
            )
            .optional(), // Optional in case not every event has tickets
    });

    return schema.validateSync({
        name,
        description,
        images,
        creator: new ObjectId(creator),
        tags,
        tickets,
        location,
        startDate,
        endDate,
    });
}

export function validateEventUpdates(data: BulkEventDataToUpdate) {
    // Validate the provided params for updating an event
    const schema = yup.object().shape({
        name: getStringSchema({ required: false }),
        description: getStringSchema({ required: false }),
        location: getStringSchema({ required: false }),
        startDate: yup.date().optional(),
        endDate: yup
            .date()
            .min(yup.ref("startDate"), "End date must be after start date")
            .optional(),
        tickets: yup
            .array()
            .of(
                yup.object({
                    type: yup.string().required(),
                    quantity: yup.number().min(0).required(),
                    price: yup.number().min(0).required(),
                })
            )
            .optional(),
    });

    return schema.validateSync(data, { stripUnknown: true });
}

export const EventModel =
    (DATABASE_CONNECTION.models.Event as Model<EventSchemaType>) ||
    DATABASE_CONNECTION.model<EventSchemaType>("Event", EventSchema);