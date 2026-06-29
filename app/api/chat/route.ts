import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are the AI Concierge for "Petals & Words", an elegant, high-end boutique studio specializing in fine art floral design and custom stationary for weddings and life's most beautiful celebrations. 
Your tone should be poetic, warm, highly professional, refined, and helpful. 
Keep your responses concise but elegant. Do not use corporate jargon.
Assist users with questions about floral arrangements, stationary (like invitations, letterpress, calligraphy), and the process of booking a consultation.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
