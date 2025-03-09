"use client";

import { useState } from "react";
import { Attendee } from "../types";
import AttendeeCard from "./AttendeeCard";
import { useRouter, useParams } from "next/navigation";
import { MOCK_ATTENDEES } from "@/lib/helpers";

export default function AttendeesList() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const params = useParams();
    const eventId = params.eventId;

    const filteredAttendees = MOCK_ATTENDEES.filter((attendee) => {
        return (
            attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attendee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleMessageClick = (attendee: Attendee) => {
        // Store the selected attendee in localStorage
        localStorage.setItem("selectedChatUser", JSON.stringify(attendee));

        // Otherwise, navigate directly to the chats page
        router.push(`/event/${eventId}/chats`);
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