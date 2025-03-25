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
        return (
            <div className="max-w-2xl mx-auto text-center py-24 px-6">
                <h1 className="text-4xl font-bold text-surface mb-4">Event Not Found</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Sorry, we couldn&apos;t find the event you&apos;re looking for. It may have been removed or never existed.
                </p>

                <Link
                    href="/events"
                    className="inline-block bg-[#768a96] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                    ← Back to Events
                </Link>
            </div>
        );
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
                    <div className="flex flex-col leading-tight">
                        <h1 className="text-3xl font-bold text-surface mb-0">
                            {event.name}
                        </h1>
                        <p className="text-base text-gray-600">
                            {(() => {
                                const start = new Date(event.startDate);
                                const end = new Date(event.endDate);

                                const isSameDay =
                                start.getUTCFullYear() === end.getUTCFullYear() &&
                                start.getUTCMonth() === end.getUTCMonth() &&
                                start.getUTCDate() === end.getUTCDate();

                                const formatUTCDate = (date: Date) =>
                                date.toLocaleDateString("en-US", {
                                    timeZone: "UTC",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                });

                                const formatUTCTime = (date: Date) =>
                                date.toLocaleTimeString("en-US", {
                                    timeZone: "UTC",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                });

                                if (isSameDay) {
                                return `${formatUTCDate(start)} · ${formatUTCTime(start)} – ${formatUTCTime(end)}`;
                                } else {
                                return `${formatUTCDate(start)} · ${formatUTCTime(start)} – ${formatUTCDate(end)} · ${formatUTCTime(end)}`;
                                }
                            })()}
                        </p>





                    </div>


                    {/* Key Details */}
                    <div className="flex gap-x-16">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-500 uppercase tracking-wide">
                                Start Time
                            </p>
                            <p className="text-surface font-medium">
                                {new Date(event.startDate).toLocaleTimeString("en-US", {
                                    timeZone: "UTC",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
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
