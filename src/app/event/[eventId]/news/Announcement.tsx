import { useState } from "react";
import { Announcement as AnnouncementType } from "../types";
import ReplyThread from "./ReplyThread";

interface AnnouncementProps {
    announcement: AnnouncementType;
    onNameClick: (author: string) => void;
}

export default function Announcement({
    announcement,
    onNameClick,
}: AnnouncementProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const hasReplies = announcement.replies.length > 0;

    return (
        <div className="bg-gray-50 rounded-xl p-4 lg:p-6 transition-colors duration-200">
            <div className="flex items-center gap-3 lg:gap-4 mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 text-tertiary rounded-full flex items-center justify-center">
                    <i className="fas fa-user"></i>
                </div>
                <div>
                    <div
                        className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => onNameClick(announcement.author)}
                    >
                        {announcement.author}
                    </div>
                    <div className="text-sm text-gray-600">
                        {announcement.organization}
                    </div>
                </div>
            </div>
            <p className="mb-4 text-gray-800">{announcement.message}</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 gap-2">
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className="text-sm text-foreground hover:text-foreground/80 transition-colors duration-200"
                    >
                        Reply
                    </button>
                    {hasReplies && (
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
                                : `View Replies (${announcement.replies.length})`}
                        </button>
                    )}
                </div>
                <span className="text-gray-500">{announcement.timestamp}</span>
            </div>

            {isReplying && (
                <div className="mt-4 space-y-2">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-tertiary focus:border-transparent"
                        placeholder="Write your reply..."
                        rows={3}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setIsReplying(false);
                                setReplyText("");
                            }}
                            className="px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-200"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setIsReplying(false)}
                            className="px-4 py-2 text-foreground hover:text-foreground/80 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {isExpanded && hasReplies && (
                <div className="mt-4 space-y-4">
                    {announcement.replies.map((reply) => (
                        <ReplyThread
                            key={reply.id}
                            reply={reply}
                            onNameClick={onNameClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
