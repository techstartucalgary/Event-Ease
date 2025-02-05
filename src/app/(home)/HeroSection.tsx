export default function HeroSection() {
    return (
        <div 
            className="HeroSection gradient-bg h-screen flex flex-col items-center justify-center text-[white] text-center"
        >
            {/* Main Title */}
            <h3 className="text-4xl font-semibold">Welcome to EventEase</h3>
            
            {/* Subtitle */}
            <p className="text-2xl mt-2 opacity-90">
                Your event, one platform: <br />
                simplify, host, connect
            </p>
        </div>
    );
}