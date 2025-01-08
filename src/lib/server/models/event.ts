import { Model, Schema } from "mongoose";
import {
  BulkEventDataToUpdate,
  EventSchemaType,
  NewEvent,
} from "@/lib/types/event";
import { entityTypes } from "@/lib/helpers";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";
import * as yup from "yup";
import { getStringSchema } from "@/lib/helpers";

const EventSchema = new Schema<EventSchemaType>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
      refPath: "creatorType",
    },
    creatorType: {
      type: String,
      required: true,
      enum: entityTypes,
    },
    location: {
      type: String,
      required: true,
    },
    participants: {
      type: [
        {
          type: String,
          ref: "User",
        },
      ],
      required: false,
      default: [],
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      required: true,
      default: "Upcoming",
    },
  },
  { collection: "Events", timestamps: true, versionKey: false }
);

export function validateNewEventData(params: NewEvent) {
  // Validate the provided params for creating a new event
  const { name, description, creator, creatorType, location } = params;

  const schema = yup.object().shape({
    name: getStringSchema({ message: "Event name is required" }),
    description: getStringSchema({ message: "Event description is required" }),
    creator: getStringSchema({ message: "Creator ID is required" }),
    creatorType: yup
      .string()
      .oneOf(entityTypes, "Invalid creator type")
      .required("Creator type is required"),
    location: getStringSchema({ message: "Location is required" }),
  });

  return schema.validateSync({
    name,
    description,
    creator,
    creatorType,
    location,
  }) as NewEvent;
}

export function validateEventUpdates(data: BulkEventDataToUpdate) {
  // Validate the provided params for updating an event
  const schema = yup.object().shape({
    name: getStringSchema({ required: false }),
    description: getStringSchema({ required: false }),
    location: getStringSchema({ required: false }),
    status: yup
      .string()
      .oneOf(
        ["Upcoming", "Ongoing", "Completed", "Cancelled"],
        "Invalid status"
      ),
  });

  return schema.validateSync(data, { stripUnknown: true });
}

export const EventModel =
  (DATABASE_CONNECTION.models.Event as Model<EventSchemaType>) ||
  DATABASE_CONNECTION.model<EventSchemaType>("Event", EventSchema);
