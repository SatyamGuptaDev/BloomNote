import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })
    }

    const bouquet = await prisma.bouquet.update({
      where: { slug },
      data: { views: { increment: 1 } }
    })

    if (!bouquet) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({
      slug: bouquet.slug,
      flowers: JSON.parse(bouquet.flowers),
      note: bouquet.note,
      fromName: bouquet.fromName,
      font: bouquet.font,
      textColor: bouquet.textColor,
      bgColor: bouquet.bgColor,
      wrapStyle: bouquet.wrapStyle,
      ribbonColor: bouquet.ribbonColor,
      occasion: bouquet.occasion,
      recipientName: bouquet.recipientName,
      noteCardStyle: bouquet.noteCardStyle,
      themeName: bouquet.themeName,
      views: bouquet.views,
      createdAt: bouquet.createdAt
    })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    console.error('Server error fetching bouquet by slug:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
