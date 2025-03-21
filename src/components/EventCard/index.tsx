"use client"; // Convert this component to a Client Component

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function EventCard({ image, name, description, tags, link }: { 
    image: string; 
    name: string; 
    description: string; 
    tags: string[]; 
    link: string;
}) {
    console.log("image", image);
    const router = useRouter(); // For navigating on tag click

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            {/* Wrap Only the Clickable Part in Link */}
            <Link href={link} passHref>
                <div className="cursor-pointer">
                    {/* Event Image */}
                    <div className="relative w-full h-48">
                        <Image src={image} alt={name} fill className="object-cover w-full h-full" />
                    </div>

                    {/* Event Details */}
                    <div className="p-4 text-[#523D35]">
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                </div>
            </Link>

            {/* Event Tags - Separate from Link */}
            <div className="p-4 flex flex-wrap gap-2 border-t border-gray-100">
                {tags.map((tag, index) => (
                    <button 
                        key={index} 
                        className="bg-[#EFEFE9] text-[#523D35] text-xs font-medium px-3 py-1 rounded-full hover:bg-[#d6d6c2] transition"
                        onClick={() => router.push(`/events?tag=${tag}`)} // Navigate to filtered events
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}
