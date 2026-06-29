import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Canvas, CanvasFlower } from '@/components/bouquet/Canvas';
import { ChevronRight } from 'lucide-react';

export async function BouquetGallery() {
  let recentBouquets: any[] = [];
  try {
    recentBouquets = await prisma.bouquet.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch (error) {
    console.error('Error fetching bouquets:', error);
  }

  if (recentBouquets.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-4 bg-[var(--cream)]/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-[var(--charcoal)] mb-4">
            Recent Public Bouquets
          </h2>
          <p className="text-lg text-[var(--stone)] max-w-2xl mx-auto">
            Take a look at what others are creating right now. Get inspired to make your own.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentBouquets.map((bouquet) => {
            const flowers: CanvasFlower[] = typeof bouquet.flowers === 'string' 
              ? JSON.parse(bouquet.flowers) 
              : bouquet.flowers;
            
            return (
              <Link href={`/b/${bouquet.slug}`} key={bouquet.id} className="block group">
                <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--blush)]/50 relative overflow-hidden flex flex-col h-full">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-stone-50 relative">
                    <div className="absolute inset-0 pointer-events-none transform scale-90 origin-center transition-transform duration-700 group-hover:scale-100">
                      <Canvas 
                        flowers={flowers} 
                        backgroundColor={bouquet.bgColor || '#fdf6f0'} 
                        readOnly={true} 
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col flex-1 px-2">
                    <p className="text-[var(--charcoal)] font-medium text-lg line-clamp-1 mb-1">
                      {bouquet.fromName ? `From ${bouquet.fromName}` : 'Anonymous'}
                    </p>
                    <p className="text-[var(--stone)] text-sm line-clamp-2 flex-1 font-serif italic mb-4">
                      "{bouquet.note || 'A thoughtful gift...'}"
                    </p>
                    <div className="flex items-center text-[var(--rose)] text-sm font-medium mt-auto group-hover:underline">
                      View Bouquet <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/create" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--rose)] text-white rounded-full font-medium text-lg hover:bg-[var(--rose)]/90 transition-all shadow-md hover:shadow-lg">
            Create Yours Now
          </Link>
        </div>
      </div>
    </section>
  );
}
