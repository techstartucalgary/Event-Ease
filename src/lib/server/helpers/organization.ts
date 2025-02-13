import { parseToJSON, prefixWithCloudUrl, processError, getSearchRegex, logError } from "@/lib/helpers";
import {
    BulkOrganizationDataToUpdate,
    NewOrganization,
    OrganizationSchemaType
} from "@/lib/types/organization";
import { Organization } from "@/lib/server/models";
import { validatedNewOrganizationData, validateOrganizationUpdates } from "@/lib/server/models/organization";
import { SortOrder, UpdateQuery } from "mongoose";

export async function createOrganization(data: NewOrganization) {
    try {
        const organization = await (await Organization)
            .create(validatedNewOrganizationData(data));
        return parseToJSON(organization);
    } catch (error) {
        logError("Error creating organization", error);
        processError(error);
    }
}

export async function updateOrganization(organizationId: string, newData: BulkOrganizationDataToUpdate) {
    try {
        const validatedData = validateOrganizationUpdates(newData);

        const updates = {} as UpdateQuery<OrganizationSchemaType>;

        Object.entries(validatedData).forEach(([key, value]) => {
            if (value !== undefined) {
                updates[key] = value;
            }
        });

        if (Object.keys(updates).length > 0) {
            updates.updatedAt = new Date();
            await (await Organization).findByIdAndUpdate(organizationId, updates);
        }
    } catch (error) {
        logError("Error updating organization", error);
        processError(error);
    }
}

export function prefixOrganizationPictureWithCloudUrl<T extends { _id: string, picture: string }>(organization: T): T {
    const { picture, ...otherOrganizationProps } = organization;
    if (picture) {
        return ({
            ...otherOrganizationProps,
            picture: prefixWithCloudUrl("Organizations", `${organization._id}/${picture}`)
        }) as T
    }
    return organization;
}

function sanitizeOrganizationObject<T extends { _id: string, picture: string }>(organization: T): T {
    return prefixOrganizationPictureWithCloudUrl(parseToJSON(organization));
}

type GetOrganizationParams = {
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
} | {
    findBy: "stripeId",
    stripeId: string
}

export async function getOrganization(params: GetOrganizationParams): Promise<OrganizationSchemaType | null> {
    try {
        let organization = null;
        switch (params.findBy) {
            case "_id":
                organization = await (await Organization).findById(params._id).lean();
                break;
            case "username":
                organization = await (await Organization).findOne({ username: params.username }).lean();
                break;
            case "email":
                organization = await (await Organization).findOne({ email: params.email }).lean();
                break;
            case "clerkId":
                organization = await (await Organization).findOne({ clerkId: params.clerkId }).lean();
                break;
            case "stripeId":
                organization = await (await Organization).findOne({ stripeId: params.stripeId }).lean();
                break;
        }
        return !!organization ? sanitizeOrganizationObject(organization) : null;
    } catch (error) {
        logError("Error getting organizations", error);
        return null;
    }
}

type SearchOrganizationsPaginatedArgs = {
    searchTerm: string,
    currentOrganizationId: string,
    page: number,
    limit: number,
    sortParam: { [key: string]: SortOrder },
}
export async function searchOrganizationsPaginated(args: SearchOrganizationsPaginatedArgs) {
    try {
        const { searchTerm, currentOrganizationId, page, limit, sortParam } = args;
        return (
            await (await Organization)
                .find({
                    name: { $regex: getSearchRegex(searchTerm) },
                    _id: { $ne: currentOrganizationId }
                })
                .lean()
                .sort(sortParam)
                .skip(page * limit)
                .limit(limit)
        ).map(sanitizeOrganizationObject);
    } catch (error) {
        logError("Error searching organizations", error);
        processError(error);
    }
}

export async function fetchOrganizations(organizationIds: string[]) {
    try {
        return (
            await (await Organization)
                .find({ _id: { $in: organizationIds } })
                .sort({ name: "ascending" })
                .lean()
        ).map(sanitizeOrganizationObject);
    } catch (error) {
        console.error("Error fetching organizations", error);
        processError(error);
    }
}