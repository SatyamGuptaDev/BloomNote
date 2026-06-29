'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Flower2, Cake, Heart, MailOpen, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';

type Gift = {
  name: string;
  desc: string;
  icon: typeof Flower2;
  href: string;
  img: string;
  accent: string;
  live: boolean;
};

const gifts: Gift[] = [
  { name: 'Digital Bouquet', desc: 'Arrange flowers and wrap them in a heartfelt note.', icon: Flower2, href: '/create/bouquet', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop', accent: '#C16E7E', live: true },
  { name: 'Virtual Cake', desc: 'A 3D birthday cake with candles & a wish.', icon: Cake, href: '#', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop', accent: '#D9A05B', live: false },
  { name: 'Hug Card', desc: 'A pull-to-open card with a warm virtual hug.', icon: Heart, href: '#', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop', accent: '#B7A0C9', live: false },
  { name: "Mother's Day Card", desc: 'An animated card that reveals your message.', icon: MailOpen, href: '#', img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop', accent: '#C16E7E', live: false },
  { name: 'Greeting Card', desc: 'A heartfelt card for any moment.', icon: Sparkles, href: '#', img: 'https://images.unsplash.com/photo-1606830733744-0ad778449672?q=80&w=800&auto=format&fit=crop', accent: '#8FA98A', live: false },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

function GiftCard({ gift }: { gift: Gift }) {
  const { name, desc, icon: Icon, img, accent, live } = gift;

  const card = (
    <motion.div
      variants={item}
      whileHover={live ? { y: -8 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative h-72 w-full overflow-hidden rounded-[1.75rem] shadow-lg shadow-[var(--charcoal)]/5 ring-1 ring-black/5 ${live ? 'cursor-pointer' : 'cursor-not-allowed'}`}
    >
      <Image
        src={img}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover transition-transform duration-700 ease-out ${live ? 'group-hover:scale-110' : 'grayscale-[35%]'}`}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,33,30,0.92),rgba(38,33,30,0.45)_45%,rgba(38,33,30,0.1)_75%,transparent)]" />

      {/* shine on hover (live only) */}
      {live && (
        <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}

      {/* icon chip */}
      <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 shadow-md backdrop-blur-sm" style={{ color: accent }}>
        <Icon className="h-5 w-5" />
      </span>

      {/* status */}
      <span className="absolute right-4 top-4">
        {live ? (
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--rose-deep)] shadow-sm">Available</span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <Lock className="h-3 w-3" /> Soon
          </span>
        )}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
        <h3 className="font-heading text-2xl text-white">{name}</h3>
        <p className="mt-1.5 text-sm text-white/90">{desc}</p>
        {live && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            Start creating
            <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        )}
      </div>
    </motion.div>
  );

  return live ? <Link href={gift.href}>{card}</Link> : <div>{card}</div>;
}

export default function CreateChooser() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[var(--background)] pt-16">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose)]">Let&apos;s make something</p>
            <h1 className="mt-4 font-heading text-4xl text-[var(--charcoal)] sm:text-5xl">
              What would you like to create?
            </h1>
            <p className="mt-4 text-lg text-[var(--stone)]">
              Choose a gift to start. More kinds are blooming soon. 🌱
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gifts.map((gift) => (
              <GiftCard key={gift.name} gift={gift} />
            ))}
          </motion.div>
        </section>
      </main>
    </>
  );
}
