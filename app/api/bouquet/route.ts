import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'
import { z } from 'zod'

const flowerConfigSchema = z.object({
  type: z.string(),
  x: z.number(),
  y: z.number(),
  scale: z.number(),
  rotation: z.number(),
  zIndex: z.number()
})

const bouquetSchema = z.object({
  flowers: z.array(flowerConfigSchema),
  note: z.string().nullable().optional(),
  fromName: z.string().nullable().optional(),
  font: z.string().optional(),
  textColor: z.string().optional(),
  music: z.string().nullable().optional(),
  bgColor: z.string().optional(),
  bgImage: z.string().nullable().optional()
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = bouquetSchema.parse(body)

    const slug = generateSlug()

    const bouquet = await prisma.bouquet.create({
      data: {
        slug,
        flowers: parsed.flowers as any,
        note: parsed.note,
        fromName: parsed.fromName,
        font: parsed.font || 'serif',
        textColor: parsed.textColor || '#4a4a4a',
        music: parsed.music,
        bgColor: parsed.bgColor || '#fdf6f0',
        bgImage: parsed.bgImage
      }
    })

    return NextResponse.json({ 
      slug: bouquet.slug, 
      url: `${process.env.NEXT_PUBLIC_APP_URL}/b/${bouquet.slug}` 
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
