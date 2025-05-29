'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
    const { data: session } = useSession();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            TripPlanner - For Everyone
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {session ? (
                            <>
                                <Link href="/trips" className="text-gray-600 hover:text-gray-900">
                                    My Trips
                                </Link>
                                <Link href="/trips/new" className="text-gray-600 hover:text-gray-900">
                                    New Trip
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
