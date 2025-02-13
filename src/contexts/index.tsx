"use client"

import { PropsWithChildren } from "react";
import QueryContextProvider from "./queryContext";
import { AppContextProvider } from "./appContext";
import { AuthContextProvider } from "./authContext";

export default function GlobalProvider({ children }: PropsWithChildren) {
    return (
        <QueryContextProvider>
            <AppContextProvider>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </AppContextProvider>
        </QueryContextProvider>
    )
}