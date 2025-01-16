import { Model, Schema } from "mongoose";
import {BulkOrganizationDataToUpdate, NewOrganization, OrganizationSchemaType} from "@/lib/types/organization";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";
import * as yup from "yup";
import {getStringSchema, nameRegex} from "@/lib/helpers";

const OrganizationSchema = new Schema<OrganizationSchemaType>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false,
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { collection: "Organizations", timestamps: true, versionKey: false })

export function validatedNewOrganizationData(params: NewOrganization) {
    // Here we validate the provided params for creating a new organization
    const {name, users} = params;

    const schema = yup.object().shape({
        name: getStringSchema({message: "Name is required"}),
        users: getStringSchema({message: "Users is required"}),
    });

    return schema.validateSync({
        name, users
    }) as NewOrganization;
}

export function validateOrganizationUpdates(data: BulkOrganizationDataToUpdate) {
    // Here we validate the provided params for updating a user
    const schema = yup.object().shape({
        name: getStringSchema({required: false})
            .matches(nameRegex, 'Invalid name format'),
        description: getStringSchema({required: false}),
        picture: getStringSchema({required: false}).nullable(),
        users: getStringSchema({required: false}),
    });

    return schema.validateSync(data, {stripUnknown: true});
}

export const OrganizationModel = (DATABASE_CONNECTION.models.Organization as Model<OrganizationSchemaType>)
    || DATABASE_CONNECTION.model<OrganizationSchemaType>("Organization", OrganizationSchema)