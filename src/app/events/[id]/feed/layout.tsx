"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="bg-background w-full h-full min-h-[calc(100vh-4rem)]">
            <div className="">
                <div className="mx-auto flex">
                    {/* Sidebar (handles both mobile and desktop) */}
                    <Sidebar
                        isMobileMenuOpen={isMobileMenuOpen}
                        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden fixed bottom-6 left-6 z-50 p-4 bg-white rounded-full shadow-lg 
                                 hover:shadow-xl transition-shadow duration-200 
                                 flex items-center justify-center w-14 h-14"
                    >
                        <i
                            className={`fas fa-${
                                isMobileMenuOpen ? "times" : "bars"
                            } text-lg`}
                        ></i>
                    </button>

                    {/* Main Content */}
                    <main className="flex-1 px-4 lg:p-6 pt-2 max-md:pt-6">
                        {children}
                    </main>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
