import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

try {
    prisma = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
} catch (error) {
    console.warn('Database connection failed:', error);
    // Create a dummy client for build-time
    prisma = {} as PrismaClient;
}

export { prisma };
