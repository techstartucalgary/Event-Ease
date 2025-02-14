import { getErrorMessage, logError } from "@/lib/helpers";
import { createEvent } from "@/lib/server/helpers/event";

export async function POST(req: Request) {
    try {
        const {
            name,
            description,
            images,
            creator,
            creatorType,
            location,
            startDate,
            endDate,
        } = await req.json();

        const event = await createEvent({
            name,
            description,
            images,
            creator,
            creatorType,
            location,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        });

        return new Response(JSON.stringify({ event }), { status: 201 });
    } catch (error) {
        logError("Error from create event api route: ", error);
        return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
            status: 500,
        });
    }
}