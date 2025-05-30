'use client';

import { useState } from 'react';

export default function LiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! How can I help you with your trip planning today?",
            sender: 'support',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');

        // Simulate support response
        setTimeout(() => {
            const supportResponse = {
                id: messages.length + 2,
                text: "Thanks for your message! Our support team will get back to you shortly. In the meantime, you can browse our help section or continue planning your trips.",
                sender: 'support',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, supportResponse]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            <span className="font-medium">Live Support</span>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Chat Button (Bulb Icon) */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-4 right-4 w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center z-40 ${isOpen ? 'rotate-12' : 'hover:scale-110'
                    }`}
            >
                <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2C9.24 2 7 4.24 7 7c0 2.38 1.64 4.38 3.86 4.9l-.86 4.1h2l.89-4.1C14.36 11.38 16 9.38 16 7c0-2.76-2.24-5-5-5zm-2 17h4v2h-4v-2z" />
                    <circle cx="12" cy="7" r="3" opacity="0.3" />
                </svg>

                {/* Notification dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>
        </>
    );
}
