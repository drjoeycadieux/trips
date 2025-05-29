import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const trip = await prisma.trip.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        if (!trip) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        return NextResponse.json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error);
        return NextResponse.json(
            { error: 'Error fetching trip' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, description, startDate, endDate, location } = await req.json();

        // Validate required fields
        if (!title || !startDate || !endDate || !location) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if trip exists and belongs to user
        const existingTrip = await prisma.trip.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        if (!existingTrip) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        // Update trip
        const updatedTrip = await prisma.trip.update({
            where: {
                id: params.id,
                userId: session.user.id, // Ensure we maintain user ownership
            },
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                location,
            },
        });

        return NextResponse.json(updatedTrip);
    } catch (error) {
        console.error('Error updating trip:', error);
        return NextResponse.json(
            { error: 'Error updating trip' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if trip exists and belongs to user
        const existingTrip = await prisma.trip.findUnique({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        if (!existingTrip) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        // Delete trip
        await prisma.trip.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error);
        return NextResponse.json(
            { error: 'Error deleting trip' },
            { status: 500 }
        );
    }
}
