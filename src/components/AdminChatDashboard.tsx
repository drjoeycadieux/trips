'use client';

import { useState, useEffect } from 'react';

interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'support';
    timestamp: Date;
    userId?: string;
    responded?: boolean;
}

interface ChatSession {
    sessionId: string;
    userId: string;
    userEmail?: string;
    messages: ChatMessage[];
    lastActivity: Date;
    status: 'active' | 'waiting' | 'closed';
}

export default function AdminChatDashboard() {
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([
        {
            sessionId: '1',
            userId: 'user123',
            userEmail: 'user@example.com',
            messages: [
                {
                    id: 1,
                    text: "Hello! How can I help you with your trip planning today?",
                    sender: 'support',
                    timestamp: new Date(),
                    responded: true
                },
                {
                    id: 2,
                    text: "I'm having trouble creating a new trip. The form won't submit.",
                    sender: 'user',
                    timestamp: new Date(),
                    responded: false
                }
            ],
            lastActivity: new Date(),
            status: 'waiting'
        }
    ]); const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [showClosedSessions, setShowClosedSessions] = useState(false);

    // Quick response templates
    const quickResponses = [
        "Thanks for contacting us! I'm looking into your issue right now.",
        "I understand your concern. Let me help you with that.",
        "Could you provide more details about the problem you're experiencing?",
        "I've found a solution for you. Please try the following steps:",
        "Your issue has been resolved. Please let me know if you need anything else!",
        "I'm escalating this to our technical team. We'll get back to you within 24 hours."
    ];

    const sendResponse = (sessionId: string) => {
        if (!responseMessage.trim()) return;

        setChatSessions(prev => prev.map(session => {
            if (session.sessionId === sessionId) {
                const newMessage: ChatMessage = {
                    id: session.messages.length + 1,
                    text: responseMessage,
                    sender: 'support',
                    timestamp: new Date(),
                    responded: true
                };
                return {
                    ...session,
                    messages: [...session.messages, newMessage],
                    lastActivity: new Date(),
                    status: 'active' as const
                };
            }
            return session;
        }));

        setResponseMessage('');
    }; const closeSession = (sessionId: string) => {
        // Show confirmation dialog
        const confirmed = window.confirm('Are you sure you want to close this chat session?');

        if (confirmed) {
            setChatSessions(prev => prev.map(session =>
                session.sessionId === sessionId
                    ? { ...session, status: 'closed' as const }
                    : session
            ));

            // Clear the selected session if it's the one being closed
            if (selectedSession === sessionId) {
                setSelectedSession(null);
            }

            // Show success message
            alert('Chat session closed successfully!');
        }
    };

    const getUnreadCount = () => {
        return chatSessions.reduce((count, session) => {
            const unreadMessages = session.messages.filter(msg =>
                msg.sender === 'user' && !msg.responded
            );
            return count + unreadMessages.length;
        }, 0);
    };

    return (
        <div className="fixed inset-0 bg-gray-100 z-50">
            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800">Live Chat Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                {getUnreadCount()} unread messages
                            </span>                            <button
                                onClick={() => window.history.back()}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Close Dashboard
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex">
                    {/* Sessions List */}
                    <div className="w-1/3 bg-white border-r border-gray-200">                        <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-gray-800">Chat Sessions</h2>
                            <button
                                onClick={() => setShowClosedSessions(!showClosedSessions)}
                                className={`text-xs px-2 py-1 rounded ${showClosedSessions
                                        ? 'bg-gray-200 text-gray-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}
                            >
                                {showClosedSessions ? 'Hide Closed' : 'Show Closed'}
                            </button>
                        </div>
                    </div>                        <div className="overflow-y-auto">
                            {chatSessions
                                .filter(session => showClosedSessions ? true : session.status !== 'closed')
                                .map((session) => {
                                    const unreadCount = session.messages.filter(msg =>
                                        msg.sender === 'user' && !msg.responded
                                    ).length;

                                    return (
                                        <div
                                            key={session.sessionId}
                                            onClick={() => setSelectedSession(session.sessionId)}
                                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedSession === session.sessionId ? 'bg-blue-50 border-blue-200' : ''
                                                } ${session.status === 'closed' ? 'opacity-50' : ''}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {session.userEmail || `User ${session.userId}`}
                                                    </p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {session.messages[session.messages.length - 1]?.text || 'No messages'}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {session.lastActivity.toLocaleTimeString()}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${session.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                                                        session.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {session.status}
                                                    </span>
                                                    {unreadCount > 0 && (
                                                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                                                            {unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className="flex-1 flex flex-col">
                        {selectedSession ? (
                            <>
                                {(() => {
                                    const session = chatSessions.find(s => s.sessionId === selectedSession);
                                    if (!session) return null;

                                    return (
                                        <>
                                            {/* Chat Header */}
                                            <div className="p-4 border-b border-gray-200 bg-white">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">
                                                            {session.userEmail || `User ${session.userId}`}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            Session ID: {session.sessionId}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => closeSession(session.sessionId)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                                    >
                                                        Close Session
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Messages */}
                                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                                <div className="space-y-4">
                                                    {session.messages.map((message) => (
                                                        <div
                                                            key={message.id}
                                                            className={`flex ${message.sender === 'support' ? 'justify-end' : 'justify-start'}`}
                                                        >
                                                            <div
                                                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'support'
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-white text-gray-800 shadow-sm'
                                                                    }`}
                                                            >
                                                                <p>{message.text}</p>
                                                                <p className={`text-xs mt-1 ${message.sender === 'support' ? 'text-blue-100' : 'text-gray-500'
                                                                    }`}>
                                                                    {message.timestamp.toLocaleTimeString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Quick Responses */}
                                            <div className="p-4 bg-white border-t border-gray-200">
                                                <div className="mb-3">
                                                    <p className="text-sm font-medium text-gray-700 mb-2">Quick Responses:</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {quickResponses.map((response, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => setResponseMessage(response)}
                                                                className="text-left text-sm p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                                                            >
                                                                {response}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Response Input */}
                                                <div className="flex space-x-2">
                                                    <textarea
                                                        value={responseMessage}
                                                        onChange={(e) => setResponseMessage(e.target.value)}
                                                        placeholder="Type your response..."
                                                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                        rows={3}
                                                    />
                                                    <button
                                                        onClick={() => sendResponse(session.sessionId)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors self-end"
                                                    >
                                                        Send
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center bg-gray-50">
                                <div className="text-center">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Chat Session</h3>
                                    <p className="text-gray-600">Choose a chat session from the left panel to start responding to customers.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
