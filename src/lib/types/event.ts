import { ObjectId } from "mongodb";
import { BaseModel } from ".";
import { PopulatedOrganization } from "./organization";

export type Ticket = {
    type: string;
    quantity: number;
    price: number;
};

export type NewEvent = {
    name: string;
    description: string;
    images: string[];
    creator: string;
    location: string;
    startDate: Date;
    endDate: Date;
    tags: string[];
    tickets?: Ticket[];
};

export type BulkEventDataToUpdate = {
    name?: string;
    description?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    tickets?: Ticket[];
};

export type EventSchemaType = BaseModel & Omit<NewEvent, 'creator'> & {
    creator: ObjectId
};

export type PopulatedEvent = Omit<EventSchemaType, 'creator'> & { creator: PopulatedOrganization }