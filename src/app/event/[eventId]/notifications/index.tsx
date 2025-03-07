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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Notifications
                </h2>
                <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {notifications.filter((n) => !n.read).length} unread
                </span>
            </div>
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                            notification.read
                                ? "bg-gray-50"
                                : "bg-white border-l-4 border-l-blue-500"
                        } shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-3`}
                    >
                        <div
                            className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                                notification.read
                                    ? "bg-gray-300"
                                    : "bg-blue-500"
                            }`}
                        ></div>
                        <div className="flex-1">
                            <p className="text-gray-800 font-medium mb-1">
                                {notification.message}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {notification.timestamp}
                            </div>
                        </div>
                        {!notification.read && (
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
