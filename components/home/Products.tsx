'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Flower2, Cake, Heart, MailOpen, Sparkles, ArrowRight } from 'lucide-react';

type Product = {
  name: string;
  desc: string;
  icon: typeof Flower2;
  href: string;
  img: string;
  accent: string;
  live: boolean;
  featured?: boolean;
};

const products: Product[] = [
  {
    name: 'Digital Bouquet',
    desc: 'Arrange flowers stem by stem and wrap them in a heartfelt, personal note.',
    icon: Flower2,
    href: '/create/bouquet',
    img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=900&auto=format&fit=crop',
    accent: '#C16E7E',
    live: true,
    featured: true,
  },
  {
    name: 'Virtual Cake',
    desc: 'A 3D birthday cake with candles & toppings.',
    icon: Cake,
    href: '/create-cake',
    img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=700&auto=format&fit=crop',
    accent: '#D9A05B',
    live: false,
  },
  {
    name: 'Hug Card',
    desc: 'A pull-to-open card with a warm virtual hug.',
    icon: Heart,
    href: '/hug-card',
    img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=700&auto=format&fit=crop',
    accent: '#B7A0C9',
    live: false,
  },
  {
    name: "Mother's Day Card",
    desc: 'An animated card that reveals your message.',
    icon: MailOpen,
    href: '/mothers-day-card',
    img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=700&auto=format&fit=crop',
    accent: '#C16E7E',
    live: false,
  },
  {
    name: 'Greeting Card',
    desc: 'A heartfelt card for any moment.',
    icon: Sparkles,
    href: '/greeting-card',
    img: 'https://images.unsplash.com/photo-1606830733744-0ad778449672?q=80&w=700&auto=format&fit=crop',
    accent: '#8FA98A',
    live: false,
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 110, damping: 18 },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function ProductCard({ product }: { product: Product }) {
  const { name, desc, icon: Icon, href, img, accent, live, featured } = product;

  const card = (
    <motion.div
      variants={item}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative h-full w-full overflow-hidden rounded-[1.75rem] shadow-lg shadow-[var(--charcoal)]/5 ring-1 ring-black/5 ${
        featured ? 'min-h-[300px] lg:min-h-0' : 'min-h-[170px]'
      }`}
    >
      {/* Image */}
      <Image
        src={img}
        alt={name}
        fill
        sizes={featured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        referrerPolicy="no-referrer"
      />

      {/* Gradient veil — strong at bottom so text stays readable on any image */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,33,30,0.94),rgba(38,33,30,0.6)_38%,rgba(38,33,30,0.15)_70%,transparent_92%)]" />

      {/* Shine sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      {/* Icon chip */}
      <div className="absolute left-4 top-4">
        <motion.span
          whileHover={{ rotate: -10, scale: 1.08 }}
          className="grid h-10 w-10 place-items-center rounded-xl bg-white/90 shadow-md backdrop-blur-sm"
          style={{ color: accent }}
        >
          <Icon className="h-5 w-5" />
        </motion.span>
      </div>

      {/* Status badge */}
      <div className="absolute right-4 top-4">
        {live ? (
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--rose-deep)] shadow-sm">
            Live
          </span>
        ) : (
          <span className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
            Soon
          </span>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
        <h3 className={`font-heading text-white ${featured ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{name}</h3>
        <p
          className={`mt-1.5 text-white/90 ${
            featured ? 'max-w-sm text-base' : 'text-xs leading-snug'
          }`}
        >
          {desc}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-white">
          <span className="opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {live ? 'Create now' : 'Coming soon'}
          </span>
          <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </div>

      {/* Accent ring on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 ring-2 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}
      />
    </motion.div>
  );

  return live ? (
    <Link href={href} className={featured ? 'col-span-2 lg:col-span-2 lg:row-span-2' : ''}>
      {card}
    </Link>
  ) : (
    <div className={featured ? 'col-span-2 lg:col-span-2 lg:row-span-2' : ''}>{card}</div>
  );
}

export function Products() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={headerItem} className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose)]">
            Choose your gift
          </motion.p>
          <motion.h2 variants={headerItem} className="mt-4 font-heading text-4xl text-[var(--charcoal)] sm:text-5xl">
            More than flowers
          </motion.h2>
          <motion.p variants={headerItem} className="mt-4 text-lg text-[var(--stone)]">
            Pick the gift that fits the moment — each one is crafted in seconds and ready to share.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:auto-rows-[200px] lg:grid-cols-4"
        >
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
