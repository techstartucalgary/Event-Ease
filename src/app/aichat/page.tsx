/* const events = [
  {
    id: 1,
    title: "Tech Conference 2023",
    description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
    date: "June 15-17, 2023",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=400",
    category: "technology",
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description: "Three days of amazing music performances across five stages with your favorite artists.",
    date: "July 8-10, 2023",
    location: "Austin, TX",
    image: "/placeholder.svg?height=200&width=400",
    category: "music",
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    description: "Taste exquisite dishes and wines from renowned chefs and vineyards around the world.",
    date: "August 5-6, 2023",
    location: "Chicago, IL",
    image: "/placeholder.svg?height=200&width=400",
    category: "food",
  },
] */

import { getAllEvents } from "@/lib/server/helpers/event";
import ChatPage from "./Chat";

export default async function AiChatPage() {
  const events = await getAllEvents();

  return <ChatPage events={events} />
}