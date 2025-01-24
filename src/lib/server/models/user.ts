import { Model, Schema } from "mongoose";
import { BulkUserDataToUpdate, NewUser, UserSchemaType } from "@/lib/types/user";
import { DATABASE_CONNECTION } from "@/lib/server/helpers/database";
import * as yup from 'yup';
import { getStringSchema, nameRegex } from "@/lib/helpers";

const UserSchema = new Schema<UserSchemaType>({
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
    intro: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
        required: false
    },
    pushTokens: {
        type: [{
            type: String,
            required: true
        }],
        required: true,
        default: []
    },
    savedEvents: {
        type: [{
            type: String,
            required: true,
            ref: 'Event'
        }],
        required: true,
        default: []
    }
}, { collection: "Users", timestamps: true, versionKey: false })

export function validatedNewUserData(params: NewUser) {
    // Here we validate the provided params for creating a new user
    const { name, username, email, clerkId } = params;

    const schema = yup.object().shape({
        name: getStringSchema({ message: "Name is required" }),
        username: getStringSchema({ message: "Username is required" }),
        email: getStringSchema({ message: "User email is required" })
            .email('Invalid email format'),
        clerkId: getStringSchema({ message: "User's clerk id is required" })
    });

    return schema.validateSync({
        name, username, email, clerkId
    }) as NewUser;
}

export function validateUserUpdates(data: BulkUserDataToUpdate) {
    // Here we validate the provided params for updating a user
    const schema = yup.object().shape({
        name: getStringSchema({ required: false })
            .matches(nameRegex, 'Invalid name format'),
        intro: getStringSchema({ required: false }),
        phoneNumber: getStringSchema({ required: false }),
        picture: getStringSchema({required: false}).nullable(),
        organizations: getStringSchema({required: false}),
    });

    return schema.validateSync(data, { stripUnknown: true });
}

export const UserModel = (DATABASE_CONNECTION.models.User as Model<UserSchemaType>)
    || DATABASE_CONNECTION.model<UserSchemaType>("User", UserSchema)