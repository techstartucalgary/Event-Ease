"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface SidebarProps {
    isMobileMenuOpen: boolean;
    onMobileMenuClose: () => void;
}

export default function Sidebar({
    isMobileMenuOpen,
    onMobileMenuClose,
}: SidebarProps) {
    const pathname = usePathname();

    const activeTab = pathname.split("/").pop();
    
    const { eventId } = useParams();

    // Define navigation items
    const navItems = [
        {
            id: "news",
            label: "News Feed",
            icon: "newspaper",
            path: `/event/${eventId}`,
        },
        {
            id: "itinerary",
            label: "Itinerary",
            icon: "calendar-alt",
            path: `/event/${eventId}/itinerary`,
        },
        {
            id: "chats",
            label: "Chats",
            icon: "comments",
            path: `/event/${eventId}/chats`,
        },
        {
            id: "notifications",
            label: "Notifications",
            icon: "bell",
            path: `/event/${eventId}/notifications`,
        },
        {
            id: "attendees",
            label: "Attendees",
            icon: "users",
            path: `/event/${eventId}/attendees`,
        },
        {
            id: "info",
            label: "Event Info",
            icon: "info-circle",
            path: `/event/${eventId}/info`,
        },
        {
            id: "register",
            label: "Register",
            icon: "user-plus",
            path: `/event/${eventId}/register`,
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 bg-white text-surface rounded-lg overflow-hidden shadow-lg h-full">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-6">Event Dashboard</h2>
                    <nav>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                            activeTab === item.id
                                                ? "bg-accent/20 text-tertiary"
                                                : "hover:bg-accent/10"
                                        }`}
                                    >
                                        <i
                                            className={`fas fa-${item.icon} w-5`}
                                        ></i>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface text-accent shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-6">Event Dashboard</h2>
                    <nav>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                            activeTab === item.id
                                                ? "bg-accent/20 text-white"
                                                : "hover:bg-accent/10"
                                        }`}
                                        onClick={onMobileMenuClose}
                                    >
                                        <i
                                            className={`fas fa-${item.icon} w-5`}
                                        ></i>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
