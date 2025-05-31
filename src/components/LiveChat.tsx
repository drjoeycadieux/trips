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
    }; const sendMessage = (e: React.FormEvent) => {
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

        // Smart auto-responses based on keywords
        setTimeout(() => {
            const userText = inputMessage.toLowerCase();
            let responseText = "";

            if (userText.includes('price') || userText.includes('cost') || userText.includes('payment')) {
                responseText = "Our trip planning service is completely free! You can create, edit, and manage unlimited trips at no cost. Is there anything specific about pricing you'd like to know?";
            } else if (userText.includes('help') || userText.includes('how') || userText.includes('tutorial')) {
                responseText = "I'd be happy to help! You can create a new trip by clicking 'New Trip', add details like destination and dates, and manage everything from your dashboard. Would you like me to walk you through any specific feature?";
            } else if (userText.includes('delete') || userText.includes('remove')) {
                responseText = "To delete a trip, go to the trip details page and click the 'Delete Trip' button. You'll get a confirmation prompt to make sure. Need help finding a specific trip?";
            } else if (userText.includes('edit') || userText.includes('change') || userText.includes('update')) {
                responseText = "You can edit any trip by clicking 'Edit' on the trip card or 'Edit Trip' on the trip details page. All your trip information can be updated anytime!";
            } else if (userText.includes('account') || userText.includes('register') || userText.includes('login')) {
                responseText = "You can create an account by clicking 'Register' in the top navigation. Already have an account? Just click 'Login'. Your trips are saved securely to your account.";
            } else if (userText.includes('bug') || userText.includes('error') || userText.includes('problem') || userText.includes('issue')) {
                responseText = "I'm sorry you're experiencing an issue! Could you describe what's happening? In the meantime, try refreshing the page or clearing your browser cache. I'll make sure our team looks into this.";
            } else if (userText.includes('thank') || userText.includes('thanks')) {
                responseText = "You're very welcome! I'm here whenever you need help with your trip planning. Happy travels! 🧳✈️";
            } else {
                responseText = "Thanks for your message! I understand you're asking about: '" + inputMessage + "'. Let me connect you with our support team for personalized assistance. In the meantime, you can explore our features or check out the help section.";
            }

            const supportResponse = {
                id: messages.length + 2,
                text: responseText,
                sender: 'support',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, supportResponse]);
        }, 1500);
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
                    </div>                    {/* Messages */}
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

                        {/* Quick Action Buttons - Show only if first message */}
                        {messages.length === 1 && (
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 text-center">Quick Help:</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setInputMessage("How do I create a new trip?")}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                                    >
                                        Create Trip
                                    </button>
                                    <button
                                        onClick={() => setInputMessage("How do I edit my trip?")}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                                    >
                                        Edit Trip
                                    </button>
                                    <button
                                        onClick={() => setInputMessage("I found a bug")}
                                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs hover:bg-red-200 transition-colors"
                                    >
                                        Report Issue
                                    </button>
                                </div>
                            </div>
                        )}
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
