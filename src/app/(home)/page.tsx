import ContentSection from "./ContentSection";
import HeroSection from "./HeroSection";

export default function Home() {
    return (
        <div className="relative">
            {/* Hero Section */}
            <HeroSection />

            {/* Button Positioned Between Hero & Content */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[100vh] z-10">
                <a href="#content-section">
                    <button className="bg-[#DFEBF6] text-[#223030] px-6 py-3 rounded-full shadow-lg text-lg font-semibold transition">
                        Explore Events
                    </button>
                </a>
            </div>

            {/* Content Section with ID for Scroll Target */}
            <div id="content-section">
                <ContentSection />
            </div>
        </div>
    );
}
