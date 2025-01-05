import { cloudFolders, entityTypes } from "../helpers";

export type BaseEntity = {
    _id: string
}

export type ModelTimestamps = {
    createdAt: Date,
    updatedAt: Date
}

export type ModelTimestamp = keyof ModelTimestamps;

export type BaseModel = BaseEntity & ModelTimestamps;

export type EntityType = typeof entityTypes[number];

export type Error = {
    message: string
}

export type CloudFolder = typeof cloudFolders[number];

export type RequestParam = {
    params: Promise<{ id: string }>
}