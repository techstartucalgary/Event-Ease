"use client";

import Layout from "@/app/event/[eventId]/index";
import AttendeesList from "@/app/event/[eventId]/attendees";

export default function AttendeesPage() {
    return (
        <Layout activeTab="attendees">
            <AttendeesList />
        </Layout>
    );
}
