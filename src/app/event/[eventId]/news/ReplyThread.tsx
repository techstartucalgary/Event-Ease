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
    const hasReplies = reply.replies && reply.replies.length > 0;

    return (
        <div className={`ml-${depth * 4} p-2 bg-gray-50 rounded-lg`}>
            <div className="flex justify-between items-center mb-2">
                <p
                    className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                    onClick={() => onNameClick(reply.author)}
                >
                    {reply.author}
                </p>
                <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="text-sm text-surface hover:underline"
                >
                    <i className="fas fa-reply"></i> Reply
                </button>
            </div>
            <p className="text-gray-700 mb-2">{reply.message}</p>

            {isReplying && (
                <div className="mt-2">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your reply..."
                        rows={2}
                    />
                    <button
                        onClick={() => {
                            setIsReplying(false);
                            setReplyText("");
                        }}
                        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
                    >
                        Submit
                    </button>
                </div>
            )}

            {hasReplies &&
                reply.replies?.map((nestedReply) => (
                    <ReplyThread
                        key={nestedReply.id}
                        reply={nestedReply}
                        depth={depth + 1}
                        onNameClick={onNameClick}
                    />
                ))}
        </div>
    );
}
