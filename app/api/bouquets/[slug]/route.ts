import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const bouquet = await prisma.bouquet.findUnique({
      where: { slug },
      include: {
        flowers: {
          include: {
            flowerAsset: true
          }
        }
      }
    });

    if (!bouquet) {
      return NextResponse.json({ error: 'Bouquet not found' }, { status: 404 });
    }

    return NextResponse.json(bouquet);
  } catch (error) {
    console.error('Error fetching bouquet:', error);
    return NextResponse.json({ error: 'Failed to fetch bouquet' }, { status: 500 });
  }
}
