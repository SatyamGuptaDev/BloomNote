import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardViewer } from './CardViewer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCard(slug: string) {
  try {
    const card = await prisma.card.findUnique({
      where: { slug },
      include: {
        elements: true
      }
    });
    return card;
  } catch (e) {
    console.error("Failed to fetch card", e);
    return null;
  }
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const card = await getCard(slug);

  if (!card) {
    return {
      title: 'Card Not Found | BloomNote',
      description: 'This card does not exist.',
      robots: { index: false, follow: false },
    };
  }

  const sender = card.senderName ? card.senderName : 'Someone';
  const title = card.recipientName 
    ? `${sender} sent a card for ${card.recipientName}` 
    : `${sender} sent you a card`;
    
  let description = 'Open your digital card to reveal the message inside.';
  if (card.scheduledFor && card.scheduledFor.getTime() > Date.now()) {
    description = `This card is locked until ${card.scheduledFor.toLocaleString()}.`;
  }
  
  return {
    title: `${title} | BloomNote`,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/c/${slug}`,
      siteName: 'BloomNote',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: 'A digital greeting card',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/og?title=${encodeURIComponent(title)}`],
    },
  };
}

export default async function ViewCardPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const isPreview = sp.preview === 'true';
  
  const card = await getCard(slug);

  if (!card) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto text-center border border-black/5">
          <h1 className="font-heading text-2xl text-[var(--charcoal)] mb-4">Card not found</h1>
          <p className="text-[var(--stone)] mb-8">This card doesn't exist or has expired.</p>
          <a href="/create/card" className="inline-block bg-[var(--charcoal)] text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-black transition-colors">
            Create Your Own
          </a>
        </div>
      </div>
    );
  }

  return <CardViewer card={card} isPreview={isPreview} />;
}
