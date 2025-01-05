import { BaseEntity, BaseModel } from ".";

type DefaultFields = {
    intro?: string,
    phoneNumber?: string,
    picture?: string,
    pushTokens: string[],
    savedEvents: string[],
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
    picture?: string
}

export type IdAndOptionalPicture = BaseEntity & {
    picture?: string;
}