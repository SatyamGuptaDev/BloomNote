import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BouquetViewer } from './BouquetViewer';

async function getBouquet(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/bouquet/${slug}`, { 
      cache: 'no-store' 
    });
    
    if (res.status === 404) return null;
    if (res.status === 410) return 'expired';
    if (!res.ok) return null;
    
    return res.json();
  } catch (e) {
    console.error("Failed to fetch bouquet", e);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const bouquet = await getBouquet(params.slug);
  
  if (!bouquet || bouquet === 'expired') {
    return {
      title: 'Bouquet Not Found | Dear Bloomy',
      description: 'This bouquet does not exist or has expired.',
    };
  }

  const title = bouquet.fromName ? `A bouquet for you from ${bouquet.fromName}` : 'Someone sent you a digital bouquet';
  const description = bouquet.note ? `"${bouquet.note.substring(0, 100)}${bouquet.note.length > 100 ? '...' : ''}" - Click to open your bouquet.` : 'Open your digital bouquet to reveal the flowers and message inside.';
  
  return {
    title: `${title} | Dear Bloomy`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/b/${params.slug}`,
      siteName: 'Dear Bloomy',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?title=${encodeURIComponent(title)}`,
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
      images: [`${process.env.NEXT_PUBLIC_APP_URL}/api/og?title=${encodeURIComponent(title)}`],
    },
  };
}

export default async function ViewBouquetPage({ params }: { params: { slug: string } }) {
  const bouquet = await getBouquet(params.slug);

  if (bouquet === 'expired') {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto text-center">
          <h1 className="font-heading text-2xl text-[var(--charcoal)] mb-4">This bouquet has expired</h1>
          <p className="text-[var(--stone)] mb-8">For privacy, bouquets expire after 30 days.</p>
          <a href="/create" className="inline-block bg-[var(--rose)] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90">
            Create New Bouquet
          </a>
        </div>
      </div>
    );
  }

  if (!bouquet) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto text-center">
          <h1 className="font-heading text-2xl text-[var(--charcoal)] mb-4">Bouquet not found</h1>
          <p className="text-[var(--stone)] mb-8">This bouquet doesn't exist or has been removed.</p>
          <a href="/create" className="inline-block bg-[var(--rose)] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90">
            Create New Bouquet
          </a>
        </div>
      </div>
    );
  }

  return <BouquetViewer bouquet={bouquet} />;
}
