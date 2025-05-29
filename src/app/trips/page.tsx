import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function TripsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/login');
    }

    const trips = await prisma.trip.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            startDate: 'asc',
        },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Trips</h1>
                <Link
                    href="/trips/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    New Trip
                </Link>
            </div>

            {trips.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">You haven't planned any trips yet.</p>
                    <Link
                        href="/trips/new"
                        className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
                    >
                        Plan your first trip
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {trips.map((trip) => (
                        <div
                            key={trip.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                                <p className="text-gray-600 mb-4">{trip.description}</p>
                                <div className="text-sm text-gray-500">
                                    <p>
                                        <span className="font-medium">Location:</span> {trip.location}
                                    </p>
                                    <p>
                                        <span className="font-medium">Dates:</span>{' '}
                                        {new Date(trip.startDate).toLocaleDateString()} -{' '}
                                        {new Date(trip.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <Link
                                        href={`/trips/${trip.id}`}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        href={`/trips/${trip.id}/edit`}
                                        className="text-gray-500 hover:text-gray-600"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
