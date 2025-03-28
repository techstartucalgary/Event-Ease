import { getErrorMessage, logError } from "@/lib/helpers";
import {
  getEventById,
  updateEvent,
  deleteEventById,
} from "@/lib/server/helpers/event";
import { RequestParam } from "@/lib/types";
import { BulkEventDataToUpdate } from "@/lib/types/event";
import { EventNotFoundError } from "@/lib/helpers/exceptions";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: RequestParam) {
  try {
    const { id } = await params;

    const event = await getEventById(id);

    if (!event) throw new EventNotFoundError();

    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    logError("Error from get event by ID api route: ", error);
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request, { params }: RequestParam) {
  try {
    const { id } = await params;
    const data: BulkEventDataToUpdate = await req.json();

    const updatedEvent = await updateEvent(id, data);

    if (!updatedEvent) throw new EventNotFoundError();

    return new Response(JSON.stringify({ event: updatedEvent }), {
      status: 200,
    });
  } catch (error) {
    logError("Error from update event api route: ", error);
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
    });
  }
}

export async function DELETE(_: Request, { params }: RequestParam) {
  try {
    const { id } = await params;

    const success = await deleteEventById(id);

    if (!success) throw new EventNotFoundError();

    return new Response(null, { status: 204 });
  } catch (error) {
    logError("Error from delete event api route: ", error);
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
    });
  }
}
