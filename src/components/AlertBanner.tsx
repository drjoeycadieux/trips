'use client';

import { useState, useEffect } from 'react';

export default function AlertBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [weekNumber, setWeekNumber] = useState(1);

    useEffect(() => {
        // Calculate the current week number of the year
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const week = Math.ceil((((now.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7);
        setWeekNumber(week);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="bg-blue-600 text-white px-4 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p>
                        Security updates for Week {weekNumber} have been successfully installed. Your application is up to date.
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 ml-4 text-white hover:text-gray-200 transition-colors"
                >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
