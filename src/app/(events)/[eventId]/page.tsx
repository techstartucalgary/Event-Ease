"use client";

import { useState } from "react";

const SIDEBAR_ITEMS = [
    { id: "news", label: "News Feed", icon: "newspaper" },
    { id: "itinerary", label: "Itinerary", icon: "calendar" },
    { id: "chats", label: "Chats", icon: "comments" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "attendees", label: "Attendee List", icon: "users" },
    { id: "info", label: "Event Info", icon: "info-circle" },
    { id: "register", label: "Register/Sign-in", icon: "sign-in-alt" },
];

interface Reply {
    id: number;
    message: string;
    author: string;
    timestamp: string;
    replies?: Reply[];
}

interface Announcement {
    id: number;
    message: string;
    timestamp: string;
    author: string;
    organization?: string;
    replies?: Reply[];
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: 1,
        message:
            "Hackathon starts now! Good Luck. Submissions are due tomorrow at 2pm.",
        timestamp: "Jan 22, 9:00AM",
        author: "Organizer",
        organization: "Company",
        replies: [
            {
                id: 101,
                message: "What format should we submit in?",
                author: "Alice Chen",
                timestamp: "Jan 22, 9:05AM",
                replies: [
                    {
                        id: 1011,
                        message:
                            "Please submit through DevPost with your GitHub repository link",
                        author: "Organizer",
                        timestamp: "Jan 22, 9:10AM",
                    },
                ],
            },
            {
                id: 102,
                message: "Excited to start! Good luck everyone! 🚀",
                author: "Bob Smith",
                timestamp: "Jan 22, 9:15AM",
            },
        ],
    },
    {
        id: 2,
        message: "Lunch will be served in 10 mins!",
        timestamp: "Jan 22, 12:20PM",
        author: "Event Staff",
        replies: [],
    },
    {
        id: 3,
        message:
            "TAs logging off for the day. Reminder submissions are due tomorrow at 2pm and judging is at 3pm.",
        timestamp: "Jan 22, 8:00PM",
        author: "Teaching Assistant",
        replies: [],
    },
];

function ReplyThread({ reply, depth = 0 }: { reply: Reply; depth?: number }) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const hasReplies = reply.replies && reply.replies.length > 0;

    return (
        <div
            className={`${
                depth > 0 ? "ml-8 border-l-2 border-gray-100 pl-4" : ""
            }`}
        >
            <div className="mb-2">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-sm"></i>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">
                            {reply.author}
                        </div>
                        <div className="text-xs text-gray-500">
                            {reply.timestamp}
                        </div>
                    </div>
                </div>
                <p className="text-gray-800 mb-2">{reply.message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                        Reply
                    </button>
                    {hasReplies && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center gap-1"
                        >
                            <i
                                className={`fas fa-chevron-${
                                    isCollapsed ? "down" : "up"
                                } text-xs`}
                            ></i>
                            {isCollapsed ? "Show replies" : "Hide replies"}
                            <span className="text-xs">
                                ({reply.replies?.length})
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {isReplying && (
                <div className="mb-4 ml-8">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write your reply..."
                        rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => {
                                // Handle reply submission here
                                setIsReplying(false);
                                setReplyText("");
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setIsReplying(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {!isCollapsed &&
                reply.replies?.map((nestedReply) => (
                    <ReplyThread
                        key={nestedReply.id}
                        reply={nestedReply}
                        depth={depth + 1}
                    />
                ))}
        </div>
    );
}

function Announcement({ announcement }: { announcement: Announcement }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-50 rounded-xl p-4 lg:p-6 transition-colors duration-200">
            <div className="flex items-center gap-3 lg:gap-4 mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-user"></i>
                </div>
                <div>
                    <div className="font-semibold text-gray-900">
                        {announcement.author}
                    </div>
                    <div className="text-sm text-gray-600">
                        {announcement.organization}
                    </div>
                </div>
            </div>
            <p className="mb-4 text-gray-800">{announcement.message}</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 gap-2">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                >
                    <i
                        className={`fas fa-chevron-${
                            isExpanded ? "up" : "down"
                        } text-xs`}
                    ></i>
                    {isExpanded
                        ? "Hide Replies"
                        : `View Replies (${announcement.replies?.length || 0})`}
                </button>
                <span className="text-gray-500">{announcement.timestamp}</span>
            </div>

            {isExpanded && (
                <div className="mt-4 space-y-4">
                    {announcement.replies?.map((reply) => (
                        <ReplyThread key={reply.id} reply={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function EventDashboard() {
    const [activeTab, setActiveTab] = useState("news");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Bar */}
            <div className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between lg:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <i
                            className={`fas fa-${
                                isMobileMenuOpen ? "times" : "bars"
                            }`}
                        ></i>
                    </button>
                    <div className="font-semibold text-gray-900">
                        Event Dashboard
                    </div>
                    <div className="w-8"></div> {/* Spacer for centering */}
                </div>
            </div>

            <div className="container mx-auto p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                    {/* Sidebar */}
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
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`w-full p-4 text-left flex items-center gap-3 transition-colors duration-200
                                    ${
                                        activeTab === item.id
                                            ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-500"
                                            : "hover:bg-gray-50 text-gray-700"
                                    }`}
                            >
                                <i className={`fas fa-${item.icon} w-6`}></i>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-xl shadow-md p-4 lg:p-8">
                        {/* Time Remaining Banner */}
                        <div className="px-4 lg:px-6 rounded-xl mb-4 flex items-center justify-end font-medium">
                            <i className="fas fa-clock mr-3"></i>
                            17h:45:20s remaining
                        </div>

                        {/* News Feed Content */}
                        {activeTab === "news" && (
                            <div className="space-y-4">
                                {MOCK_ANNOUNCEMENTS.map((announcement) => (
                                    <Announcement
                                        key={announcement.id}
                                        announcement={announcement}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
