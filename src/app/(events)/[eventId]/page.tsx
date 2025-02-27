"use client";

import { useState } from "react";
import Layout from "@/app/(events)/[eventId]/index";
import NewsFeed from "@/app/(events)/[eventId]/News";
import AttendeesList from "@/app/(events)/[eventId]/Attendees";
import Chats from "@/app/(events)/[eventId]/Chats";
import EventInfo from "@/app/(events)/[eventId]/EventInfo";
import Notifications from "@/app/(events)/[eventId]/Notifications";

export default function EventDashboard() {
    const [activeTab, setActiveTab] = useState("news");

    const renderContent = () => {
        switch (activeTab) {
            case "news":
                return <NewsFeed />;
            case "itinerary":
                return <div>Itinerary Content</div>;
            case "chats":
                return <Chats />;
            case "notifications":
                return <Notifications />;
            case "attendees":
                return <AttendeesList onTabChange={setActiveTab} />;
            case "info":
                return <EventInfo />;
            case "register":
                return <div>Registration Content</div>;
            default:
                return <div>404 - Tab not found</div>;
        }
    };

    return (
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            {renderContent()}
        </Layout>
    );
}
