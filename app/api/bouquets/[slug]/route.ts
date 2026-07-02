import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const bouquet = await prisma.bouquet.findUnique({
      where: { slug: params.slug },
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
