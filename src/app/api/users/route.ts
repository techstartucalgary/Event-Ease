import { getErrorMessage, logError } from "@/lib/helpers";
import { searchUsersPaginated } from "@/lib/server/helpers/user";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const searchTerm = searchParams.get('searchTerm') ?? "";
        const currentUserId = "666666666666666666666666";
        const isUsernameSearch = searchParams.get('isUsernameSearch') ? searchParams.get('isUsernameSearch') === "true" : false;

        const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0;
        const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 10;
        const sortParam = searchParams.get('sortParam');

        const users = await searchUsersPaginated({
            searchTerm, currentUserId, page, limit, isUsernameSearch,
            sortParam: sortParam ? JSON.parse(sortParam) : undefined
        })
        return new Response(JSON.stringify({ users }), { status: 200 });
    } catch (error) {
        logError("Error from get users api route: ", error)
        return new Response(JSON.stringify({ error: getErrorMessage(error) }), { status: 500 })
    }
}