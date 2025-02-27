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

    const mobileNavItems = [
        { id: "news", icon: "newspaper", label: "News" },
        { id: "chats", icon: "comments", label: "Chats" },
        { id: "attendees", icon: "users", label: "Attendees" },
        { id: "info", icon: "info-circle", label: "Info" },
        { id: "itinerary", icon: "calendar", label: "Itinerary" },
        { id: "notifications", icon: "bell", label: "Notifications" },
        { id: "register", icon: "sign-in-alt", label: "Register" },
    ];

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background w-full">
            <div className="lg:p-4 h-full">
                <div className="px-16 max-lg:px-12 max-md:px-0 mx-auto flex h-full">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <Sidebar
                            activeTab={activeTab}
                            isMobileMenuOpen={isMobileMenuOpen}
                            onTabChange={onTabChange}
                            onMobileMenuClose={() => setIsMobileMenuOpen(false)}
                        />
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 px-4 lg:px-6 pt-2 max-md:pt-6">
                        {children}
                    </main>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
                {/* Scrollable container */}
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex items-center h-16 min-w-max px-2">
                        {mobileNavItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`flex flex-col items-center justify-center min-w-[80px] h-full px-3
                                    ${
                                        activeTab === item.id
                                            ? "text-tertiary"
                                            : "text-gray-500"
                                    }
                                    transition-colors duration-200 hover:text-tertiary
                                `}
                            >
                                <i
                                    className={`fas fa-${item.icon} text-lg`}
                                ></i>
                                <span className="text-xs mt-1 whitespace-nowrap">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
