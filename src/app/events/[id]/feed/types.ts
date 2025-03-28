export interface Reply {
    id: number;
    message: string;
    author: string;
    timestamp: string;
    replies?: Reply[];
}

export interface Announcement {
    id: number;
    message: string;
    timestamp: string;
    author: string;
    organization?: string;
    replies: Reply[];
}

export interface SidebarItem {
    id: string;
    label: string;
    icon: string;
}

export interface Attendee {
    id: string;
    name: string;
    role: string;
    email: string;
    team?: string;
    avatar?: string;
    checkInTime?: string;
}

export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: string;
    read: boolean;
}

export interface Chat {
    id: string;
    participants: Attendee[];
    messages: Message[];
    lastMessage?: Message;
    unreadCount: number;
}
