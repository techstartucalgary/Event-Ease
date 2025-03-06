"use client";

import Layout from "@/app/event/[eventId]/index";
import Notifications from "@/app/event/[eventId]/notifications";

export default function NotificationsPage() {
    return (
        <Layout activeTab="notifications">
            <Notifications />
        </Layout>
    );
}
