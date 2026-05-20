import { NextResponse } from 'next/server';
import { allocateLead } from '@/lib/allocation';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is missing inside .env");
    }

    // 1. Extract the Idempotency tracking token from the headers
    const idempotencyKey = request.headers.get('x-idempotency-key');
    const body = await request.json();
    const { name, phone, city, service, description } = body;

    if (!name || !phone || !city || !service || !description) {
      return NextResponse.json({ error: "All fields are mandatory." }, { status: 400 });
    }

    // 2. If a key is passed, check if this operation was already completed successfully
    if (idempotencyKey) {
      const existingKey = await prisma.idempotencyKey.findUnique({
        where: { key: idempotencyKey }
      });
      
      if (existingKey) {
        return NextResponse.json(
          { message: "Duplicate transaction safely ignored.", memo: "Idempotent Safe Guard Active" },
          { status: 200 }
        );
      }
    }

    // 3. Process the distribution logic inside your locked transaction block
    const result = await allocateLead({ name, phone, city, service, description });

    // 4. Save the key inside the schema pool if it was successful
    if (idempotencyKey) {
      await prisma.idempotencyKey.create({
        data: { key: idempotencyKey }
      });
    }

    return NextResponse.json({ message: "Lead generated successfully!", result }, { status: 201 });

  } catch (error: any) {
    console.error("API Route Processing Error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Duplicate Rule Collision Detected." }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Unexpected error." }, { status: 500 });
  }
}