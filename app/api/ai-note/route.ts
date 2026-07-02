import { NextResponse } from 'next/server'
import { z } from 'zod'

const aiNoteSchema = z.object({
  occasion: z.string(),
  tone: z.string(),
  fromName: z.string().optional(),
  toName: z.string().optional(),
  existingNote: z.string().optional(),
  action: z.enum(['generate', 'shorten', 'warmer']).default('generate')
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const parseResult = aiNoteSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Missing required fields', details: parseResult.error.errors },
        { status: 400 }
      )
    }

    const { occasion, tone, fromName, toName, existingNote, action } = parseResult.data
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'AI service configuration error' }, { status: 500 })
    }

    let systemPrompt = ''

    if (action === 'generate') {
      systemPrompt = `Write a short bouquet note (2-4 sentences, max 180 characters) for a ${occasion} occasion in a ${tone} tone. `
      if (fromName) systemPrompt += `signed from ${fromName}. `
      if (toName) systemPrompt += `addressed to ${toName}. `
      systemPrompt += `Sound like a real caring person. No clichés. No em dashes.`
    } else if (action === 'shorten') {
      systemPrompt = `Make this note shorter (max 100 characters) while keeping the same warmth: ${existingNote || ''}`
    } else if (action === 'warmer') {
      systemPrompt = `Make this note more personal and warm while keeping it brief: ${existingNote || ''}`
    }

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    })

    if (!res.ok) {
      const errorData = await res.text()
      console.error('Gemini API Error:', errorData)
      return NextResponse.json({ error: 'Failed to generate note from AI service' }, { status: 502 })
    }

    const data = await res.json()
    const generatedNote = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''

    return NextResponse.json({ note: generatedNote })
  } catch (error) {
    console.error('Server error generating AI note:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
