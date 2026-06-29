'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BlurFade } from '@/components/magic/BlurFade';
import { WordReveal } from '@/components/magic/WordReveal';

const occasions = [
  { slug: 'mothers-day', name: "Mother's Day", image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop' },
  { slug: 'birthday', name: 'Birthday', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop' },
  { slug: 'anniversary', name: 'Anniversary', image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=800&auto=format&fit=crop' },
  { slug: 'apology', name: 'Apology', image: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=800&auto=format&fit=crop' },
  { slug: 'get-well-soon', name: 'Get Well Soon', image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop' },
  { slug: 'just-because', name: 'Just Because', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop' },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

export function Occasions() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <BlurFade>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose)]">For every moment</p>
          </BlurFade>
          <h2 className="mt-4 font-heading text-4xl text-[var(--charcoal)] sm:text-5xl">
            <WordReveal text="Made for the moments that matter" />
          </h2>
          <BlurFade delay={0.2}>
            <p className="mt-4 text-lg text-[var(--stone)]">
              Pick an occasion and we&apos;ll set the tone — flowers, colours and words to match.
            </p>
          </BlurFade>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3"
        >
          {occasions.map((occ) => (
            <motion.div key={occ.slug} variants={item} whileHover={{ y: -6 }}>
              <Link href={`/occasions/${occ.slug}`} className="group block">
                <div className="relative h-56 overflow-hidden rounded-2xl shadow-md shadow-[var(--charcoal)]/5 sm:h-64">
                  <Image
                    src={occ.image}
                    alt={occ.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/70 via-[var(--charcoal)]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <h3 className="font-heading text-xl text-white sm:text-2xl">{occ.name}</h3>
                    <span className="grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-white/90 text-[var(--rose-deep)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
