import { Model, Schema } from "mongoose";
import { OrganizationSchemaType } from "@/lib/types/organization";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";

const OrganizationSchema = new Schema<OrganizationSchemaType>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { collection: "Organizations", timestamps: true, versionKey: false })

export const OrganizationModel = (DATABASE_CONNECTION.models.Organization as Model<OrganizationSchemaType>)
    || DATABASE_CONNECTION.model<OrganizationSchemaType>("Organization", OrganizationSchema)