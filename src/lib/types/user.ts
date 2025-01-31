import { BaseEntity, BaseModel } from ".";

type DefaultFields = {
    intro?: string,
    phoneNumber?: string,
    picture?: string,
    pushTokens: string[],
    savedEvents: string[],
    organizations?: string[],
}

export type NewUser = {
    name: string,
    username: string,
    email: string,
    clerkId: string
}

export type UserSchemaType = BaseModel & NewUser & DefaultFields;

export type BulkUserDataToUpdate = {
    name?: string,
    intro?: string,
    phoneNumber?: string,
    picture?: string,
    organizations?: string[],
}

export type IdAndOptionalPicture = BaseEntity & {
    picture?: string;
}

export type SessionUser = {
    id: string,
    email: string,
    picture?: string,
    fullName: string,
    username: string
}