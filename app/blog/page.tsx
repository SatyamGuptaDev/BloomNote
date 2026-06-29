import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChevronRight } from 'lucide-react';

// Static fallback data for MVP
const BLOG_POSTS = [
  { slug: "5-things-to-write-just-because", title: "5 Things to Write in a Just Because Card", excerpt: "Stuck on what to say? Here are thoughtful prompts to make them smile without a specific reason.", cat: "Guides" },
  { slug: "meaning-behind-rose-colors", title: "The Meaning Behind Different Rose Colors", excerpt: "Did you know yellow means friendship while white signifies new beginnings? A quick guide to floral symbolism.", cat: "Floral Guide" },
  { slug: "long-distance-birthday", title: "How to Make a Long-Distance Birthday Special", excerpt: "Distance doesn't mean you can't celebrate. Tips for making them feel loved from afar.", cat: "Relationships" },
  { slug: "apology-messages", title: "How to Say I'm Sorry (And Mean It)", excerpt: "An apology is an art. Here is how to structure a heartfelt apology message.", cat: "Guides" },
  { slug: "mothers-day-history", title: "The History of Mother's Day Flowers", excerpt: "Why do we give flowers on Mother's Day? A look back at the traditions.", cat: "History" },
  { slug: "digital-gifting-trend", title: "Why Digital Gifting is the New Norm", excerpt: "It's instantaneous, zero-waste, and highly personal. The rise of virtual gifts.", cat: "Trends" },
];

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20 bg-[var(--cream)]/30 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl text-[var(--charcoal)] mb-4">
              Flower Blog — Bouquet Ideas & Messages
            </h1>
            <p className="text-lg text-[var(--stone)] max-w-2xl mx-auto">
              Guides, tips, and inspiration for thoughtful digital gifting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--blush)]/50 flex flex-col group">
                <div className="h-48 bg-gradient-to-br from-[var(--blush)] to-[var(--cream)] relative overflow-hidden flex items-center justify-center">
                   {/* Placeholder visual */}
                   <div className="w-24 h-24 bg-white/40 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block bg-[var(--rose)]/10 text-[var(--rose)] text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                    {post.cat}
                  </span>
                  <h3 className="font-heading text-xl text-[var(--charcoal)] mb-3 group-hover:text-[var(--rose)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[var(--stone)] text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-[var(--charcoal)] font-medium flex items-center gap-1 mt-auto group-hover:text-[var(--rose)] transition-colors">
                    Read article <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
