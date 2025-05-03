"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"

interface EventCardProps {
  event: {
    id: number
    title: string
    description: string
    date: string
    location: string
    image: string
  }
  onRegister: () => void
}

export default function EventCard({ event, onRegister }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            {event.date}
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="mr-2 h-4 w-4" />
            {event.location}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onRegister} className="w-full">
          Register Now
        </Button>
      </CardFooter>
    </Card>
  )
}
