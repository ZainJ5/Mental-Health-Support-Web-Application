// app/api/mood/predict/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import MoodLog from '../../../models/MoodLog';

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    const { stress, happiness, energy, focus, calmness, description, date } = data;

    const userMessage = `Mood data for ${date}:
Stress: ${stress}
Happiness: ${happiness}
Energy: ${energy}
Focus: ${focus}
Calmness: ${calmness}
Additional notes: ${description}

Please provide an analysis or prediction based on this mood data.`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API responded with status ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const prediction = aiData?.choices?.[0]?.message?.content || "No prediction available.";

    const moodLog = new MoodLog({
      stress,
      happiness,
      energy,
      focus,
      calmness,
      description,
      date,
      prediction,
      createdAt: new Date()
    });
    await moodLog.save();

    return NextResponse.json({ prediction }, { status: 200 });
  } catch (error: any) {
    console.error("Error processing mood data:", error);
    return NextResponse.json(
      { message: "Error processing mood data", error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
