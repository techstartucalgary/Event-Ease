"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarProps {
    isMobileMenuOpen: boolean;
    onMobileMenuClose: () => void;
}

export default function Sidebar({
    isMobileMenuOpen,
    onMobileMenuClose,
}: SidebarProps) {
    const pathname = usePathname();
    const { id: eventId } = useParams();

    // Improved active tab detection
    let activeTab = pathname.split("/").pop();

    // If we're on the main feed page (/events/{id}/feed), set activeTab to "news"
    if (pathname === `/events/${eventId}/feed`) {
        activeTab = "news";
    }

    // Define navigation items
    const navItems = [
        {
            id: "news",
            label: "News Feed",
            icon: "newspaper",
            path: `/events/${eventId}/feed`,
        },
        {
            id: "itinerary",
            label: "Itinerary",
            icon: "calendar-alt",
            path: `/events/${eventId}/feed/itinerary`,
        },
        {
            id: "chats",
            label: "Chats",
            icon: "comments",
            path: `/events/${eventId}/feed/chats`,
        },
        {
            id: "notifications",
            label: "Notifications",
            icon: "bell",
            path: `/events/${eventId}/feed/notifications`,
        },
        {
            id: "attendees",
            label: "Attendees",
            icon: "users",
            path: `/events/${eventId}/feed/attendees`,
        },
        {
            id: "info",
            label: "Event Info",
            icon: "info-circle",
            path: `/events/${eventId}/feed/info`,
        },
        {
            id: "register",
            label: "Register",
            icon: "user-plus",
            path: `/events/${eventId}/feed/register`,
        },
    ];

    return (
        <div
            className={`
                fixed lg:sticky left-0 h-[calc(100vh-4rem)] w-64 
                bg-white shadow-md overflow-y-auto lg:overflow-visible
                transition-transform duration-300 z-40
                ${
                    isMobileMenuOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
                flex-shrink-0
            `}
        >
            <div className="p-4 lg:sticky lg:top-0 bg-white">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold mb-6 text-gray-900"
                >
                    Event Dashboard
                </motion.h2>
                <nav className="space-y-1">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    activeTab === item.id
                                        ? "bg-gray-50 text-foreground font-medium border-l-4 border-tertiary"
                                        : "hover:bg-gray-50 text-foreground"
                                }`}
                                onClick={onMobileMenuClose}
                            >
                                <i className={`fas fa-${item.icon} w-5`}></i>
                                <span>{item.label}</span>
                            </Link>
                        </motion.div>
                    ))}
                </nav>
            </div>
        </div>
    );
}
