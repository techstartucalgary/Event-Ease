import { ReactNode, useState } from "react";
import Sidebar from "../[eventId]/Sidebar";

interface LayoutProps {
    children: ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function Layout({
    children,
    activeTab,
    onTabChange,
}: LayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background w-full">
            <div className="lg:p-4 h-full">
                <div className="px-16 max-lg:px-12 max-md:px-0 mx-auto flex h-full">
                    {/* Sidebar (handles both mobile and desktop) */}
                    <Sidebar
                        activeTab={activeTab}
                        isMobileMenuOpen={isMobileMenuOpen}
                        onTabChange={onTabChange}
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
                    <main className="flex-1 px-4 lg:px-6 pt-2 max-md:pt-6">
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
