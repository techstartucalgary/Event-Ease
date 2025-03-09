import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Event {
    name: string;
    description: string;
    time: string;
    location: string;
}

export default function EventInfo() {
    const { eventId } = useParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        // Fetch event details from an API or mock data
        const fetchEventDetails = async () => {
            // Replace with actual API call
            const eventData = {
                name: "Sample Event",
                description: "This is a sample event description.",
                time: "10:00 AM - 4:00 PM",
                location: "123 Event Street, City",
            };
            setEvent(eventData);
        };

        fetchEventDetails();
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">{event.name}</h2>
            <p className="mt-2 text-gray-600">{event.description}</p>
            <div className="mt-4">
                <p>
                    <strong>Time:</strong> {event.time}
                </p>
                <p>
                    <strong>Location:</strong> {event.location}
                </p>
            </div>
        </div>
    );
}
