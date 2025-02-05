import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Message from "../../../models/messageModel";  
import connectDB from "@/lib/mongoose";  

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const conversationId = params.id;  

        if (!conversationId) {
            return NextResponse.json({ error: "Please provide a valid conversationId" }, { status: 400 });
        }

        
        await connectDB();
        
        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

        if (messages.length === 0) {
            return NextResponse.json({ message: "No messages found for this conversation" }, { status: 404 });
        }

        return NextResponse.json({ conversationId, messages });
    } catch (error: any) {
        return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
    }
}
