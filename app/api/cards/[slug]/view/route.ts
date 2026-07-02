import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ slug: string }>;
};

export async function PATCH(
  request: Request,
  { params }: Props
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const isPreview = body.isPreview === true;

    // We don't increment views or set viewedAt for previews
    if (isPreview) {
      return NextResponse.json({ success: true, isFirstView: false });
    }

    const card = await prisma.card.findUnique({
      where: { slug }
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    const isFirstView = card.views === 0;

    await prisma.card.update({
      where: { slug },
      data: {
        views: { increment: 1 },
        viewedAt: isFirstView ? new Date() : undefined,
        status: 'viewed'
      }
    });

    return NextResponse.json({ success: true, isFirstView });
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 });
  }
}
