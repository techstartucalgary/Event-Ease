'use client'

import { useContext } from "react";
import AppContext from "@/contexts/appContext";

export default function useAppContext() {
    const contextObject = useContext(AppContext);

    if(!contextObject)
        throw new Error('useAppContext must be used within a AppContextProvider')

    return contextObject
}