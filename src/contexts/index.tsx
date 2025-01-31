"use client"

import { AuthContextProvider } from "./authContext";
import QueryContextProvider from "./queryContext";
import { PropsWithChildren } from "react";


export default function GlobalProvider({ children }: PropsWithChildren) {
    return (
        <QueryContextProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </QueryContextProvider>
    )
}