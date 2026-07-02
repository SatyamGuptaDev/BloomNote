import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const flowerSchema = z.object({
  id: z.string(),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  scale: z.number().min(0.1).max(3),
  rotation: z.number(),
  zIndex: z.number()
});

const createBouquetSchema = z.object({
  flowers: z.array(flowerSchema).min(1).max(20),
  note: z.string().max(500).optional(),
  font: z.string().optional(),
  bgColor: z.string().optional(),
  senderName: z.string().max(50).optional(),
  recipientName: z.string().max(50).optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createBouquetSchema.parse(body);

    const slug = Math.random().toString(36).substring(2, 10); // Simple slug generation

    const bouquet = await prisma.bouquet.create({
      data: {
        slug,
        status: 'sent',
        senderName: validatedData.senderName || null,
        recipientName: validatedData.recipientName || null,
        noteText: validatedData.note || null,
        noteFont: validatedData.font || 'serif',
        bgColor: validatedData.bgColor || '#ffffff',
        flowers: {
          create: validatedData.flowers.map(f => ({
            positionX: f.x,
            positionY: f.y,
            scale: f.scale,
            rotation: f.rotation,
            zIndex: f.zIndex,
            flowerAssetId: f.id
          }))
        }
      }
    });

    return NextResponse.json({ success: true, slug: bouquet.slug });
  } catch (error) {
    console.error('Error creating bouquet:', error);
    return NextResponse.json({ error: 'Failed to create bouquet' }, { status: 400 });
  }
}
