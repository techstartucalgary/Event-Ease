"use client";

import EventCard from "@/components/EventCard";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Event Director, TechCorp",
        image: "/images/testimonials/sarah.jpg",
        quote: "EventEase transformed how we manage our tech conferences. The analytics and automation features are game-changing.",
    },
    {
        name: "Marcus Rodriguez",
        role: "Startup Founder",
        image: "/images/testimonials/marcus.jpg",
        quote: "From ideation to execution, EventEase made our launch event seamless. The platform's intuitive design is perfect.",
    },
    {
        name: "Bob Smith",
        role: "Community Manager",
        image: "/images/testimonials/bob.jpg",
        quote: "The attendee engagement tools helped us create more meaningful connections at our networking events while also making it easier to manage the event.",
    },
];

const partners = [
    { name: "TechStart", logo: "/images/partners/techstart.png" },
    { name: "Google", logo: "/images/partners/google.png" },
    { name: "Meta", logo: "/images/partners/meta.png" },
    { name: "Apple", logo: "/images/partners/apple.svg" },
    { name: "Amazon", logo: "/images/partners/amazon.png" },
];

export default function ContentSection() {
    return (
        <div className="ContentSection">
            {/* Featured Events Section */}
            <div className="bg-gradient-to-b from-[#f8f8f5] to-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-bold text-[#2D3436]">
                            Featured Events
                        </h2>
                        <a
                            href="/explore"
                            className="text-[#5D6D7E] hover:text-[#34495E] transition-colors"
                        >
                            View all events →
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                            description="Compete in a 48-hour AI hackathon and build cutting-edge solutions."
                            tags={["Hackathon", "AI", "Competition"]}
                            link="/events/eventlink"
                        />
                        <EventCard
                            image="/images/startup.jpg"
                            name="Startup Pitch Night"
                            description="Pitch your startup idea to investors and network with entrepreneurs."
                            tags={["Startups", "Entrepreneurship"]}
                            link="/events/eventlink"
                        />
                        <EventCard
                            image="/images/networking.jpg"
                            name="Tech Networking Mixer"
                            description="Meet tech professionals, developers, and recruiters in the industry."
                            tags={["Networking", "Career", "Tech"]}
                            link="/events/eventlink"
                        />
                    </div>
                </div>
            </div>

            {/* Features Section with Enhanced Visual Elements */}
            <div className="bg-gradient-to-b from-white to-[#f8f8f5]">
                <div className="container mx-auto px-6 py-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-center mb-20 text-[#2D3436]"
                    >
                        Why Choose EventEase
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#768a96] to-[#627885] rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-calendar-check text-white text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Seamless Planning
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Intuitive tools and workflows that make event
                                planning effortless. From registration to
                                follow-ups, we've got you covered.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#768a96] to-[#627885] rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-chart-line text-white text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Insightful Analytics
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Make data-driven decisions with comprehensive
                                analytics. Track attendance, engagement, and ROI
                                in real-time.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#768a96] to-[#627885] rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Secure & Reliable
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Enterprise-grade security and 99.9% uptime
                                guarantee. Your events and data are always safe
                                with us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Testimonials Section */}
            <div className="bg-[#2D3436] text-white py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-8">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-[#34495E] p-8 rounded-xl hover:shadow-xl transition-all duration-300"
                            >
                                {/* Quote Icon */}
                                <div className="mb-6">
                                    <i className="fas fa-quote-left text-3xl text-[#768a96]"></i>
                                </div>

                                {/* Quote Text */}
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-400">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* New Partners Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8 text-[#2D3436]">
                        Trusted by Industry Leaders
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-12">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="w-40 h-20 relative grayscale hover:grayscale-0 transition-all duration-300"
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Stats Section */}
            <div className="bg-gradient-to-r from-[#2D3436] to-[#34495E] text-white py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#768a96] mb-2">
                                500K+
                            </div>
                            <div className="text-gray-100">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#768a96] mb-2">
                                50K+
                            </div>
                            <div className="text-gray-100">Events Hosted</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#768a96] mb-2">
                                98%
                            </div>
                            <div className="text-gray-100">
                                Satisfaction Rate
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#768a96] mb-2">
                                40+
                            </div>
                            <div className="text-gray-100">Countries</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="bg-gradient-to-b from-[#f8f8f5] to-white py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to Host Your Event?
                    </h2>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                        Join thousands of event organizers who trust EventEase
                        to create memorable experiences.
                    </p>
                    <button className="bg-[#768a96] text-white px-8 py-3 rounded-lg hover:bg-[#627885] transition-colors">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
}
