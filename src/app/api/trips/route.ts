import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const trips = await prisma.trip.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                startDate: 'asc',
            },
        });

        return NextResponse.json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        return NextResponse.json(
            { error: 'Error fetching trips' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        } const body = await req.json();
        console.log('Received request body:', body);
        console.log('Session:', session);

        const { title, description, startDate, endDate, location } = body;

        // Validate required fields
        if (!title || !startDate || !endDate || !location) {
            console.error('Missing fields:', { title, startDate, endDate, location });
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create trip
        const trip = await prisma.trip.create({
            data: {
                title,
                description: description || '',
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                location,
                userId: session.user.id
            },
        });

        return NextResponse.json(trip, { status: 201 });
    } catch (error) {
        console.error('Error creating trip:', error);
        return NextResponse.json(
            { error: 'Error creating trip: ' + (error instanceof Error ? error.message : String(error)) },
            { status: 500 }
        );
    }
}
