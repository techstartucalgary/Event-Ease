import EventCard from "@/components/EventCard";

export default function ContentSection() {
    return (
        <div className="ContentSection bg-[#EFEFE9] text-[#523D35] px-6">
            {/* Top Events Section */}
            <div className="topEvents container mx-auto">
                {/* Align TOP EVENTS with the first card */}
                <h2 className="text-2xl text-left mb-6 pt-6 w-full">
                    TOP EVENTS
                </h2>

                {/* Responsive Grid Layout - filled with dummy data temporarily*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <EventCard
                        image="/images/tech.jpg"
                        name="Tech Conference 2025"
                        description="Join industry leaders discussing the future of AI and technology."
                        tags={["Technology", "AI", "Networking"]}
                        link="/events/eventlink"
                    />
                    <EventCard
                        image="/images/hackathon.png"
                        name="Global AI Hackathon 2025"
                        description="Compete in a 48-hour AI hackathon and build cutting-edge solutions with a team of innovators."
                        tags={["Hackathon", "AI", "Competition"]}
                        link="/events/eventlink"
                    />
                    <EventCard
                        image="/images/startup.jpg"
                        name="Startup Pitch Night"
                        description="Pitch your startup idea to investors and network with entrepreneurs in the industry."
                        tags={["Startups", "Entrepreneurship", "Investment"]}
                        link="/events/eventlink"
                    />
                    <EventCard
                        image="/images/networking.jpg"
                        name="Tech Networking Mixer"
                        description="Meet tech professionals, developers, and recruiters to expand your network in the industry."
                        tags={["Networking", "Career", "Tech"]}
                        link="/events/eventlink"
                    />
                </div>
            </div>

            {/* App Description Section */}
            <div className="appDescription text-center mx-auto mt-12 pb-10 space-y-12 text-[#523D35]">
                {/* Section 1 */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center gap-3 text-xl font-medium">
                        <i className="bi bi-pencil text-xl"></i>
                        <h3>Create Memorable Experiences</h3>
                    </div>
                    <p className="max-w-3xl mx-auto text-gray-700 text-base leading-relaxed">
                        {`Easily create, manage, and share your events. Our intuitive platform streamlines event planning 
                        so you can focus on what matters most – connecting with your audience. 
                        Whether it's a small gathering or a large conference, our tools help you bring your vision to life effortlessly.`}
                    </p>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center gap-3 text-xl font-medium">
                        <i className="fas fa-users text-xl"></i>
                        <h3>Be Part of the Experience</h3>
                    </div>
                    <p className="max-w-3xl mx-auto text-gray-700 text-base leading-relaxed">
                        Discover events that matter to you. Whether it’s a
                        conference, workshop, or social gathering, joining an
                        event has never been easier. Stay updated on upcoming
                        events, engage with organizers, and ensure you never
                        miss out on meaningful experiences.
                    </p>
                </div>
            </div>
        </div>
    );
}
