import { Chat, Attendee } from "../types";

interface ChatListProps {
    chats: Chat[];
    selectedChat?: Chat;
    onChatSelect: (chat: Chat) => void;
    currentUserId: string;
}

export default function ChatList({
    chats,
    onChatSelect,
    currentUserId,
}: ChatListProps) {
    const getOtherParticipant = (chat: Chat): Attendee => {
        return (
            chat.participants.find((p) => p.id !== currentUserId) ||
            chat.participants[0]
        );
    };

    return (
        <div className="w-full bg-gray-50">
            <div className="p-4 border-b border-gray-200 overflow-hidden">
                <h2 className="font-semibold text-gray-900 truncate">
                    Messages
                </h2>
            </div>
            <div className="divide-y divide-gray-200 w-full max-w-full">
                {chats.map((chat) => {
                    const otherParticipant = getOtherParticipant(chat);
                    return (
                        <div key={chat.id} className="w-full">
                            <div
                                className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => onChatSelect(chat)}
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-foreground bg-background">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium text-gray-900 truncate">
                                        {otherParticipant.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        {otherParticipant.role}
                                    </p>
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div className="ml-auto">
                                        <span className="text-xs text-white bg-surface px-3 py-1 rounded-full">
                                            {chat.unreadCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
