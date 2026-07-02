import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const flowers = await prisma.flowerAsset.findMany({
      orderBy: { category: 'asc' }
    });
    return NextResponse.json(flowers);
  } catch (error) {
    console.error('Error fetching flowers:', error);
    return NextResponse.json({ error: 'Failed to fetch flowers' }, { status: 500 });
  }
}
