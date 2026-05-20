import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Create a native PostgreSQL connection pool using our environment link
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it inside the mandatory Prisma 7 driver translation adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter block directly into the constructor instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;