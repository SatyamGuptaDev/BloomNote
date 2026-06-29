import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BouquetGallery } from '@/components/bouquet/BouquetGallery';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { Products } from '@/components/home/Products';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Occasions } from '@/components/home/Occasions';
import { Testimonials } from '@/components/home/Testimonials';
// import { BlogPreview } from '@/components/home/BlogPreview'; // hidden for now
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-16">
        <Hero />
        <TrustStrip />
        <Products />
        <HowItWorks />
        <BouquetGallery />
        <Occasions />
        <Testimonials />
        {/* <BlogPreview /> hidden for now */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
