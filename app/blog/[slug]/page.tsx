import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { BackButton } from '@/components/shared/BackButton';

// Use same static fallback data
const BLOG_POSTS = [
  { slug: "5-things-to-write-just-because", title: "5 Things to Write in a Just Because Card", excerpt: "Stuck on what to say? Here are thoughtful prompts to make them smile without a specific reason.", cat: "Guides", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop" },
  { slug: "meaning-behind-rose-colors", title: "The Meaning Behind Different Rose Colors", excerpt: "Did you know yellow means friendship while white signifies new beginnings? A quick guide to floral symbolism.", cat: "Floral Guide", image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=800&auto=format&fit=crop" },
  { slug: "long-distance-birthday", title: "How to Make a Long-Distance Birthday Special", excerpt: "Distance doesn't mean you can't celebrate. Tips for making them feel loved from afar.", cat: "Relationships", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop" },
  { slug: "apology-messages", title: "How to Say I'm Sorry (And Mean It)", excerpt: "An apology is an art. Here is how to structure a heartfelt apology message.", cat: "Guides", image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop" },
  { slug: "mothers-day-history", title: "The History of Mother's Day Flowers", excerpt: "Why do we give flowers on Mother's Day? A look back at the traditions.", cat: "History", image: "https://images.unsplash.com/photo-1490750967868-88cb4eca20db?q=80&w=800&auto=format&fit=crop" },
  { slug: "digital-gifting-trend", title: "Why Digital Gifting is the New Norm", excerpt: "It's instantaneous, zero-waste, and highly personal. The rise of virtual gifts.", cat: "Trends", image: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=800&auto=format&fit=crop" },
];

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return { title: 'Post not found' };
  
  return {
    title: `${post.title} | Dear Bloomy Blog`,
    description: post.excerpt
  };
}

const getContentForSlug = (slug: string) => {
  switch(slug) {
    case '5-things-to-write-just-because':
      return (
        <>
          <p>Hey everyone, it’s the Dear Bloomy team here. As product builders and relationship enthusiasts, we spend a lot of time thinking about how people connect. The absolute best gifts aren't the ones expected on birthdays or anniversaries—they are the spontaneous "just because" moments that show someone you were actively thinking of them on a random Tuesday.</p>
          <p>We built Dear Bloomy precisely for these moments. But when you load up that blank note card, sometimes the cursor just blinks at you. What do you actually say?</p>
          <h2 className="text-3xl mt-12 mb-6">1. The 'I Saw This and Thought of You'</h2>
          <p>Relatability is everything. "I walked past that coffee shop we always used to go to and it made me smile. Hope you're having a great week." It's low-pressure, highly personal, and instantly makes them feel seen.</p>
          <h2 className="text-3xl mt-12 mb-6">2. The Micro-Encouragement</h2>
          <p>"I know you've got that huge presentation coming up on Thursday. You're going to crush it. Just wanted to send some good energy your way." As a founder, I can tell you these tiny boosts of confidence are game-changers.</p>
          <h2 className="text-3xl mt-12 mb-6">3. The Random Memory Drop</h2>
          <p>"Remember that time we got lost in Kyoto? Just popped into my head today. Miss those adventures." Nostalgia is a powerful emotion. Tap into it.</p>
          <p>Don't overthink it. A digital bouquet takes 60 seconds to make, and the impact lasts all week. Grab a template, tweak it, and hit send.</p>
        </>
      );
    case 'meaning-behind-rose-colors':
      return (
        <>
          <p>Let's talk about product design in the real world: specifically, how nature engineered the ultimate communication tool—the rose. Each color is basically a different feature set, signaling a completely different emotional intent.</p>
          <h2 className="text-3xl mt-12 mb-6">Red: The Classic Romantic</h2>
          <p>It's the flagship. Red roses are universally recognized as the symbol of deep, romantic love. When you want zero ambiguity in your message, you go with red.</p>
          <h2 className="text-3xl mt-12 mb-6">Yellow: The Friendship Anchor</h2>
          <p>Yellow is sunshine. It's platonic, joyful, and optimistic. It's the perfect color to send to a best friend or a colleague who just secured a massive win.</p>
          <h2 className="text-3xl mt-12 mb-6">White: The Blank Canvas</h2>
          <p>White roses signify purity, new beginnings, and remembrance. They are elegant, understated, and often used for weddings or to offer sympathy.</p>
          <p>When you're building a bouquet on Dear Bloomy, think of the colors as your color palette for emotion. Mix and match to create exactly the vibe you want.</p>
        </>
      );
    case 'digital-gifting-trend':
      return (
        <>
          <p>As a product manager, I'm constantly analyzing shifts in consumer behavior. Over the last three years, we've seen a massive pivot away from physical clutter and towards digital, experiential moments. This isn't just a Gen Z trend—it's a fundamental shift in how we value connection.</p>
          <h2 className="text-3xl mt-12 mb-6">The Friction of Physical Gifting</h2>
          <p>Think about sending real flowers. You need an address, you need to coordinate delivery times, and you're paying a 300% markup for logistical overhead. By the time they arrive, the spontaneous emotion that triggered the gift has often passed.</p>
          <h2 className="text-3xl mt-12 mb-6">Instant Gratification meets Deep Personalization</h2>
          <p>What we've realized is that people don't necessarily want the physical object; they want the *feeling* of being cared for. A digital bouquet, arranged by hand on a canvas, paired with a heartfelt note, delivers that exact emotional payload instantly over an iMessage or WhatsApp.</p>
          <p>It's sustainable, it's instant, and frankly, it feels a lot more modern. Welcome to the future of gifting.</p>
        </>
      );
    default:
      return (
        <>
          <p className="lead text-xl text-[var(--stone)] mb-8">
            Sometimes the most meaningful gestures are the simplest ones. In our fast-paced, hyper-connected world, taking a minute to slow down and craft something beautiful for someone else stands out.
          </p>
          <p>
            When we designed Dear Bloomy, we looked at how people were communicating. Text messages felt too brief, while traditional gifting felt too heavy and full of friction. We needed a middle ground—a digital artifact that carried emotional weight without the logistical nightmare.
          </p>
          <h2 className="text-3xl mt-12 mb-6">The Power of Intent</h2>
          <p>
            It's not about the pixels on the screen; it's about the fact that you took the time to arrange them. You chose the colors. You wrote the note. You hit send. That intent is what the recipient actually feels when they open the link.
          </p>
          <ul className="my-6 space-y-2 list-disc list-inside">
            <li>Keep it authentic to your voice</li>
            <li>Don't worry about being perfect</li>
            <li>The timing is more important than the presentation</li>
          </ul>
          <p>
            Next time you think of someone, don't just let the thought pass. Build them a quick bouquet. It takes 60 seconds, and it might just make their entire month.
          </p>
        </>
      );
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
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
          <BackButton label="Back to Blog" />
          
          <div className="w-full h-64 sm:h-96 bg-[var(--blush)] rounded-2xl mb-12 relative overflow-hidden flex items-center justify-center shadow-inner">
             <Image 
               src={post.image} 
               alt={post.title} 
               fill 
               className="object-cover"
               referrerPolicy="no-referrer"
             />
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

          <div className="prose prose-lg max-w-none text-[var(--charcoal)]/80 prose-headings:font-heading prose-headings:font-normal prose-a:text-[var(--rose)]">
            {getContentForSlug(post.slug)}
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
