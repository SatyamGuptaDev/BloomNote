import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const category = searchParams.get('category')

    const skip = (page - 1) * limit

    const where = category ? { category } : {}

    const posts = await prisma.blogPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: 'desc' }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
