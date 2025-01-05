import { getErrorMessage, logError } from "@/lib/helpers";
import { UserNotFoundError } from "@/lib/helpers/exceptions";
import { getUser } from "@/lib/server/helpers/user";
import { RequestParam } from "@/lib/types";
import { UserSchemaType } from "@/lib/types/user";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: RequestParam) {
    try {
        const { id } = await params;
        let user: UserSchemaType | null = null;
        try {
            new ObjectId(id);
            user = await getUser({ findBy: "_id", _id: id });
        } catch {
            user = await getUser({ findBy: "username", username: id });
        }
        if (!user)
            throw new UserNotFoundError();
        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        logError("Error from get user api route: ", error)
        return new Response(JSON.stringify({ error: getErrorMessage(error) }), { status: 500 })
    }
}