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
  flowers: z.array(flowerConfigSchema).max(50),
  note: z.string().max(2000).nullable().optional(),
  fromName: z.string().max(100).nullable().optional(),
  font: z.string().max(50).optional(),
  textColor: z.string().max(30).optional(),
  music: z.string().max(100).nullable().optional(),
  bgColor: z.string().max(30).optional(),
  bgImage: z.string().url().max(1000).nullable().optional().or(z.literal(''))
})

/**
 * @swagger
 * /api/bouquet:
 *   post:
 *     tags: [Gifts]
 *     summary: Create a digital bouquet
 *     description: Saves a bouquet (flowers + note) and returns a shareable slug and URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [flowers]
 *             properties:
 *               flowers:
 *                 type: array
 *                 maxItems: 50
 *                 items:
 *                   type: object
 *                   properties:
 *                     type: { type: string, example: rose-red }
 *                     x: { type: number, example: 50 }
 *                     y: { type: number, example: 50 }
 *                     scale: { type: number, example: 1 }
 *                     rotation: { type: number, example: 45 }
 *                     zIndex: { type: integer, example: 1 }
 *               note: { type: string, example: Thinking of you today. }
 *               fromName: { type: string, example: Mira }
 *               font: { type: string, example: script }
 *               textColor: { type: string, example: '#2D2D2D' }
 *               bgColor: { type: string, example: '#FAF3EC' }
 *     responses:
 *       200:
 *         description: Bouquet created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slug: { type: string, example: a1b2c3 }
 *                 url: { type: string, example: http://localhost:3000/b/a1b2c3 }
 *       400:
 *         description: Invalid payload
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = bouquetSchema.parse(body)

    const slug = generateSlug()

    const bouquet = await prisma.bouquet.create({
      data: {
        slug,
        flowers: JSON.stringify(parsed.flowers),
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
