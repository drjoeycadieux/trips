import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
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

        const trip = await prisma.trip.create({
            data: {
                title,
                description: description || '',
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                location,
                userId: session.user.id,
            },
        });

        return NextResponse.json(trip, { status: 201 });
    } catch (error) {
        console.error('Error creating trip:', error);
        return NextResponse.json(
            { error: 'Error creating trip' },
            { status: 500 }
        );
    }
}
