import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, PenTool, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/flowers123/1920/1080"
            alt="Beautiful floral arrangement background"
            fill
            className="object-cover opacity-80"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-zinc-50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex flex-col items-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-sm text-zinc-600 backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Booking for 2027 Weddings
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-zinc-900 max-w-4xl drop-shadow-sm">
            Poetry in blooms, elegance in ink.
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 max-w-2xl font-light">
            We are a boutique studio specializing in fine art floral design and custom stationary for life's most beautiful celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-zinc-800"
            >
              View Our Portfolio
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100"
            >
              Inquire Today
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-24 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-zinc-900">Our Offerings</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Meticulously crafted details to elevate your events and everyday moments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            {/* Service 1 */}
            <div className="flex flex-col gap-6 group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src="https://picsum.photos/seed/floralart/800/1000"
                  alt="Floral Design"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-900">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium">Floral Design</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  Lush, organic arrangements tailored to your vision. From grand installations to delicate centerpieces, our floral designs breathe life into any space.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-600">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex flex-col gap-6 group cursor-pointer mt-12 md:mt-24">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src="https://picsum.photos/seed/stationary/800/1000"
                  alt="Custom Stationary"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-900">
                    <PenTool className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium">Fine Stationary</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  Heirloom-quality paper goods, custom illustrations, and elegant calligraphy that tell your unique story before the event even begins.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-600">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full py-24 md:py-32 bg-white flex flex-col items-center justify-center px-4 md:px-6 text-center border-y border-zinc-100">
        <blockquote className="max-w-3xl space-y-6">
          <p className="font-serif text-2xl md:text-4xl leading-relaxed text-zinc-800">
            "The earth laughs in flowers, and we write our joys in the spaces between."
          </p>
          <footer className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
            — The Petals & Words Philosophy
          </footer>
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-zinc-900 text-white flex flex-col items-center justify-center px-4 md:px-6 text-center">
        <div className="max-w-2xl space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-zinc-50">
            Let's create something beautiful together.
          </h2>
          <p className="text-zinc-400 text-lg">
            We take on a limited number of events each year to ensure the highest level of detail and care.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-zinc-900 shadow transition-colors hover:bg-zinc-100"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
