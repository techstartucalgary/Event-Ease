import { BaseModel, EntityType } from ".";

export type NewEvent = {
  name: string;
  description: string;
  creator: string;
  creatorType: EntityType;
  location: string;
  startDate: Date;
  endDate: Date;
};

export type BulkEventDataToUpdate = {
  name?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
};

export type EventSchemaType = BaseModel & NewEvent;
