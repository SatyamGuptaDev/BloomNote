import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackButton } from '@/components/shared/BackButton';
import { notFound } from 'next/navigation';
import { OCCASIONS, MESSAGE_TEMPLATES } from '@/lib/constants';
import { FlowerSVG } from '@/components/bouquet/FlowerSVG';

// For Next.js 14 dynamic routes
export function generateStaticParams() {
  return OCCASIONS.map((occ) => ({
    slug: occ.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const occasion = OCCASIONS.find(o => o.slug === params.slug);
  if (!occasion) return { title: 'Occasion not found' };
  
  return {
    title: `${occasion.name} Digital Bouquets`,
    description: `Create a meaningful virtual bouquet for ${occasion.name}. Free, no login required.`
  };
}

export default function OccasionPage({ params }: { params: { slug: string } }) {
  const occasion = OCCASIONS.find(o => o.slug === params.slug);
  
  if (!occasion) {
    notFound();
  }

  // Pre-made templates for this occasion (mock data for MVP)
  const templates = [
    { id: '1', title: 'Classic Elegance', flowers: ['rose-red', 'rose-pink', 'greenery'] },
    { id: '2', title: 'Bright Sunshine', flowers: ['sunflower', 'daisy', 'tulip-yellow'] },
    { id: '3', title: 'Soft Pastels', flowers: ['lily', 'tulip-purple', 'rose-white'] },
  ];

  const templatesList = MESSAGE_TEMPLATES[occasion.slug as keyof typeof MESSAGE_TEMPLATES] || [];

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        
        {/* Hero */}
        <section className="bg-gradient-to-b from-[var(--blush)]/50 to-white py-12 px-4 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <div className="self-start mb-6">
              <BackButton label="Back to Occasions" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl text-[var(--charcoal)] mb-6 capitalize">
              {occasion.name} Digital Bouquets
            </h1>
            <p className="text-lg text-[var(--stone)] mb-10">
              Create a meaningful virtual bouquet to celebrate {occasion.name.toLowerCase()}. Free, no login required.
            </p>
            <Link 
              href={`/create?occasion=${occasion.slug}`}
              className="inline-block bg-[var(--rose)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Start Creating
            </Link>
          </div>
        </section>

        {/* Templates */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl text-center text-[var(--charcoal)] mb-12">Pre-made Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templates.map((tpl) => (
                <div key={tpl.id} className="bg-[var(--cream)] rounded-2xl overflow-hidden border border-[var(--blush)] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center p-8 text-center group">
                  <div className="flex -space-x-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {tpl.flowers.map((f, i) => (
                      <FlowerSVG key={i} type={f} width={50} height={50} className="drop-shadow-md" />
                    ))}
                  </div>
                  <h3 className="font-heading text-xl text-[var(--charcoal)] mb-4">{tpl.title}</h3>
                  <Link 
                    href={`/create?template=${tpl.id}`}
                    className="text-[var(--rose)] font-medium underline underline-offset-4 hover:text-[var(--charcoal)] transition-colors mt-auto"
                  >
                    Use this template
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Message Ideas */}
        {templatesList.length > 0 && (
          <section className="py-20 px-4 bg-[var(--blush)]/20">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl text-center text-[var(--charcoal)] mb-12">What to write in your note</h2>
              <div className="space-y-4">
                {templatesList.map((msg, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-[var(--blush)] shadow-sm hover:border-[var(--rose)]/50 transition-colors cursor-copy">
                    <p className="font-script text-2xl text-[var(--charcoal)] text-center">"{msg}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
