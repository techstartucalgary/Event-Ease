'use client'

import { createContext, useCallback } from "react";
import type { PropsWithChildren } from "react";
import { useRouter } from 'next/navigation';

type contextObject = {
    navigateToPage: (page: string) => void,
    refreshPage: () => void
}
const AppContext = createContext<contextObject | null>(null)

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const navigateToPage = useCallback((page: string) => {
        router.push(page.startsWith('/') ? page : `/${page}`);
    }, [router])
    const refreshPage = useCallback(() => {
        router.refresh();
    }, [router])

    return (
        <AppContext.Provider value={{ navigateToPage, refreshPage }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext