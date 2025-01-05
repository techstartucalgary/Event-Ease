import { getErrorMessage } from "@/lib/helpers";
import { logError } from "@/lib/helpers";
import { createUser } from "@/lib/server/helpers/user";

export async function POST(req: Request) {
    try {
        const { username, name, clerkId, email } = await req.json();
        const user = await createUser({ username, name, clerkId, email });
        return new Response(JSON.stringify({ user }), { status: 201 });
    } catch (error) {
        logError("Error from create user api route: ", error)
        return new Response(JSON.stringify({ error: getErrorMessage(error) }), { status: 500 })
    }
}