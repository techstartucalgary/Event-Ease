export const entityTypes = ["User", "Organization"] as const;

export function processError(error: unknown) {
    if (error instanceof Error)
        throw new Error(error.message);
    throw new Error("An unknown error occurred");
}