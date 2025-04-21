import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "drx8yzv5hml65.cloudfront.net",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
