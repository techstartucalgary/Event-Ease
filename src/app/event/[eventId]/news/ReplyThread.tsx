import { useState } from "react";
import { Reply } from "../types";

interface ReplyThreadProps {
    reply: Reply;
    depth?: number;
    onNameClick: (author: string) => void;
}

export default function ReplyThread({
    reply,
    depth = 0,
    onNameClick,
}: ReplyThreadProps) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const hasReplies = reply.replies && reply.replies.length > 0;

    const handleSubmitReply = () => {
        // Here you would implement the actual reply submission
        console.log(`Replying to ${reply.author}: ${replyText}`);
        setIsReplying(false);
        setReplyText("");
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`mt-3 ${depth > 0 ? "pl-3 md:pl-5" : ""}`}>
            <div className="flex">
                {/* Indentation line for nested replies */}
                {depth > 0 && (
                    <div
                        className="mr-3 w-0.5 bg-gray-200 flex-shrink-0 cursor-pointer hover:bg-gray-400"
                        onClick={toggleCollapse}
                    />
                )}

                <div className="flex-1">
                    {/* Comment content */}
                    <div className="flex items-start">
                        <div
                            className="flex-1 bg-white rounded-md p-3 shadow-sm cursor-pointer"
                            onClick={() => toggleCollapse()}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <p
                                    className="text-xs font-medium text-gray-600 cursor-pointer hover:text-blue-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNameClick(reply.author);
                                    }}
                                >
                                    {reply.author}
                                </p>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400">
                                    {reply.timestamp}
                                </span>

                                {isCollapsed && hasReplies && (
                                    <span className="text-xs text-gray-500 ml-1">
                                        ({reply.replies?.length}{" "}
                                        {reply.replies?.length === 1
                                            ? "reply"
                                            : "replies"}
                                        )
                                    </span>
                                )}
                            </div>

                            {!isCollapsed && (
                                <>
                                    <p className="text-sm text-gray-800 mb-2">
                                        {reply.message}
                                    </p>

                                    <div className="flex gap-4 text-xs">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsReplying(!isReplying);
                                            }}
                                            className="text-gray-500 hover:text-gray-700 font-medium"
                                        >
                                            Reply
                                        </button>
                                        <button
                                            className="text-gray-500 hover:text-gray-700 font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Share
                                        </button>
                                        <button
                                            className="text-gray-500 hover:text-gray-700 font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Report
                                        </button>
                                    </div>

                                    {/* Reply form */}
                                    {isReplying && (
                                        <div className="mt-3 pl-0 md:pl-3">
                                            <textarea
                                                value={replyText}
                                                onChange={(e) =>
                                                    setReplyText(e.target.value)
                                                }
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                placeholder="What are your thoughts?"
                                                rows={3}
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button
                                                    onClick={() =>
                                                        setIsReplying(false)
                                                    }
                                                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSubmitReply}
                                                    disabled={!replyText.trim()}
                                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Nested replies - only show if not collapsed */}
                    {!isCollapsed &&
                        hasReplies &&
                        reply.replies?.map((nestedReply) => (
                            <ReplyThread
                                key={nestedReply.id}
                                reply={nestedReply}
                                depth={depth + 1}
                                onNameClick={onNameClick}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
