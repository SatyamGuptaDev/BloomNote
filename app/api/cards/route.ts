import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const cardElementSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  payload: z.string(),
  x: z.number(),
  y: z.number(),
  scale: z.number(),
  rotation: z.number(),
  zIndex: z.number(),
  textOptions: z.object({
    color: z.string(),
    fontFamily: z.string()
  }).optional()
});

const createCardSchema = z.object({
  elements: z.array(cardElementSchema),
  senderName: z.string().max(50).optional(),
  recipientName: z.string().max(50).optional(),
  format: z.string(),
  themeId: z.string().optional(),
  paperTexture: z.string(),
  palette: z.object({
    text: z.string()
  }).optional(),
  musicId: z.string().optional(),
  occasion: z.string().optional(),
  scheduledFor: z.string().optional(), // ISO date string
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createCardSchema.parse(body);

    const slug = Math.random().toString(36).substring(2, 10); // 8 char slug

    const card = await prisma.card.create({
      data: {
        slug,
        status: 'sent',
        senderName: validatedData.senderName || null,
        recipientName: validatedData.recipientName || null,
        format: validatedData.format,
        themeId: validatedData.themeId || null,
        paperTexture: validatedData.paperTexture || 'matte',
        textColor: validatedData.palette?.text || '#4a4a4a',
        musicId: validatedData.musicId || null,
        occasion: validatedData.occasion || null,
        scheduledFor: validatedData.scheduledFor ? new Date(validatedData.scheduledFor) : null,
        elements: {
          create: validatedData.elements.map(el => ({
            type: el.type,
            payload: el.payload,
            positionX: el.x,
            positionY: el.y,
            scale: el.scale,
            rotation: el.rotation,
            zIndex: el.zIndex,
            textOptions: el.textOptions ? JSON.stringify(el.textOptions) : null
          }))
        }
      }
    });

    return NextResponse.json({ success: true, slug: card.slug });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json({ error: 'Failed to create card' }, { status: 400 });
  }
}
