import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const bouquet = await prisma.bouquet.findUnique({
      where: { slug: params.slug }
    });

    if (!bouquet) {
      return NextResponse.json({ error: 'Bouquet not found' }, { status: 404 });
    }

    if (!bouquet.viewedAt) {
      await prisma.bouquet.update({
        where: { slug: params.slug },
        data: {
          viewedAt: new Date(),
          views: { increment: 1 }
        }
      });
    } else {
      await prisma.bouquet.update({
        where: { slug: params.slug },
        data: { views: { increment: 1 } }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 });
  }
}
