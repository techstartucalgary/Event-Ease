'use client'

import { useState, useEffect } from "react";
import { Chat, Attendee, Message } from "../types";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

// Mock data
const CURRENT_USER: Attendee = {
    id: "current-user",
    name: "Current User",
    role: "Attendee",
    email: "current@example.com",
};

const MOCK_CHATS: Chat[] = [
    {
        id: "1",
        participants: [
            CURRENT_USER,
            {
                id: "1",
                name: "Alice Chen",
                role: "Developer",
                email: "alice@example.com",
            },
        ],
        messages: [
            {
                id: "1",
                content: "Hi, how are you?",
                senderId: "2",
                timestamp: "10:30 AM",
                read: true,
            },
            {
                id: "2",
                content: "I'm good, thanks! How about you?",
                senderId: "current-user",
                timestamp: "10:31 AM",
                read: true,
            },
            {
                id: "3",
                content: "Great! Are you attending the workshop at 2 PM?",
                senderId: "2",
                timestamp: "10:32 AM",
                read: true,
            },
            {
                id: "4",
                content: "Yes, I'm looking forward to it!",
                senderId: "current-user",
                timestamp: "10:33 AM",
                read: true,
            },
            {
                id: "5",
                content: "I'm also looking forward to it!",
                senderId: "2",
                timestamp: "10:34 AM",
                read: false,
            },
        ],
        unreadCount: 1,
        lastMessage: {
            id: "5",
            content: "I'm also looking forward to it!",
            senderId: "2",
            timestamp: "10:34 AM",
            read: false,
        },
    },
    {
        id: "2",
        participants: [
            CURRENT_USER,
            {
                id: "2",
                name: "Bob Smith",
                role: "Designer",
                email: "bob@example.com",
            },
        ],
        messages: [
            {
                id: "4",
                content: "Hey, did you see the new design?",
                senderId: "3",
                timestamp: "9:45 AM",
                read: false,
            },
        ],
        unreadCount: 1,
        lastMessage: {
            id: "4",
            content: "Hey, did you see the new design?",
            senderId: "3",
            timestamp: "9:45 AM",
            read: false,
        },
    },
    {
        id: "3",
        participants: [
            CURRENT_USER,
            {
                id: "3",
                name: "Sarah Johnson",
                role: "Event Organizer",
                email: "sarah@example.com",
            },
        ],
        messages: [
            {
                id: "5",
                content: "Just a reminder about tomorrow's keynote speech",
                senderId: "4",
                timestamp: "Yesterday",
                read: true,
            },
            {
                id: "6",
                content: "Thanks for the reminder! What time does it start?",
                senderId: "current-user",
                timestamp: "Yesterday",
                read: true,
            },
            {
                id: "7",
                content:
                    "9 AM sharp in the main hall. Don't forget to bring your badge!",
                senderId: "4",
                timestamp: "Yesterday",
                read: true,
            },
        ],
        unreadCount: 0,
        lastMessage: {
            id: "7",
            content:
                "9 AM sharp in the main hall. Don't forget to bring your badge!",
            senderId: "4",
            timestamp: "Yesterday",
            read: true,
        },
    },
    {
        id: "4",
        participants: [
            CURRENT_USER,
            {
                id: "4",
                name: "Mike Wilson",
                role: "Speaker",
                email: "mike@example.com",
            },
        ],
        messages: [
            {
                id: "8",
                content: "Looking forward to your talk!",
                senderId: "current-user",
                timestamp: "2 days ago",
                read: true,
            },
            {
                id: "9",
                content:
                    "Thanks! I'll be covering some exciting new developments in AI",
                senderId: "5",
                timestamp: "2 days ago",
                read: true,
            },
        ],
        unreadCount: 0,
        lastMessage: {
            id: "9",
            content:
                "Thanks! I'll be covering some exciting new developments in AI",
            senderId: "5",
            timestamp: "2 days ago",
            read: true,
        },
    },
    {
        id: "5",
        participants: [
            CURRENT_USER,
            {
                id: "5",
                name: "Eva Martinez",
                role: "Networking Coordinator",
                email: "eva@example.com",
            },
        ],
        messages: [
            {
                id: "10",
                content:
                    "Hi! Would you like to join our networking session this afternoon?",
                senderId: "6",
                timestamp: "Just now",
                read: false,
            },
        ],
        unreadCount: 1,
        lastMessage: {
            id: "10",
            content:
                "Hi! Would you like to join our networking session this afternoon?",
            senderId: "6",
            timestamp: "Just now",
            read: false,
        },
    },
];

export default function Chats() {
    const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(
        undefined
    );
    const [isMobileListVisible, setIsMobileListVisible] = useState(true);

    // Check for stored chat selection from attendee list
    useEffect(() => {
        const storedUser = localStorage.getItem("selectedChatUser");
        if (storedUser) {
            const attendee: Attendee = JSON.parse(storedUser);
            // Check if chat already exists
            const existingChat = chats.find((chat) =>
                chat.participants.some((p) => p.id === attendee.id)
            );

            if (existingChat) {
                setSelectedChat(existingChat);
            } else {
                // Create new chat
                const newChat: Chat = {
                    id: Date.now().toString(),
                    participants: [CURRENT_USER, attendee],
                    messages: [],
                    unreadCount: 0,
                };
                setChats((prev) => [...prev, newChat]);
                setSelectedChat(newChat);
            }
            localStorage.removeItem("selectedChatUser");
        }
    }, [chats]);

    const handleSendMessage = (content: string) => {
        if (!selectedChat) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            senderId: CURRENT_USER.id,
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            read: false,
        };

        setChats((prev) =>
            prev.map((chat) => {
                if (chat.id === selectedChat.id) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                        lastMessage: newMessage,
                    };
                }
                return chat;
            })
        );
    };

    const handleChatSelect = (chat: Chat) => {
        setSelectedChat(chat);
        setIsMobileListVisible(false);
    };

    const handleBackToList = () => {
        setIsMobileListVisible(true);
    };

    return (
        <div className="h-full overflow-hidden w-full min-h-[calc(100vh-8rem)] max-md:min-h-[calc(100vh-12rem)]">
            {/* Mobile: Show either list or chat */}
            <div className="md:hidden h-full w-full min-h-full">
                {isMobileListVisible ? (
                    <div className="h-full w-full overflow-y-auto">
                        <ChatList
                            chats={chats}
                            selectedChat={selectedChat}
                            onChatSelect={handleChatSelect}
                            currentUserId={CURRENT_USER.id}
                        />
                    </div>
                ) : (
                    selectedChat && (
                        <div className="h-full w-full">
                            <ChatWindow
                                chat={selectedChat}
                                currentUserId={CURRENT_USER.id}
                                onSendMessage={handleSendMessage}
                                onBack={handleBackToList}
                            />
                        </div>
                    )
                )}
            </div>

            {/* Desktop: Show both side by side */}
            <div className="hidden md:flex h-full gap-6">
                <div className="w-full md:w-[320px] lg:w-[380px] flex-none overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <ChatList
                            chats={chats}
                            selectedChat={selectedChat}
                            onChatSelect={setSelectedChat}
                            currentUserId={CURRENT_USER.id}
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    {selectedChat ? (
                        <ChatWindow
                            chat={selectedChat}
                            currentUserId={CURRENT_USER.id}
                            onSendMessage={handleSendMessage}
                            onBack={handleBackToList}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center bg-gray-50">
                            <p className="text-gray-500">
                                Select a chat or start a new conversation
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}