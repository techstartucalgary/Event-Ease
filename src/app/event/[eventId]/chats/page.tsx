"use client";

import Layout from "@/app/event/[eventId]/index";
import Chats from "@/app/event/[eventId]/chats";

export default function ChatsPage() {
    return (
        <Layout activeTab="chats">
            <Chats />
        </Layout>
    );
}
