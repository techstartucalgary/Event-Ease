"use client"

import { createContext, PropsWithChildren } from "react"
import { ClerkProvider } from "@clerk/nextjs"

type authContext = {
}
const AuthContext = createContext<authContext | null>(null)

function Provider({ children }: PropsWithChildren) {
    return (
        <AuthContext.Provider value={{}}>
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