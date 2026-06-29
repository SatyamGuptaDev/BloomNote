import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OCCASIONS } from '@/lib/constants';

export const metadata = {
  title: 'All Occasions | Dear Bloomy',
  description: 'Find the perfect digital bouquet template for any occasion.',
};

export default function OccasionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl text-[var(--charcoal)] mb-6">
              Shop by Occasion
            </h1>
            <p className="text-lg text-[var(--stone)] max-w-2xl mx-auto">
              Whether you're celebrating a milestone or just want to brighten someone's day, we have a template to help you express it perfectly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OCCASIONS.map((occ) => (
              <Link key={occ.slug} href={`/occasions/${occ.slug}`} className="group block">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  <Image 
                    src={occ.image} 
                    alt={occ.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="font-heading text-3xl text-white drop-shadow-md capitalize mb-2">{occ.name}</h3>
                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[var(--charcoal)] px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                      View Templates
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
