import { BaseModel } from ".";

type DefaultFields = {
    pushTokens: string[]
}

export type NewOrganization = {
    _id: string,
    name: string,
    username: string,
    email: string,
    clerkId: string,
    phoneNumber: string,
    description: string,
    picture: string,
    stripeId: string
}

export type BulkOrganizationDataToUpdate = {
    name?: string,
    description?: string,
    phoneNumber?: string,
    picture?: string,
}

export type OrganizationSchemaType = BaseModel & NewOrganization & DefaultFields;