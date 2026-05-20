import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Force Next.js to always fetch dynamic live database values on every reload
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Pull all 8 records sorted cleanly by ID
    const providers = await prisma.provider.findMany({
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(providers, { status: 200 });
  } catch (error: any) {
    console.error("Dashboard Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve live metrics from database container." },
      { status: 500 }
    );
  }
}