import { UserModel } from "./user";
import { OrganizationModel } from "./organization";
import { EventModel } from "./event";
import { connectToDatabase } from "@/lib/server/helpers/database";

async function ModelInitializer<T>(arg: T): Promise<T> {
    await connectToDatabase();
    return arg;
}

export const User = ModelInitializer(UserModel);
export const Organization = ModelInitializer(OrganizationModel);
export const Event = ModelInitializer(EventModel);