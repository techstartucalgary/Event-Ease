import { useState } from "react";
import { Attendee } from "../types";
import AttendeeCard from "./AttendeeCard";

const MOCK_ATTENDEES: Attendee[] = [
    {
        id: "1",
        name: "Alice Chen",
        role: "Developer",
        email: "alice@example.com",
        team: "Team Innovate",
        checkInTime: "9:30 AM",
    },
    {
        id: "2",
        name: "Bob Smith",
        role: "Designer",
        email: "bob@example.com",
        team: "Team Innovate",
        checkInTime: "9:45 AM",
    },
    {
        id: "3",
        name: "Sarah Johnson",
        role: "Product Manager",
        email: "sarah@example.com",
        team: "Team Create",
        checkInTime: "10:15 AM",
    },
    {
        id: "4",
        name: "Mike Wilson",
        role: "Marketing",
        email: "mike@example.com",
        team: "Team Create",
        checkInTime: "10:15 AM",
    },
    {
        id: "5",
        name: "Eva Martinez",
        role: "Developer",
        email: "eva@example.com",
        team: "Team Create",
        checkInTime: "9:15 AM",
    },
];

interface AttendeesListProps {
    onTabChange?: (tab: string) => void;
}

export default function AttendeesList({ onTabChange }: AttendeesListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAttendees = MOCK_ATTENDEES.filter((attendee) => {
        return (
            attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attendee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleMessageClick = (attendee: Attendee) => {
        // Store the selected attendee in localStorage or state management
        localStorage.setItem("selectedChatUser", JSON.stringify(attendee));
        // Switch to the chats tab
        onTabChange?.("chats");
    };

    const handleExportClick = () => {
        // Create CSV header
        const headers = ["Name", "Role", "Email", "Team", "Check-in Time"];

        // Convert attendees to CSV rows
        const csvRows = [
            headers,
            ...MOCK_ATTENDEES.map((attendee) => [
                attendee.name,
                attendee.role,
                attendee.email,
                attendee.team,
                attendee.checkInTime,
            ]),
        ];

        // Convert to CSV string
        const csvString = csvRows.map((row) => row.join(",")).join("\n");

        // Create blob and download
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "attendees.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Attendees
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {MOCK_ATTENDEES.length} total attendees
                    </p>
                </div>
                <button
                    onClick={handleExportClick}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-lg 
                                font-medium transition-all duration-300 hover:opacity-90
                                border border-white/10 shadow-lg hover:shadow-xl active:scale-95
                                flex items-center gap-2"
                >
                    <i className="fas fa-table"></i>
                    Export
                </button>
            </div>

            <input
                type="text"
                placeholder="Search attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />

            <div className="space-y-3">
                {filteredAttendees.map((attendee) => (
                    <AttendeeCard
                        key={attendee.id}
                        attendee={attendee}
                        onMessageClick={handleMessageClick}
                    />
                ))}
                {filteredAttendees.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                        No attendees found matching your search.
                    </p>
                )}
            </div>
        </div>
    );
}
