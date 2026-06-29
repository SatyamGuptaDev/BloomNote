import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Use same static fallback data
const BLOG_POSTS = [
  { slug: "5-things-to-write-just-because", title: "5 Things to Write in a Just Because Card", excerpt: "Stuck on what to say? Here are thoughtful prompts to make them smile without a specific reason.", cat: "Guides" },
  { slug: "meaning-behind-rose-colors", title: "The Meaning Behind Different Rose Colors", excerpt: "Did you know yellow means friendship while white signifies new beginnings? A quick guide to floral symbolism.", cat: "Floral Guide" },
  { slug: "long-distance-birthday", title: "How to Make a Long-Distance Birthday Special", excerpt: "Distance doesn't mean you can't celebrate. Tips for making them feel loved from afar.", cat: "Relationships" },
  { slug: "apology-messages", title: "How to Say I'm Sorry (And Mean It)", excerpt: "An apology is an art. Here is how to structure a heartfelt apology message.", cat: "Guides" },
  { slug: "mothers-day-history", title: "The History of Mother's Day Flowers", excerpt: "Why do we give flowers on Mother's Day? A look back at the traditions.", cat: "History" },
  { slug: "digital-gifting-trend", title: "Why Digital Gifting is the New Norm", excerpt: "It's instantaneous, zero-waste, and highly personal. The rise of virtual gifts.", cat: "Trends" },
];

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post not found' };
  
  return {
    title: `${post.title} | BloomNote Blog`,
    description: post.excerpt
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-4">
          
          <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-[var(--blush)] to-[var(--cream)] rounded-2xl mb-12 relative overflow-hidden flex items-center justify-center shadow-inner">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor" className="text-white/50 drop-shadow-md">
              <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" />
            </svg>
          </div>

          <div className="flex items-center gap-4 mb-6 text-sm text-[var(--stone)]">
            <span className="bg-[var(--rose)]/10 text-[var(--rose)] px-3 py-1 rounded-full font-medium">
              {post.cat}
            </span>
            <span>•</span>
            <span>May 15, 2026</span>
            <span>•</span>
            <span>3 min read</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl text-[var(--charcoal)] mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Dummy Content */}
          <div className="prose prose-lg max-w-none text-[var(--charcoal)]/80 prose-headings:font-heading prose-headings:font-normal prose-a:text-[var(--rose)]">
            <p className="lead text-xl text-[var(--stone)] mb-8">
              {post.excerpt}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-3xl mt-12 mb-6">The Art of the Message</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ul className="my-6 space-y-2 list-disc list-inside">
              <li>Be sincere and specific</li>
              <li>Keep it concise but meaningful</li>
              <li>Reference a shared memory</li>
            </ul>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[var(--blush)] to-[var(--cream)] rounded-2xl p-8 sm:p-12 mt-16 text-center shadow-sm border border-white/50">
            <h3 className="font-heading text-3xl text-[var(--charcoal)] mb-4">Put it into practice</h3>
            <p className="text-[var(--stone)] mb-8">Create a beautiful digital bouquet with your perfect message in 60 seconds.</p>
            <Link 
              href="/create"
              className="inline-block bg-[var(--rose)] text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Create a Free Bouquet
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
