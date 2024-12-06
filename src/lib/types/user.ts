import { BaseModel } from ".";

export type NewUser = {
    name: string,
    email: string,
    clerkId: string
}

export type UserSchemaType = BaseModel & NewUser;