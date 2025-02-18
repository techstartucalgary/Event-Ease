"use client";
import { useState } from "react";
import EventCard from "@/components/EventCard"; // Ensure the path is correct

export default function ExploreEvents() {
    const [searchTerm, setSearchTerm] = useState("");
    const events = [
        {
            image: "/images/tech.jpg",
            name: "Tech Conference 2025",
            description: "Join industry leaders for an immersive experience.",
            tags: ["Tech", "Conference"],
            link: "/events/tech-conference-2025",
        },
        {
            image: "/images/hackathon.png",
            name: "Startup Pitch Night",
            description:
                "Compete in a 48-hour AI hackathon and build cutting-edge solutions with a team of innovators.",
            tags: ["Hackathon", "AI", "Competition"],
            link: "/events/startup-pitch-night",
        },
        {
            image: "/images/startup.jpg",
            name: "Startup Pitch Night",
            description:
                "Pitch your startup idea to investors and network with entrepreneurs in the industry.",
            tags: ["Startups", "Entrepreneurship", "Investment"],
            link: "/events/startup-pitch-night",
        },
        {
            image: "/images/networking.jpg",
            name: "Tech Networking Mixer",
            description:
                "Meet tech professionals, developers, and recruiters to expand your network in the industry.",
            tags: ["Networking", "Career", "Tech"],
            link: "/events/tech-networking-mixer",
        },
    ];

    // Filtered events based on search term
    const filteredEvents = events.filter(
        (event) =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            event.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    return (
        <div className="max-w-[90%] mx-auto py-6 px-4 md:px-8 lg:px-16">
            {/* Title + search*/}
            <div className="w-full max-w-[1200px] mx-auto">
                <h1 className="text-3xl font-bold text-[#523D35] mb-4">
                    Explore Events
                </h1>
                <input
                    type="text"
                    placeholder="Search for events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-[1100px] p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#523D35]"
                />
            </div>

            {/* ✅ Responsive Grid Layout - Moves to 3 Cards per Row at 1300px */}
            <div className="flex flex-wrap justify-center gap-6">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <div
                            key={index}
                            className="w-full max-w-[350px] flex justify-center"
                        >
                            <EventCard {...event} />
                        </div>
                    ))
                ) : (
                    <p className="w-full text-gray-500 text-center">
                        No events found.
                    </p>
                )}
            </div>
        </div>
    );
}
