'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { BlurFade } from '@/components/magic/BlurFade';
import { WordReveal } from '@/components/magic/WordReveal';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--rose)] to-[var(--rose-deep)] py-24">
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[var(--lavender)]/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-2xl px-5 text-center">
        <h2 className="font-heading text-4xl text-white sm:text-5xl">
          <WordReveal text="Make someone's day," />
          <span className="block italic text-[var(--blush)]">
            <WordReveal text="right now." delay={0.45} />
          </span>
        </h2>
        <BlurFade delay={0.3}>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/85">
            No account needed to start. Just sixty seconds between you and a smile.
          </p>
        </BlurFade>
        <BlurFade delay={0.45}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-10 inline-block">
            <Link
              href="/create"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-medium text-[var(--charcoal)] shadow-lg transition-colors duration-300 hover:bg-[var(--blush)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--rose)]/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Gift className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
              Start gifting
            </Link>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  );
}
