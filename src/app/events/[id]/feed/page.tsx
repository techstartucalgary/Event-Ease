"use client";

import { useState, useEffect } from "react";
import Announcement from "./Announcement";
import { Announcement as AnnouncementType } from "./types";
import { MOCK_ATTENDEES } from "@/lib/helpers";

// Mock data - replace with real data fetching
const MOCK_ANNOUNCEMENTS: AnnouncementType[] = [
    {
        id: 1,
        message:
            "Hackathon starts now! Good Luck. Submissions are due tomorrow at 2pm.",
        timestamp: "Jan 22, 9:00AM",
        author: "Sarah Johnson",
        organization: "Event Organizer",
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
                        author: "Sarah Johnson",
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
        author: "Eva Martinez",
        organization: "Event Staff",
        replies: [],
    },
    {
        id: 3,
        message:
            "TAs logging off for the day. Reminder submissions are due tomorrow at 2pm and judging is at 3pm.",
        timestamp: "Jan 22, 8:00PM",
        author: "Mike Wilson",
        organization: "Teaching Assistant",
        replies: [],
    },
];

export default function NewsFeed() {
    const [announcements] = useState<AnnouncementType[]>(MOCK_ANNOUNCEMENTS);
    const [timeRemaining, setTimeRemaining] = useState({
        hours: 17,
        minutes: 45,
        seconds: 20,
    });
    const [isPosting, setIsPosting] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (num: number) => num.toString().padStart(2, "0");

    const handlePost = () => {
        if (newAnnouncement.trim()) {
            console.log("New Announcement:", newAnnouncement);
            setNewAnnouncement("");
            setIsPosting(false);
        }
    };

    const handleNameClick = (author: string) => {
        const attendee = MOCK_ATTENDEES.find((a) => a.name === author);
        if (attendee) {
            localStorage.setItem("selectedChatUser", JSON.stringify(attendee));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        News Feed
                    </h2>
                    <div className="flex gap-4 text-sm mt-1">
                        <p className="text-gray-500">
                            {formatTime(timeRemaining.hours)}h:
                            {formatTime(timeRemaining.minutes)}m:
                            {formatTime(timeRemaining.seconds)}s remaining
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsPosting(!isPosting)}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-lg 
                                font-medium transition-all duration-300 hover:opacity-90
                                border border-white/10 shadow-lg hover:shadow-xl active:scale-95"
                >
                    Post
                </button>
            </div>

            {isPosting && (
                <div className="mb-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-100 text-tertiary rounded-full flex items-center justify-center">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>

                    <textarea
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent resize-none transition-all duration-200"
                        placeholder="Share an announcement with attendees..."
                        rows={4}
                    />

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsPosting(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePost}
                                disabled={!newAnnouncement.trim()}
                                className="px-6 py-2 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-lg 
                                        font-medium transition-all duration-300 hover:opacity-90
                                        border border-white/10 shadow-lg hover:shadow-xl active:scale-95
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Post Announcement
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {announcements.map((announcement) => (
                <Announcement
                    key={announcement.id}
                    announcement={announcement}
                    onNameClick={handleNameClick}
                />
            ))}
        </div>
    );
}
