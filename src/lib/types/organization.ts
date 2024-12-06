import { BaseModel } from ".";

export type NewOrganization = {
    name: string,
    description: string
}

export type OrganizationSchemaType = BaseModel & NewOrganization;