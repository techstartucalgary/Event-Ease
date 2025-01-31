"use client"

//import { SessionUser } from "@/lib/types/user"
import { createContext, PropsWithChildren } from "react"


/* type SignInParams = {
    email: string,
    password: string,
    onSuccess?: () => void,
    onError?: (errorMessage: string) => void
}

type SignUpParams = SignInParams & {
    username: string,
    name: string
}

type VerifyEmailParams = {
    code: string,
    onSuccess?: () => void,
    onError?: (errorMessage: string) => void
}

type AuthenticateArgs = {
    onSuccess?: () => void,
    onError?: (errorMessage: string) => void,
} & ({
    provider: 'google'
} | ({
    email: string,
    password: string
    provider: 'credentials'
} & ({
    mode: 'signup',
    name: string,
    username: string
} | {
    mode: 'login'
})))

type authContext = {
    modalIsOpen: boolean,
    openSignup: () => void,
    openLogin: () => void,
    user: SessionUser | null,
    signIn: (args: SignInParams) => Promise<void>,
    signUp: (args: SignUpParams) => Promise<void>,
    signOut: () => Promise<void>,
    signInWithGoogle: () => Promise<void>,
    resendVerificationCode: () => Promise<void>,
    verifyEmail: (args: VerifyEmailParams) => Promise<void>
} */

export const AuthContext = createContext<unknown | null>(null)
export function AuthContextProvider({ children }: PropsWithChildren) {
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}