import {processError} from "@/lib/helpers";
import {updateOrganization} from "@/lib/server/helpers/organization";
import {OrganizationSchemaType} from "@/lib/types/organization";

export async function updateOrganizationAction(id: string, data: OrganizationSchemaType) {
    try {
        await updateOrganization(id, data);
    } catch (error) {
        console.error(error);
        processError(error);
    }
}