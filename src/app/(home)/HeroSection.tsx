export default function HeroSection() {
    return (
        <div className="HeroSection gradient-bg h-96 max-md:h-[30rem] flex flex-col items-center justify-center text-white text-center px-4">
            {/* Main Title with animation */}
            <h1
                className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in"
                style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
            >
                Welcome to EventEase
            </h1>

            {/* Subtitle with animation */}
            <div className="space-y-2 animate-fade-in-delayed">
                <p className="text-xl md:text-2xl font-light opacity-90">
                    Your event, one platform
                </p>
            </div>

            <div className="flex gap-4 mt-6 animate-fade-in-delayed">
                <button
                    className="px-8 py-3 bg-gradient-to-r from-white to-[#e2e8f0] text-[#101e2e] rounded-full 
                              font-semibold text-lg transition-all duration-300
                              hover:bg-opacity-90 hover:scale-105
                              border border-white/20 shadow-lg hover:shadow-xl"
                >
                    Get Started
                </button>

                <button
                    className="px-8 py-3 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-full 
                              font-semibold text-lg transition-all duration-300
                              hover:bg-opacity-90 hover:scale-105
                              border border-white/10 shadow-lg hover:shadow-xl"
                >
                    Explore Events
                </button>
            </div>
        </div>
    );
}
