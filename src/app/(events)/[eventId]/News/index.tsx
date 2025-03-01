import { useState, useEffect } from "react";
import Announcement from "./Announcement";
import { Announcement as AnnouncementType } from "../types";
import { MOCK_ATTENDEES } from "../Attendees";

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

interface NewsFeedProps {
    onTabChange?: (tab: string) => void;
}

export default function NewsFeed({ onTabChange }: NewsFeedProps) {
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
            onTabChange?.("chats");
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
                <div className="mb-4">
                    <textarea
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Write your announcement..."
                        rows={3}
                    />
                    <button
                        onClick={handlePost}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-lg 
                                font-medium transition-all duration-300 hover:opacity-90
                                border border-white/10 shadow-lg hover:shadow-xl active:scale-95"
                    >
                        Submit
                    </button>
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
