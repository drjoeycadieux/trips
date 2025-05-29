import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import TripForm from '@/components/TripForm';

export default async function EditTripPage({
    params,
}: {
    params: { id: string };
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/login');
    }

    const trip = await prisma.trip.findUnique({
        where: {
            id: params.id,
            userId: session.user.id,
        },
    });

    if (!trip) {
        redirect('/trips');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Trip</h1>            <TripForm
                initialData={{
                    title: trip.title,
                    description: trip.description || '',
                    location: trip.location,
                    startDate: new Date(trip.startDate).toISOString().split('T')[0],
                    endDate: new Date(trip.endDate).toISOString().split('T')[0],
                }}
                tripId={trip.id}
            />
        </div>
    );
}
