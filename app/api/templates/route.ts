import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const occasion = searchParams.get('occasion')
    const featured = searchParams.get('featured') === 'true'

    const where: any = {}
    if (occasion) where.occasion = occasion
    if (featured) where.isFeatured = true

    const templates = await prisma.template.findMany({
      where
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
