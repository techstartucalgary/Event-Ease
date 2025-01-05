import { isValidEmail, parseToJSON, prefixWithCloudUrl, processError, getSearchRegex, logError } from "@/lib/helpers";
import { InvalidEmailError } from "@/lib/helpers/exceptions";
import { BulkUserDataToUpdate, IdAndOptionalPicture, NewUser, UserSchemaType } from "@/lib/types/user";
import { User } from "@/lib/server/models";
import { validatedNewUserData, validateUserUpdates } from "@/lib/server/models/user";
import { SortOrder, UpdateQuery } from "mongoose";

export async function createUser(data: NewUser) {
    try {
        if (!isValidEmail(data.email))
            throw new InvalidEmailError();
        const user = await (await User).create(validatedNewUserData(data));
        return parseToJSON(user);
    } catch (error) {
        console.error("Error creating user", error);
        processError(error);
    }
}

export async function updateUser(userId: string, newData: BulkUserDataToUpdate) {
    try {
        const validatedData = validateUserUpdates(newData);

        const updates = {} as UpdateQuery<UserSchemaType>;

        Object.entries(validatedData).forEach(([key, value]) => {
            if (key === 'picture' && value === null) {
                updates['$unset'] = { picture: "" };
            } else if (value !== undefined) {
                updates[key] = value;
            }
        });

        if (Object.keys(updates).length > 0) {
            updates.updatedAt = new Date();
            await (await User).findByIdAndUpdate(userId, updates);
        }
    } catch (error) {
        console.error("Error updating user", error);
        processError(error);
    }
}

export function prefixUserPictureWithCloudUrl<T extends IdAndOptionalPicture>(user: T): T {
    const { picture, ...otherUserProps } = user;
    if (picture) {
        return ({
            ...otherUserProps,
            picture: prefixWithCloudUrl("Users", `${user._id}/${picture}`)
        }) as T
    }
    return user
}

function sanitizeUserObject<T extends IdAndOptionalPicture>(user: T): T {
    return prefixUserPictureWithCloudUrl(parseToJSON(user));
}

type GetUserParams = {
    findBy: "_id",
    _id: string
} | {
    findBy: "username",
    username: string
} | {
    findBy: "email",
    email: string
} | {
    findBy: "clerkId",
    clerkId: string
}

export async function getUser(params: GetUserParams): Promise<UserSchemaType | null> {
    try {
        let user = null;
        switch (params.findBy) {
            case "_id":
                user = await (await User).findById(params._id).lean();
                break;
            case "username":
                user = await (await User).findOne({ username: params.username }).lean();
                break;
            case "email":
                user = await (await User).findOne({ email: params.email }).lean();
                break;
            case "clerkId":
                user = await (await User).findOne({ clerkId: params.clerkId }).lean();
                break;
        }
        return !!user ? sanitizeUserObject(user) : null;
    } catch (error) {
        logError("Error getting user", error);
        return null;
    }
}

export async function getAllUsers() {
    try {
        return (await (await User).find().lean()).map(sanitizeUserObject);
    } catch (error) {
        console.error("Error getting all users", error);
        processError(error);
    }
}

type SearchUsersPaginatedArgs = {
    searchTerm: string,
    currentUserId: string,
    page: number,
    limit: number,
    sortParam: { [key: string]: SortOrder },
    isUsernameSearch: boolean
}
export async function searchUsersPaginated(args: SearchUsersPaginatedArgs) {
    try {
        const { searchTerm, currentUserId, page, limit, sortParam, isUsernameSearch } = args;
        return (
            await (await User)
            .find({
                [isUsernameSearch ? "username" : "name"]: { $regex: getSearchRegex(searchTerm) },
                _id: { $ne: currentUserId }
            })
            .lean()
            .sort(sortParam)
            .skip(page * limit)
            .limit(limit)
        ).map(sanitizeUserObject);
    } catch (error) {
        console.error("Error searching users", error);
        processError(error);
    }
}

export async function fetchUsers(userIds: string[]) {
    try {
        return (
            await (await User)
                .find({ _id: { $in: userIds } })
                .sort({ name: "ascending" })
                .lean()
        ).map(sanitizeUserObject);
    } catch (error) {
        console.error("Error fetching users", error);
        processError(error);
    }
}