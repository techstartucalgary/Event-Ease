import { Model, Schema } from "mongoose";
import { EventSchemaType } from "@/lib/types/event";
import { entityTypes } from "@/lib/helpers";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";

const EventSchema = new Schema<EventSchemaType>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true,
        refPath: "creatorType"
    },
    creatorType: {
        type: String,
        required: true,
        enum: entityTypes
    }
}, { collection: "Events", timestamps: true, versionKey: false })

export const EventModel = (DATABASE_CONNECTION.models.Event as Model<EventSchemaType>)
    || DATABASE_CONNECTION.model<EventSchemaType>("Event", EventSchema)