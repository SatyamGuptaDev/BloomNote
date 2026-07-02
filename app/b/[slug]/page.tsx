import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BouquetViewer } from './BouquetViewer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getBouquet(slug: string) {
  try {
    // Read directly from db on server side to avoid absolute URL fetch issues on Vercel
    const bouquet = await prisma.bouquet.findUnique({
      where: { slug },
      include: {
        flowers: {
          include: { flowerAsset: true }
        }
      }
    });
    
    if (!bouquet) return null;
    
    // Check expiration if needed, or status.
    return bouquet;
  } catch (e) {
    console.error("Failed to fetch bouquet", e);
    return null;
  }
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bouquet = await getBouquet(slug);

  if (!bouquet) {
    return {
      title: 'Bouquet Not Found | BloomNote',
      description: 'This bouquet does not exist or has expired.',
      robots: { index: false, follow: false },
    };
  }

  const sender = bouquet.senderName ? bouquet.senderName : 'Someone';
  const title = bouquet.recipientName 
    ? `${sender} sent a bouquet for ${bouquet.recipientName}` 
    : `${sender} sent you a bouquet`;
    
  const description = bouquet.noteText 
    ? `"${bouquet.noteText.substring(0, 100)}${bouquet.noteText.length > 100 ? '...' : ''}" - Click to open your bouquet.` 
    : 'Open your digital bouquet to reveal the flowers and message inside.';
  
  return {
    title: `${title} | BloomNote`,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/b/${slug}`,
      siteName: 'BloomNote',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: 'A digital bouquet',
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

export default async function ViewBouquetPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const isPreview = sp.preview === 'true';
  
  const bouquet = await getBouquet(slug);

  if (!bouquet) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto text-center border border-black/5">
          <h1 className="font-heading text-2xl text-[var(--charcoal)] mb-4">Bouquet not found</h1>
          <p className="text-[var(--stone)] mb-8">This bouquet doesn't exist or has expired.</p>
          <a href="/create" className="inline-block bg-[var(--rose)] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 shadow-md">
            Create Your Own
          </a>
        </div>
      </div>
    );
  }

  return <BouquetViewer bouquet={bouquet} isPreview={isPreview} />;
}
