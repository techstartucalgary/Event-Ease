interface SidebarItemProps {
    id: string;
    label: string;
    icon: string;
    isActive: boolean;
    onClick: (id: string) => void;
}

export default function SidebarItem({
    id,
    label,
    icon,
    isActive,
    onClick,
}: SidebarItemProps) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`w-full p-4 text-left flex items-center gap-3 transition-colors duration-200
                ${
                    isActive
                        ? "bg-gray-50 text-foreground font-medium border-l-4 border-tertiary"
                        : "hover:bg-gray-50 text-foreground"
                }`}
        >
            <i className={`fas fa-${icon} w-6`}></i>
            {label}
        </button>
    );
}
