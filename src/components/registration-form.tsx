"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"
import { PopulatedEvent } from "@/lib/types/event"

interface RegistrationFormProps {
  event: PopulatedEvent
  onComplete: (formData: unknown) => void
  onCancel: () => void
}

export default function RegistrationForm({ event, onComplete, onCancel }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Notify parent after a brief delay to show success state
      setTimeout(() => {
        onComplete(formData)
      }, 1500)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-center">Registration Complete!</h3>
        <p className="text-center text-gray-600 mt-2">
          {`You're all set for ${event.name}. Check your email for confirmation details.`}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any dietary restrictions or accessibility needs?"
          rows={3}
        />
      </div>

      <div className="flex space-x-2 pt-2">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Complete Registration"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  )
}