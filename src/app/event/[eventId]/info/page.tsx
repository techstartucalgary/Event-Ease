"use client";

import Layout from "@/app/event/[eventId]/index";
import EventInfo from "@/app/event/[eventId]/event-info";

export default function EventInfoPage() {
    return (
        <Layout activeTab="info">
            <EventInfo />
        </Layout>
    );
}
