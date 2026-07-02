import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const bouquet = await prisma.bouquet.findUnique({
      where: { slug }
    });

    if (!bouquet) {
      return NextResponse.json({ error: 'Bouquet not found' }, { status: 404 });
    }

    if (!bouquet.viewedAt) {
      await prisma.bouquet.update({
        where: { slug },
        data: {
          viewedAt: new Date(),
          views: { increment: 1 }
        }
      });
    } else {
      await prisma.bouquet.update({
        where: { slug },
        data: { views: { increment: 1 } }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 });
  }
}
