import Link from "next/link";
import Image from "next/image";
import { getEventById } from "@/lib/server/helpers/event";

type Props = {
    params: Promise<{ id: string }>
}
export default async function EventDetail({ params }: Props) {
    const { id } = await params;

    const event = await getEventById(id);

    if (!event) {
        return <div>Event not found</div>;
    }

    console.log("event", event);

    // Hardcoded event data for now
    /* const event = {
        id,
        name: "Google Cloud x MLB(TM) Hackathon",
        description:
            "Use Google Cloud's heavy-hitting data and AI lineup (Gemini, Imagen, Vertex AI... the whole roster!) and real data from Major League Baseball™ to build the future of fan engagement. Showcase your AI skills, craft impactful applications, and revolutionize how baseball fans experience the game.\n\nReady to hit a grand slam? Build a project using Google Cloud AI that revolutionizes MLB™ fan experience.\n\nLet's build the future of baseball together.",
        time: "TBD",
        price: "Free",
        image: "/images/tech.jpg",
        organizer: {
            name: "Company",
            type: "Organizer",
            image: "/images/tech.jpg",
        },
    }; */

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Back Button */}
            <Link
                href="/events"
                className="inline-flex items-center text-surface hover:opacity-80 transition-opacity mb-8"
            >
                ← Explore Events
            </Link>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Event Image Column */}
                <div className="relative w-full h-fit">
                    <div className="relative aspect-[3/2] w-full">
                        <Image
                            src={event.images[0]}
                            alt={event.name}
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>

                {/* Event Details Column */}
                <div className="flex flex-col gap-8">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-surface">
                        {event.name}
                    </h1>

                    {/* Key Details */}
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-500 uppercase tracking-wide">
                                Time
                            </p>
                            <p className="text-surface font-medium">
                                {event.startDate.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-500 uppercase tracking-wide">
                                Price
                            </p>
                            {/* <p className="text-surface font-medium">
                                {event.}
                            </p> */}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
                            About This Event
                        </h2>
                        <div className="space-y-4 text-surface">
                            {event.description
                                .split("\n\n")
                                .map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-gray-700 leading-relaxed"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                        </div>
                    </div>

                    {/* Register Button */}
                    <button className="w-full sm:w-auto px-8 bg-[#768a96] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity">
                        Register Now
                    </button>
                </div>
            </div>

            {/* Posted By Section - Moved outside the grid */}
            <div className="mt-12 pt-4 border-t border-gray-400">
                <p className="text-surface mb-2">Posted By:</p>
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            src={event.images[0]}
                            alt={event.creator}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-surface font-medium">
                            {event.creator}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {event.creatorType}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
