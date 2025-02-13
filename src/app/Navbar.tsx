import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

async function RightSide() {
    return (
        <>
            <SignedOut>
                <div className="flex items-center gap-4">
                    <SignInButton mode="modal">
                        <button className="relative px-4 py-2 text-sm font-medium text-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
                            Login
                        </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="px-4 py-2 text-sm font-medium text-foreground bg-background rounded-md transition-all duration-300 active:scale-95 hover:bg-accent">
                            Signup
                        </button>
                    </SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton 
                    appearance={{
                        elements: {
                            userButtonBox: "h-8 w-8"
                        }
                    }}
                />
            </SignedIn>
        </>
    );
}

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full shadow-sm bg-surface text-accent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="text-accent font-medium transition-colors cursor-pointer select-none flex items-center gap-2"
                    >
                        <Image
                            src="/logo.svg"
                            alt="EventEase Logo"
                            width={32}
                            height={32}
                        />
                        EventEase
                    </Link>
                    <Suspense
                        fallback={
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-16 bg-foreground/10 rounded-md animate-pulse"></div>
                                <div className="h-8 w-16 bg-foreground/10 rounded-md animate-pulse delay-75"></div>
                            </div>
                        }
                    >
                        <RightSide />
                    </Suspense>
                </div>
            </div>
        </nav>
    );
}
