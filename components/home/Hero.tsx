'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Flower2, Star, Gift } from 'lucide-react';
import { WordReveal } from '@/components/magic/WordReveal';
import { AnimatedGradientText } from '@/components/magic/AnimatedGradientText';

const avatars = [
  { initial: 'A', color: '#C16E7E' },
  { initial: 'S', color: '#B7A0C9' },
  { initial: 'D', color: '#D9A05B' },
  { initial: 'E', color: '#8FA98A' },
];

const tiles = [
  { label: 'Bouquet', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop', tall: true, rotate: '-rotate-3' },
  { label: 'Hug Card', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600&auto=format&fit=crop', tall: false, rotate: 'rotate-2' },
  { label: 'Cake', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=600&auto=format&fit=crop', tall: false, rotate: '-rotate-2' },
  { label: 'Greeting Card', img: 'https://images.unsplash.com/photo-1606830733744-0ad778449672?q=80&w=600&auto=format&fit=crop', tall: true, rotate: 'rotate-3' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const copyContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const tileContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const tileItem: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 110, damping: 15 } },
};

function Tile({ label, img, tall, rotate, float }: { label: string; img: string; tall: boolean; rotate: string; float: number }) {
  return (
    <motion.div variants={tileItem} className={rotate}>
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: float, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        className="group relative cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-xl shadow-[var(--charcoal)]/10 ring-1 ring-black/5">
          <div className={`relative w-full ${tall ? 'h-48 sm:h-60' : 'h-36 sm:h-44'}`}>
            <Image
              src={img}
              alt={label}
              fill
              sizes="(max-width: 1024px) 45vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/55 via-transparent to-transparent" />
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-[var(--charcoal)] shadow-sm">
              {label}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const floats = [5.5, 6.5, 6, 5];

  return (
    <section className="relative overflow-hidden bg-[var(--background)]">
      {/* Animated ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--blush)] blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[var(--lavender)] blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-12 lg:py-16 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center lg:min-h-[calc(100vh-4rem)]">
        {/* Copy */}
        <motion.div variants={copyContainer} initial="hidden" animate="visible" className="max-w-xl">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--rose)]/30 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
          >
            <Flower2 className="h-3.5 w-3.5 text-[var(--rose)]" />
            <AnimatedGradientText>Bouquets · Cakes · Cards · Hugs</AnimatedGradientText>
          </motion.span>

          <h1 className="mt-6 font-heading text-[2.7rem] leading-[1.05] tracking-tight text-[var(--charcoal)] sm:text-6xl">
            <WordReveal text="Little gifts they'll" delay={0.3} />
            <span className="block italic font-light text-[var(--rose-deep)]">
              <WordReveal text="never forget." delay={0.75} />
            </span>
          </h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-md font-body text-lg leading-relaxed text-[var(--stone)]">
            Bouquets, birthday cakes, heartfelt cards and warm hugs — make a beautiful
            digital gift, wrap it in your own words, and share it in seconds.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/create"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--rose)] px-8 py-4 text-base font-medium text-white shadow-lg shadow-[var(--rose)]/25 transition-colors duration-300 hover:bg-[var(--rose-deep)]"
              >
                {/* shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Gift className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
                Start gifting
              </Link>
            </motion.div>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-2 py-2 text-base font-medium text-[var(--charcoal)] underline-offset-8 transition-colors hover:text-[var(--rose)] hover:underline"
            >
              See how it works
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((a) => (
                <span
                  key={a.initial}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-white text-xs font-semibold text-white"
                  style={{ backgroundColor: a.color }}
                >
                  {a.initial}
                </span>
              ))}
            </div>
            <div>
              <div className="flex text-[var(--rose)]">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 300 }}
                  >
                    <Star className="h-4 w-4 fill-current" />
                  </motion.span>
                ))}
              </div>
              <p className="mt-0.5 text-sm text-[var(--stone)]">
                Loved by <span className="font-semibold text-[var(--charcoal)]">10,000+</span> senders worldwide
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual — animated tiles */}
        <motion.div
          variants={tileContainer}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-md lg:max-w-lg lg:ml-auto"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              {tiles.filter((_, i) => i % 2 === 0).map((tile, i) => (
                <Tile key={tile.label} {...tile} float={floats[i * 2]} />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:gap-4">
              {tiles.filter((_, i) => i % 2 === 1).map((tile, i) => (
                <Tile key={tile.label} {...tile} float={floats[i * 2 + 1]} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
