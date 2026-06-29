import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isBouquetExpired } from '@/lib/utils'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const bouquet = await prisma.bouquet.findUnique({
      where: { slug }
    })

    if (!bouquet) {
      return NextResponse.json({ error: 'Bouquet not found' }, { status: 404 })
    }

    await prisma.bouquet.update({
      where: { slug },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({
      ...bouquet,
      flowers: JSON.parse(bouquet.flowers as string)
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
