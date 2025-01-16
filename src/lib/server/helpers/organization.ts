import {parseToJSON, prefixWithCloudUrl, processError, getSearchRegex, logError} from "@/lib/helpers";
import {
    BulkOrganizationDataToUpdate,
    NewOrganization,
    OrganizationOptionalPicture,
    OrganizationSchemaType
} from "@/lib/types/organization";
import {Organization} from "@/lib/server/models";
import {validatedNewOrganizationData, validateOrganizationUpdates} from "@/lib/server/models/organization";
import {SortOrder, UpdateQuery} from "mongoose";

export async function createOrganization(data: NewOrganization) {
    try {
        const organization = await (await Organization).create(validatedNewOrganizationData(data));
        return parseToJSON(organization);
    } catch (error) {
        console.error("Error creating organization", error);
        processError(error);
    }
}

export async function updateOrganization(organizationId: string, newData: BulkOrganizationDataToUpdate) {
    try {
        const validatedData = validateOrganizationUpdates(newData);

        const updates = {} as UpdateQuery<OrganizationSchemaType>;

        Object.entries(validatedData).forEach(([key, value]) => {
            if (key === 'picture' && value === null) {
                updates['$unset'] = {picture: ""};
            } else if (value !== undefined) {
                updates[key] = value;
            }
        });

        if (Object.keys(updates).length > 0) {
            updates.updatedAt = new Date();
            await (await Organization).findByIdAndUpdate(organizationId, updates);
        }
    } catch (error) {
        console.error("Error updating organization", error);
        processError(error);
    }
}

export function prefixOrganizationPictureWithCloudUrl<T extends OrganizationOptionalPicture>(organization: T): T {
    const {picture, ...otherOrganizationProps} = organization;
    if (picture) {
        return ({
            ...otherOrganizationProps,
            picture: prefixWithCloudUrl("Organizations", `${organization._id}/${picture}`)
        }) as T
    }
    return organization;
}

function sanitizeOrganizationObject<T extends OrganizationOptionalPicture>(organization: T): T {
    return prefixOrganizationPictureWithCloudUrl(parseToJSON(organization));
}

type GetOrganizationParams = {
    findBy: "_id",
    _id: string
} | {
    findBy: "name",
    name: string
}

export async function getOrganization(params: GetOrganizationParams): Promise<OrganizationSchemaType | null> {
    try {
        let organization = null;
        switch (params.findBy) {
            case "_id":
                organization = await (await Organization).findById(params._id).lean();
                break;
            case "name":
                organization = await (await Organization).findOne({name: params.name}).lean();
                break;
        }
        return !!organization ? sanitizeOrganizationObject(organization) : null;
    } catch (error) {
        logError("Error getting organizations", error);
        return null;
    }
}

export async function getAllOrganizations() {
    try {
        return (await (await Organization).find().lean()).map(sanitizeOrganizationObject);
    } catch (error) {
        console.error("Error getting all organizations", error);
        processError(error);
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
        const {searchTerm, currentOrganizationId, page, limit, sortParam} = args;
        return (
            await (await Organization)
                .find({
                    name: {$regex: getSearchRegex(searchTerm)},
                    _id: {$ne: currentOrganizationId}
                })
                .lean()
                .sort(sortParam)
                .skip(page * limit)
                .limit(limit)
        ).map(sanitizeOrganizationObject);
    } catch (error) {
        console.error("Error searching organizations", error);
        processError(error);
    }
}

export async function fetchOrganizations(organizationIds: string[]) {
    try {
        return (
            await (await Organization)
                .find({_id: {$in: organizationIds}})
                .sort({name: "ascending"})
                .lean()
        ).map(sanitizeOrganizationObject);
    } catch (error) {
        console.error("Error fetching organizations", error);
        processError(error);
    }
}