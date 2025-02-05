import mongoose, { Schema, Document } from "mongoose";

const messageSchema: Schema = new Schema(
  {
    conversationId: { type: String, required: true },
    userMessage: { type: String, required: true },
    aiMessage: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
