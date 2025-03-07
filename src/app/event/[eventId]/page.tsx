"use client";

import Layout from "@/app/event/[eventId]/index";
import NewsFeed from "@/app/event/[eventId]/news";

export default function EventDashboard() {
    return (
        <Layout activeTab="news">
            <NewsFeed />
        </Layout>
    );
}
