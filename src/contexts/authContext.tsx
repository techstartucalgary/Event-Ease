"use client"

import { createContext, PropsWithChildren } from "react"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import { prefixWithCloudUrl } from "@/lib/helpers";
import { ClerkUser } from "@/lib/types/user";

type authContext = {
    user: ClerkUser | null;
}
const AuthContext = createContext<authContext | null>(null)

function Provider({ children }: PropsWithChildren) {
    const { user: clerkUser } = useUser();

    const user = clerkUser ? {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        picture: !!clerkUser.publicMetadata.picture ? prefixWithCloudUrl("Users", clerkUser.publicMetadata.picture as string) : undefined,
        fullName: clerkUser.fullName!,
        username: clerkUser.username!
    } : null

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function AuthContextProvider({ children }: PropsWithChildren) {
    return (
        <ClerkProvider>
            <Provider>
                {children}
            </Provider>
        </ClerkProvider>
    )
}