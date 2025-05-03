import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    SignedOut,
    SignedIn,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { Bot } from "lucide-react";

async function RightSide() {
    return (
        <>
            <SignedOut>
                <div className="flex items-center gap-4">
                    <SignInButton mode="modal">
                        <button className="relative px-4 py-2 text-sm font-medium text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
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
                            userButtonBox: "h-8 w-8",
                        },
                    }}
                />
            </SignedIn>
        </>
    );
}

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full shadow-sm bg-surface text-accent h-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="text-white font-medium transition-colors cursor-pointer select-none flex items-center gap-2"
                    >
                        <Image
                            src="/logo.svg"
                            alt="EventEase Logo"
                            width={32}
                            height={32}
                        />
                        EventEase
                    </Link>
                    
                    {/* AI Chat link - shown differently on mobile vs desktop */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                        <Link 
                            href="/aichat" 
                            className="md:px-4 md:py-2 p-2 bg-tertiary/60 md:bg-transparent rounded-full md:rounded-none text-white hover:bg-tertiary md:hover:bg-transparent md:hover:text-accent/80 transition-colors flex items-center gap-1"
                            aria-label="AI Event Finder"
                        >
                            <Bot size={20} className="md:size-4" />
                            <span className="hidden md:inline">Ease AI</span>
                        </Link>
                    </div>
                    
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
