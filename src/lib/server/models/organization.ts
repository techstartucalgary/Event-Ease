import { Model, Schema } from "mongoose";
import { BulkOrganizationDataToUpdate, NewOrganization, OrganizationSchemaType } from "@/lib/types/organization";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";
import * as yup from "yup";
import { getStringSchema, nameRegex } from "@/lib/helpers";

const OrganizationSchema = new Schema<OrganizationSchemaType>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    pushTokens: {
        type: [{
            type: String,
            required: true
        }],
        required: true,
        default: []
    },
    stripeId: {
        type: String,
        required: true
    }
}, { collection: "Organizations", timestamps: true, versionKey: false })

export function validatedNewOrganizationData(params: NewOrganization) {
    // Here we validate the provided params for creating a new organization
    const { name, username, email, clerkId, phoneNumber, description, picture } = params;

    const schema = yup.object().shape({
        name: getStringSchema({ message: "Name is required" }),
        username: getStringSchema({ message: "Username is required" }),
        email: getStringSchema({ message: "Email is required" }),
        clerkId: getStringSchema({ message: "Clerk ID is required" }),
        phoneNumber: getStringSchema({ message: "Phone number is required" }),
        description: getStringSchema({ message: "Description is required" }),
        picture: getStringSchema({ message: "Picture is required" }),
    });

    return schema.validateSync({
        name, username, email, clerkId,
        phoneNumber, description, picture
    }) as NewOrganization;
}

export function validateOrganizationUpdates(data: BulkOrganizationDataToUpdate) {
    // Here we validate the provided params for updating a user
    const schema = yup.object().shape({
        name: getStringSchema({ required: false })
            .matches(nameRegex, 'Invalid name format'),
        description: getStringSchema({ required: false }),
        picture: getStringSchema({ message: "Picture is required" }),
        phoneNumber: getStringSchema({ message: "Phone number is required" }),
    });

    return schema.validateSync(data, { stripUnknown: true });
}

export const OrganizationModel = (DATABASE_CONNECTION.models.Organization as Model<OrganizationSchemaType>)
    || DATABASE_CONNECTION.model<OrganizationSchemaType>("Organization", OrganizationSchema)