import {BaseEntity, BaseModel} from ".";

type DefaultFields = {
    name?: string,
    description?: string,
    picture?: string,
    users?: string[],
}

export type NewOrganization = {
    name: string,
    description: string,
    users?: string[]
}

export type BulkOrganizationDataToUpdate = {
    name?: string,
    description?: string,
    picture?: string,
    users?: string[],
}

export type OrganizationSchemaType = BaseModel & NewOrganization & DefaultFields;

export type OrganizationOptionalPicture = BaseEntity & {
    picture?: string;
}