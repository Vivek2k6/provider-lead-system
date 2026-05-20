import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Pull the latest 10 requests submitted by customers
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load request contents." }, { status: 500 });
  }
}