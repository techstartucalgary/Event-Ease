import { useState } from "react";

interface Notification {
    id: number;
    message: string;
    timestamp: string;
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        message: "Your registration for the Tech Conference 2025 is confirmed!",
        timestamp: "Jan 22, 9:00 AM",
        read: false,
    },
    {
        id: 2,
        message: "New message from Alice Chen regarding the Hackathon.",
        timestamp: "Jan 22, 10:15 AM",
        read: true,
    },
    {
        id: 3,
        message: "Reminder: Submit your project by tomorrow at 2 PM.",
        timestamp: "Jan 22, 11:30 AM",
        read: false,
    },
    {
        id: 4,
        message: "Lunch will be served in 10 minutes!",
        timestamp: "Jan 22, 12:20 PM",
        read: true,
    },
];

export default function Notifications() {
    const [notifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
                Notifications
            </h2>
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                            notification.read ? "bg-gray-100" : "bg-white"
                        } shadow-md transition-colors duration-200`}
                    >
                        <p className="text-gray-800">{notification.message}</p>
                        <span className="text-sm text-gray-500">
                            {notification.timestamp}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
