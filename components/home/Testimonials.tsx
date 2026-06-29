'use client';

import { motion, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import { BlurFade } from '@/components/magic/BlurFade';
import { WordReveal } from '@/components/magic/WordReveal';

const testimonials = [
  { q: 'I sent this in two minutes and it felt genuinely personal — nothing like a generic card.', a: 'Aditi', city: 'Mumbai' },
  { q: 'My mom actually teared up when she opened the link. Such a beautiful little surprise.', a: 'Sarah', city: 'London' },
  { q: 'Perfect for long-distance. The note card is elegant and the flowers look real.', a: 'David', city: 'New York' },
  { q: 'Way more thoughtful than a text. It honestly feels like a real gift arriving.', a: 'Elena', city: 'Madrid' },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

export function Testimonials() {
  return (
    <section className="bg-[var(--background)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <BlurFade>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose)]">Kind words</p>
          </BlurFade>
          <h2 className="mt-4 font-heading text-4xl text-[var(--charcoal)] sm:text-5xl">
            <WordReveal text="They deserve more than a text" />
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="-mx-5 mt-14 flex gap-6 overflow-x-auto px-5 pb-6 hide-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              variants={item}
              whileHover={{ y: -6 }}
              className="flex w-[280px] shrink-0 flex-col rounded-3xl border border-[var(--blush)] bg-white p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-[var(--rose)]/10 sm:w-auto"
            >
              <div className="flex text-[var(--rose)]">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-heading text-lg italic leading-relaxed text-[var(--charcoal)]">
                &ldquo;{t.q}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-[var(--stone)]">
                <span className="font-semibold text-[var(--charcoal)]">{t.a}</span> · {t.city}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
