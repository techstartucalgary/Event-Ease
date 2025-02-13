import { getErrorMessage, logError } from "@/lib/helpers";
import { fetchFilteredEvents } from "@/lib/server/helpers/event";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const searchTerm = searchParams.get("searchTerm") ?? "";
        const page = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 0;
        const limit = searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : 10;
        const sortParam = searchParams.get("sortParam");

        const events = await fetchFilteredEvents({
            searchTerm,
            page,
            limit,
            sortParam: sortParam ? JSON.parse(sortParam) : undefined,
        });

        return new Response(JSON.stringify({ events }), { status: 200 });
    } catch (error) {
        logError("Error from get events api route: ", error);
        return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
            status: 500,
        });
    }
}