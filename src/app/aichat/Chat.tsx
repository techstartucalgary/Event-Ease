"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, Bot, User } from "lucide-react"
import EventCard from "@/components/EventCard"
import RegistrationForm from "@/components/registration-form"
import { PopulatedEvent } from "@/lib/types/event"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"

export default function ChatPage({ events }: { events: PopulatedEvent[] }) {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {
                id: "welcome",
                role: "assistant",
                content:
                    "👋 Hi there! I'm your event assistant. I can help you find events based on your interests, location, or dates. What kind of events are you looking for today?",
            },
        ],
    })

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<any>(null)
    const [typingEffect, setTypingEffect] = useState(false)
    const [messageSent, setMessageSent] = useState(false)

    const handleRegisterClick = (event: any) => {
        setSelectedEvent(event)
        setShowRegistrationForm(true)
    }

    const handleRegistrationComplete = (formData: any) => {
        setShowRegistrationForm(false)
        // In a real app, you would submit this data to your backend
        console.log("Registration data:", formData, "for event:", selectedEvent)
    }

    // Animate when a message is sent
    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setMessageSent(true)
        setTimeout(() => setMessageSent(false), 300)
        handleSubmit(e)
    }

    // Scroll to bottom of chat when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        // Simulate typing effect for the latest assistant message
        if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
            setTypingEffect(true)
            const timeout = setTimeout(() => {
                setTypingEffect(false)
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [messages])

    // Process message content to detect event recommendation requests and filter events
    const renderMessageContent = (content: string) => {
        if (content.includes("Here are some events") || content.toLowerCase().includes("recommend")) {
            // Filter events based on content keywords
            const keywords = content.toLowerCase().split(/\s+/);
            const filteredEvents = events.filter(event => {
                // Check if any keywords match the event name, description, or location
                return keywords.some(keyword => 
                    (event.name && event.name.toLowerCase().includes(keyword)) || 
                    (event.description && event.description.toLowerCase().includes(keyword)) ||
                    (event.location && event.location.toLowerCase().includes(keyword)) ||
                    (event.tags && event.tags.some(tag => tag.toLowerCase().includes(keyword)))
                );
            });

            // Limit to max 4 events for better display
            const displayEvents = filteredEvents.length > 0 ? filteredEvents.slice(0, 4) : [];

            return (
                <div>
                    <div className="mb-4 prose prose-sm max-w-none">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                    
                    {displayEvents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-4 sm:gap-y-8 mt-6">
                            {displayEvents.map((event) => (
                                <motion.div 
                                    key={event._id} 
                                    className="w-full max-w-[280px] mx-auto sm:mx-0"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <EventCard 
                                        image={event.images?.[0] || "/placeholder.svg"} 
                                        name={event.name} 
                                        description={event.description}
                                        tags={event.tags || []}
                                        link={`/events/${event._id}`}
                                    />
                                </motion.div>
                            ))}
                            
                            {filteredEvents.length > 4 && (
                                <div className="text-left mt-4 text-sm text-gray-600 col-span-1 sm:col-span-2">
                                    + {filteredEvents.length - 4} more events found
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-4 bg-gray-50 rounded-lg mt-4">
                            <p className="text-gray-600">No matching events found based on your criteria.</p>
                            <p className="text-sm text-gray-500 mt-1">Try different keywords or ask for all events.</p>
                        </div>
                    )}
                </div>
            )
        }

        return (
            <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#EFEFE9]">
            <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 hide-scrollbar">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    className={`mb-5 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-start">
                                        {message.role === "assistant" && (
                                            <div className="bg-[#29353c] text-white p-2 rounded-full mr-2 flex-shrink-0 shadow-sm">
                                                <Bot size={16} />
                                            </div>
                                        )}
                                        <div
                                            className={`rounded-lg px-4 py-3 ${
                                                message.role === "user" 
                                                    ? "bg-[#523D35] text-white max-w-[80%] shadow-sm" 
                                                    : "bg-gray-100 text-gray-800 w-full max-w-[90%] md:max-w-[95%] shadow-sm"
                                            }`}
                                        >
                                            {renderMessageContent(message.content)}
                                            {typingEffect && message === messages[messages.length - 1] && message.role === "assistant" && (
                                                <span className="ml-1 inline-block">
                                                    <span className="typing-dot">.</span>
                                                    <span className="typing-dot">.</span>
                                                    <span className="typing-dot">.</span>
                                                </span>
                                            )}
                                        </div>
                                        {message.role === "user" && (
                                            <div className="bg-[#523D35] text-white p-2 rounded-full ml-2 flex-shrink-0 shadow-sm">
                                                <User size={16} />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {showRegistrationForm && selectedEvent && (
                            <motion.div 
                                className="mb-4 flex justify-start"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <div className="rounded-lg p-4 max-w-[80%] bg-gray-100 text-gray-800 shadow-sm">
                                    <h3 className="font-bold mb-2">Register for {selectedEvent.name}</h3>
                                    <RegistrationForm
                                        event={selectedEvent}
                                        onComplete={handleRegistrationComplete}
                                        onCancel={() => setShowRegistrationForm(false)}
                                    />
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <form onSubmit={handleChatSubmit} className="flex items-center space-x-2">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask about events, e.g., 'Find me tech events in San Francisco'"
                                className="flex-1 border-[#29353c] focus:ring-[#523D35] shadow-sm"
                                disabled={isLoading}
                            />
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                animate={messageSent ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
                            >
                                <Button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="bg-[#29353c] hover:bg-[#3e4a51] text-white shadow-sm"
                                >
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </motion.div>
                        </form>
                        <div className="mt-2 text-xs text-gray-500 text-center">
                            Try asking about specific events, locations, or dates
                        </div>
                    </div>
                </div>
            </main>
            
            <style jsx global>{`
                .typing-dot {
                    animation: typing 1.4s infinite;
                    display: inline-block;
                    opacity: 0;
                }
                
                .typing-dot:nth-child(1) {
                    animation-delay: 0s;
                }
                
                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                
                @keyframes typing {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
                
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                /* Styling for markdown content */
                .prose h1, .prose h2, .prose h3 {
                    color: #29353c;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                }
                
                .prose strong {
                    font-weight: 600;
                    color: #523D35;
                }
                
                .prose ul, .prose ol {
                    padding-left: 1.5rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                
                .prose li {
                    margin-bottom: 0.25rem;
                }
                
                .prose a {
                    color: #523D35;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    )
}