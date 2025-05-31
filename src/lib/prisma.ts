// Temporarily disabled for Netlify deployment
// import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
    prisma: any | undefined;
};

// Stub client for build-time
const prisma = {
    user: {
        findUnique: () => Promise.resolve(null),
        create: () => Promise.resolve(null),
        findMany: () => Promise.resolve([]),
    },
    trip: {
        findMany: () => Promise.resolve([]),
        findUnique: () => Promise.resolve(null),
        create: () => Promise.resolve(null),
        update: () => Promise.resolve(null),
        delete: () => Promise.resolve(null),
    }
};

export { prisma };
