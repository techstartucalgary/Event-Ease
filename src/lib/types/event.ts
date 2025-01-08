import { BaseModel, EntityType } from ".";

export type NewEvent = {
  name: string;
  description: string;
  creator: string;
  creatorType: EntityType;
  location: string;
  participants: string[];
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
};

export type BulkEventDataToUpdate = {
  name?: string;
  description?: string;
  location?: string;
  status?: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
};

export type EventSchemaType = BaseModel & NewEvent;
