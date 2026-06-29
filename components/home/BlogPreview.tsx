'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { BlurFade } from '@/components/magic/BlurFade';
import { WordReveal } from '@/components/magic/WordReveal';

const posts = [
  { title: '5 Things to Write in a "Just Because" Card', excerpt: 'Stuck on what to say? Thoughtful prompts that make them smile — no occasion required.', cat: 'Guides', slug: '5-things-to-write-just-because', date: 'Apr 2, 2026', read: '4 min', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=900&auto=format&fit=crop' },
  { title: 'The Meaning Behind Rose Colours', excerpt: 'Yellow means friendship, white signifies new beginnings — a quick guide to floral symbolism.', cat: 'Floral Guide', slug: 'meaning-behind-rose-colors', date: 'Mar 28, 2026', read: '3 min', image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=600&auto=format&fit=crop' },
  { title: 'Why Digital Gifting Is the New Norm', excerpt: 'Instant, zero-waste and deeply personal — the quiet rise of virtual gifts.', cat: 'Trends', slug: 'digital-gifting-trend', date: 'Mar 20, 2026', read: '5 min', image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=600&auto=format&fit=crop' },
];

const [featured, ...rest] = posts;

const fade: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function BlogPreview() {
  return (
    <section className="bg-[var(--background)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <BlurFade>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose)]">The journal</p>
            </BlurFade>
            <h2 className="mt-4 font-heading text-4xl text-[var(--charcoal)] sm:text-5xl">
              <WordReveal text="Notes on thoughtful gifting" />
            </h2>
          </div>
          <BlurFade delay={0.15}>
            <Link
              href="/blog"
              className="group hidden shrink-0 items-center gap-1.5 rounded-full border border-[var(--blush)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--charcoal)] transition-colors hover:border-[var(--rose)] hover:text-[var(--rose-deep)] sm:inline-flex"
            >
              All articles
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </BlurFade>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Featured */}
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <Link href={`/blog/${featured.slug}`} className="group block overflow-hidden rounded-3xl border border-[var(--blush)] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-[var(--rose)]/10">
              <div className="relative h-72 overflow-hidden sm:h-80">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[var(--rose-deep)] shadow-sm">
                  {featured.cat}
                </span>
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-3 text-xs text-[var(--stone)]">
                  <span>{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--blush)]" />
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.read} read</span>
                </div>
                <h3 className="mt-3 font-heading text-2xl leading-snug text-[var(--charcoal)] transition-colors group-hover:text-[var(--rose-deep)] sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--stone)]">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--rose-deep)]">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* List */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col justify-center divide-y divide-[var(--blush)]"
          >
            {rest.map((post) => (
              <motion.div key={post.slug} variants={fade} className="py-5 first:pt-0 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="group flex gap-5">
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--rose)]">
                      <span>{post.cat}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--blush)]" />
                      <span className="text-[var(--stone)]">{post.read} read</span>
                    </div>
                    <h3 className="mt-1.5 font-heading text-lg leading-snug text-[var(--charcoal)] transition-colors group-hover:text-[var(--rose-deep)]">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-[var(--stone)]">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            <BlurFade delay={0.2} className="pt-6 sm:hidden">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--rose-deep)]">
                All articles <ArrowRight className="h-4 w-4" />
              </Link>
            </BlurFade>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
