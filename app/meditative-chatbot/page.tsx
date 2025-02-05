'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to MentalHealthBot, a safe and supportive space where you can share your thoughts and feelings without fear of judgement. How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseMessage = (message: string) => {
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
      .replace(/\n/g, '<br />') 
      .replace(/^\d+\.\s*(.*)$/gm, '<li>$1</li>'); 
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || loading) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: newMessage }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to fetch response');

      const botMessage = {
        id: messages.length + 2,
        text: data.response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messages.length + 2,
          text: 'I apologize, but I seem to be having trouble connecting. Could you please try again?',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-md px-6 py-4">
        <div className="flex items-center max-w-7xl mx-auto">
          <div className="bg-blue-500 p-2 rounded-full">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold ml-3 text-gray-800">Mental Health Support</h1>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 py-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold mr-3">
                    AI
                  </div>
                )}
                <div
                  className={`relative max-w-[80%] rounded-2xl px-6 py-4 ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: parseMessage(message.text) }}
                  ></p>
                  <span
                    className={`absolute bottom-1 right-3 text-xs ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                    <span className="text-gray-600 font-semibold">You</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center max-w-4xl mx-auto">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 p-4 border border-gray-200 rounded-l-xl focus:outline-none focus:border-blue-500 transition-colors"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-r-xl transition-colors flex items-center justify-center min-w-[100px]"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="ml-2 hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
