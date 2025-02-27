import { useState } from "react";
import { Chat } from "../types";
import Image from "next/image";

interface ChatWindowProps {
    chat: Chat;
    currentUserId: string;
    onSendMessage: (content: string) => void;
    onBack: () => void;
}

export default function ChatWindow({
    chat,
    currentUserId,
    onSendMessage,
    onBack,
}: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState("");

    const otherParticipant =
        chat.participants.find((p) => p.id !== currentUserId) ||
        chat.participants[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage("");
        }
    };

    return (
        <div className="h-full flex flex-col w-full md:h-auto md:w-auto">
            {/* Header */}
            <div className="flex-none p-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50">
                <button
                    onClick={onBack}
                    className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>

                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                        {otherParticipant.avatar ? (
                            <Image
                                src={otherParticipant.avatar}
                                alt={otherParticipant.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-background">
                                <i className="fas fa-user"></i>
                            </div>
                        )}
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 truncate">
                        {otherParticipant.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                        {otherParticipant.role}
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4">
                    {chat.messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                                message.senderId === currentUserId
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[280px] sm:max-w-[420px] rounded-lg px-4 py-2 
                                    ${
                                        message.senderId === currentUserId
                                            ? "bg-surface text-white"
                                            : "bg-gray-100 text-gray-900"
                                    }`}
                            >
                                <p className="break-words">{message.content}</p>
                                <p
                                    className={`text-xs mt-1 
                                    ${
                                        message.senderId === currentUserId
                                            ? "text-surface"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {message.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Input */}
            <div className="flex-none p-4 border-t border-gray-200 bg-white">
                <form
                    onSubmit={handleSubmit}
                    className="flex gap-2 max-w-3xl mx-auto"
                >
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-surface truncate"
                    />
                    <button
                        type="submit"
                        className="flex-none px-4 py-2 bg-surface text-white rounded-lg hover:bg-tertiary/80 transition-colors
                                disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        disabled={!newMessage.trim()}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
