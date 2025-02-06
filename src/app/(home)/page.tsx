import ContentSection from "./ContentSection";
import HeroSection from "./HeroSection";

export default function Home() {
    return (
        <div className="relative">
            {/* Hero Section */}
            <HeroSection />

            {/* Content Section with ID for Scroll Target */}
            <div id="content-section">
                <ContentSection />
            </div>
        </div>
    );
}
