import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // System prompt to guide the AI to recommend events and handle registration requests
  const systemPrompt = `
    You are an event recommendation assistant. Help users find events based on their interests, 
    location, or dates. When recommending events, mention "Here are some events" in your response 
    to trigger the event display.
    
    If the user wants to register for an event, encourage them to click the "Register Now" button 
    on the event card.
    
    Keep your responses friendly, helpful, and concise. Don't make up specific event details 
    beyond what's shown in the UI.
  `

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: systemPrompt,
  })

  return result.toDataStreamResponse()
}