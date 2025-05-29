import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import DeleteTripButton from '@/components/DeleteTripButton';

async function getTripData(id: string, userId: string) {
    const trip = await prisma.trip.findUnique({
        where: {
            id: id,
            userId: userId,
        },
    });
    return trip;
}

export default async function TripPage({
    params,
}: {
    params: { id: string };
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/login');
    }

    const trip = await getTripData(params.id, session.user.id);

    if (!trip) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold mb-4">Trip Not Found</h1>
                <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist or you don't have access to it.</p>
                <Link href="/trips" className="text-blue-500 hover:text-blue-600">
                    Back to My Trips
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{trip.title}</h1>
                <div className="space-x-4">
                    <Link
                        href={`/trips/${trip.id}/edit`}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Edit Trip
                    </Link>
                    <DeleteTripButton tripId={trip.id} />
                    <Link href="/trips" className="text-gray-500 hover:text-gray-600">
                        Back to Trips
                    </Link>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">Location</h2>
                        <p className="text-gray-600">{trip.location}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Dates</h2>
                        <p className="text-gray-600">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    {trip.description && (
                        <div>
                            <h2 className="text-lg font-semibold">Description</h2>
                            <p className="text-gray-600">{trip.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
