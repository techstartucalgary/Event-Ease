import { SidebarItem as SidebarItemType } from "../types";
import SidebarItem from "./SidebarItem";

const SIDEBAR_ITEMS: SidebarItemType[] = [
    { id: "news", label: "News Feed", icon: "newspaper" },
    { id: "itinerary", label: "Itinerary", icon: "calendar" },
    { id: "chats", label: "Chats", icon: "comments" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "attendees", label: "Attendee List", icon: "users" },
    { id: "info", label: "Event Info", icon: "info-circle" },
    { id: "register", label: "Register/Sign-in", icon: "sign-in-alt" },
];

interface SidebarProps {
    activeTab: string;
    isMobileMenuOpen: boolean;
    onTabChange: (tab: string) => void;
    onMobileMenuClose: () => void;
}

export default function Sidebar({
    activeTab,
    isMobileMenuOpen,
    onTabChange,
    onMobileMenuClose,
}: SidebarProps) {
    return (
        <div
            className={`
            fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-fit w-64 lg:w-72 
            bg-white shadow-md rounded-xl overflow-hidden 
            transition-transform duration-300 z-40
            ${
                isMobileMenuOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
            }
            flex-shrink-0
        `}
        >
            {SIDEBAR_ITEMS.map((item) => (
                <SidebarItem
                    key={item.id}
                    {...item}
                    isActive={activeTab === item.id}
                    onClick={(id) => {
                        onTabChange(id);
                        onMobileMenuClose();
                    }}
                />
            ))}
        </div>
    );
}
