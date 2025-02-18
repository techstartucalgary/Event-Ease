import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalProvider from "@/contexts";
import "@fortawesome/fontawesome-free/css/all.min.css";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "EventEase",
    description: "EventEase is a platform for creating and managing events.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} antialiased`}>
                <GlobalProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </GlobalProvider>
            </body>
        </html>
    );
}
