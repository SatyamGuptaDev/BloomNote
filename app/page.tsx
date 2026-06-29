import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChevronLeft, ChevronRight, Flower2, PenTool, Share2, Heart, Cake, Sparkles, MessageCircle, Sun, Star } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-16">
        
        {/* Section 1: Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[var(--blush)] via-[var(--cream)] to-[var(--lavender)] overflow-hidden">
          {/* Floating petals - handled via CSS animations in a real app, here we use simple absolute divs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute opacity-40 animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${5 + Math.random() * 3}s`
                }}
              >
                <svg width="24" height="24" viewBox="0 0 100 100" fill="#F472B6" className="transform rotate-45">
                  <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" />
                </svg>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto px-4 z-10 flex flex-col items-center">
            {/* Logo mark */}
            <svg className="w-32 h-32 mx-auto mb-8 opacity-90 text-[var(--rose)]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" />
              <path d="M50 25C43 25 35 38 35 50C35 62 43 75 50 75C57 75 65 62 65 50C65 38 57 25 50 25Z" fill="#F9A8D4" />
              <circle cx="50" cy="50" r="5" fill="#FFF" />
            </svg>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-[var(--charcoal)] text-center leading-tight">
              Send Flowers <br className="hidden sm:block"/>
              <span className="italic text-[var(--rose)]">She'll never forget</span>
            </h1>
            
            <p className="font-body text-lg sm:text-xl text-[var(--stone)] text-center mt-6 max-w-2xl mx-auto leading-relaxed">
              A digital bouquet with your words, delivered in seconds — for family, friends, or anyone you care about.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
              <Link 
                href="/create"
                className="bg-[var(--rose)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-[var(--rose)]/30 hover:shadow-xl hover:shadow-[var(--rose)]/40 hover:scale-105 transition-all duration-300"
              >
                Create Your Bouquet
              </Link>
              <a 
                href="#how-it-works"
                className="text-[var(--charcoal)] hover:text-[var(--rose)] underline underline-offset-4 transition-colors font-medium"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-8 text-sm text-[var(--stone)] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-sm border border-white/50">
              <span>✨ No login required · Ready in 60 seconds · Share via WhatsApp</span>
            </div>
          </div>
        </section>

        {/* Section 2: Live Preview Carousel */}
        <section className="py-20 bg-white">
          <h2 className="font-heading text-3xl sm:text-4xl text-center text-[var(--charcoal)] mb-12 px-4">
            "They deserve more than a text."
          </h2>
          
          <div className="w-full overflow-hidden relative max-w-7xl mx-auto px-4">
             {/* MVP Carousel: Using a simple CSS flex layout with overflow-x-auto for native feel */}
             <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
                {[
                  { q: "I sent this in 2 minutes and it felt so personal, not generic at all.", a: "Aditi, Mumbai" },
                  { q: "My mom actually cried when she opened the link. Such a beautiful idea.", a: "Sarah, London" },
                  { q: "Perfect for long-distance relationships. The note card is so elegant.", a: "David, NYC" },
                  { q: "Way better than a boring emoji. It actually feels like a gift.", a: "Elena, Madrid" }
                ].map((testimonial, i) => (
                  <div key={i} className="snap-center w-80 shrink-0 bg-white rounded-2xl shadow-lg border border-[var(--blush)]/30 p-6 flex flex-col">
                    <div className="h-48 bg-[var(--cream)] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
                       {/* Mock bouquet */}
                       <svg width="60" height="60" viewBox="0 0 100 100" fill="#F472B6" className="absolute">
                         <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" />
                       </svg>
                       <svg width="40" height="40" viewBox="0 0 100 100" fill="#FBBF24" className="absolute -ml-16 mt-8">
                         <circle cx="50" cy="50" r="40" />
                       </svg>
                       <svg width="50" height="50" viewBox="0 0 100 100" fill="#A78BFA" className="absolute ml-16 mt-4">
                         <path d="M50 80C35 80 25 60 30 30L40 45L50 25L60 45L70 30C75 60 65 80 50 80Z" />
                       </svg>
                    </div>
                    <p className="font-script text-2xl text-[var(--charcoal)] mb-4 leading-snug">"{testimonial.q}"</p>
                    <p className="text-sm text-[var(--stone)] mt-auto font-body uppercase tracking-wider">— {testimonial.a}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-[var(--blush)]/30">
          <h2 className="font-heading text-4xl text-center text-[var(--charcoal)] mb-16">How it works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {[
              { num: '01', icon: <Flower2 className="w-6 h-6 text-[var(--rose)]" />, title: "Pick your flowers", desc: "Choose stems and arrange them into a bouquet they'll love." },
              { num: '02', icon: <PenTool className="w-6 h-6 text-[var(--rose)]" />, title: "Write from the heart", desc: "Add a personal note — or pick from our curated message ideas." },
              { num: '03', icon: <Share2 className="w-6 h-6 text-[var(--rose)]" />, title: "Share instantly", desc: "Get a unique link. Send over WhatsApp in seconds." }
            ].map((step, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[var(--blush)]/20">
                <span className="text-7xl font-heading text-[var(--rose)]/10 absolute top-4 right-6">{step.num}</span>
                <div className="w-12 h-12 bg-[var(--rose)]/10 rounded-2xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="font-heading text-2xl text-[var(--charcoal)] mb-3 relative z-10">{step.title}</h3>
                <p className="text-[var(--stone)] leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Occasion Grid */}
        <section className="py-24 bg-white">
          <h2 className="font-heading text-4xl text-center text-[var(--charcoal)] mb-4 px-4">Thoughtful Gifts Made Easy</h2>
          <p className="text-[var(--stone)] text-center mb-12 max-w-xl mx-auto px-4">Make someone in your life feel truly seen.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
            {[
              { slug: 'mothers-day', name: "Mother's Day", icon: Heart, bg: 'from-[var(--blush)] to-white', color: 'text-pink-500' },
              { slug: 'birthday', name: 'Birthday', icon: Cake, bg: 'from-[var(--cream)] to-white', color: 'text-amber-500' },
              { slug: 'anniversary', name: 'Anniversary', icon: Sparkles, bg: 'from-[var(--lavender)] to-white', color: 'text-purple-500' },
              { slug: 'apology', name: 'Apology', icon: MessageCircle, bg: 'from-[var(--sage)]/30 to-white', color: 'text-emerald-600' },
              { slug: 'get-well-soon', name: 'Get Well Soon', icon: Sun, bg: 'from-orange-100 to-white', color: 'text-orange-500' },
              { slug: 'just-because', name: 'Just Because', icon: Star, bg: 'from-blue-100 to-white', color: 'text-blue-500' }
            ].map((occ) => {
              const Icon = occ.icon;
              return (
                <Link key={occ.slug} href={`/occasions/${occ.slug}`} className="group block">
                  <div className={`relative overflow-hidden rounded-2xl h-64 bg-gradient-to-br ${occ.bg} border border-[var(--blush)]/50 p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-[1.02]`}>
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-8 h-8 ${occ.color}`} />
                    </div>
                    <h3 className="font-heading text-xl text-[var(--charcoal)] mb-2">{occ.name}</h3>
                    <span className="text-sm font-medium text-[var(--rose)] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 underline underline-offset-4">
                      Create →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Section 5: Blog Preview */}
        <section className="py-20 bg-[var(--cream)]/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-3xl text-[var(--charcoal)] mb-8">From the blog</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "5 Things to Write in a Just Because Card", excerpt: "Stuck on what to say? Here are thoughtful prompts to make them smile without a specific reason.", cat: "Guides" },
                { title: "The Meaning Behind Different Rose Colors", excerpt: "Did you know yellow means friendship while white signifies new beginnings? A quick guide to floral symbolism.", cat: "Floral Guide" },
                { title: "How to Make a Long-Distance Birthday Special", excerpt: "Distance doesn't mean you can't celebrate. Tips for making them feel loved from afar.", cat: "Relationships" }
              ].map((post, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-[var(--blush)]/30 flex flex-col">
                  <div className="h-48 bg-[var(--blush)]/30 relative">
                     {/* Placeholder image */}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="inline-block bg-[var(--rose)]/10 text-[var(--rose)] text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                      {post.cat}
                    </span>
                    <h3 className="font-heading text-xl text-[var(--charcoal)] mb-3">{post.title}</h3>
                    <p className="text-[var(--stone)] text-sm line-clamp-2 mb-6 flex-1">{post.excerpt}</p>
                    <Link href={`/blog/post-${i}`} className="text-[var(--rose)] font-medium hover:underline flex items-center gap-1 mt-auto">
                      Read article <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/blog" className="text-[var(--charcoal)] hover:text-[var(--rose)] underline underline-offset-4 transition-colors font-medium">
                View all articles
              </Link>
            </div>
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section className="py-24 bg-gradient-to-r from-[var(--rose)]/10 via-[var(--blush)] to-[var(--lavender)]/30 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-4xl text-[var(--charcoal)] mb-8">Ready to make someone smile?</h2>
            <Link 
              href="/create"
              className="inline-block bg-[var(--rose)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-[var(--rose)]/30 hover:shadow-xl hover:shadow-[var(--rose)]/40 hover:scale-105 transition-all duration-300"
            >
              Create Your Free Bouquet
            </Link>
            <p className="text-[var(--stone)] mt-6 font-medium">Takes 60 seconds. No account needed.</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
