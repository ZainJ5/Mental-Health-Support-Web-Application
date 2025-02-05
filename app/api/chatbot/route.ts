import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import mongoose from "mongoose";
import Message from "../../models/messageModel"; 
import connectDB from "@/lib/mongoose"; 

const SYS_PROMPT = `
You are a compassionate and knowledgeable mental health assistant. Your role is to provide supportive, informative, and empathetic responses to users seeking guidance on mental well-being. 
You offer evidence-based advice, self-care strategies, coping mechanisms, and resources while maintaining a non-judgmental and encouraging tone.

- You do not diagnose medical conditions, prescribe medication, or provide emergency crisis intervention. 
- If a user is in distress, gently encourage them to seek professional help or contact emergency services.  
`;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

const MONGO_URI = process.env.MONGO_URI as string;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { query, conversationId } = body;

        if (!query) {
            return NextResponse.json({ error: "Please provide a query in the request body" }, { status: 400 });
        }

        await connectDB();

        const llmResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYS_PROMPT },
                { role: "user", content: query },
            ],
        });

        const aiResponse = llmResponse.choices[0].message.content;

        const newConversationId = conversationId || new mongoose.Types.ObjectId().toString();

        const message = new Message({
            conversationId: newConversationId,
            userMessage: query,
            aiMessage: aiResponse,
        });

        await message.save(); 

        return NextResponse.json({
            conversationId: newConversationId,
            query,
            response: aiResponse,
        });
    } catch (error: any) {
        return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
    }
}
