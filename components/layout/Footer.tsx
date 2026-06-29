import Link from 'next/link';
import { Instagram, Twitter, MessageCircle } from 'lucide-react'; // Using MessageCircle as placeholder for Pinterest if needed, or something else. Let's stick to standard social icons

export function Footer() {
  return (
    <footer className="bg-[var(--cream)] border-t border-[var(--blush)]/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[var(--rose)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C7.5 2 4 5.5 4 10c0 4.5 3.5 12 8 12s8-7.5 8-12c0-4.5-3.5-8-8-8zm0 18c-3.3 0-6-6-6-10 0-3.3 2.7-6 6-6s6 2.7 6 6c0 4 2.7 10-6 10z" />
                <path d="M12 7c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
              </svg>
              <span className="font-heading text-xl text-[var(--charcoal)] font-semibold">BloomNote</span>
            </Link>
            <p className="text-[var(--stone)] text-sm">Made for meaningful moments.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-[var(--stone)] hover:text-[var(--rose)] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-[var(--stone)] hover:text-[var(--rose)] transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm font-medium text-[var(--charcoal)]">Subscribe for updates</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white border border-[var(--blush)] rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-[var(--rose)]/50 focus:border-[var(--rose)] outline-none transition-all"
                />
                <button className="bg-[var(--charcoal)] text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-lg text-[var(--charcoal)] font-medium">Product</h4>
            <Link href="/" className="text-[var(--stone)] text-sm hover:text-[var(--rose)] transition-colors">Home</Link>
            <Link href="/create" className="text-[var(--stone)] text-sm hover:text-[var(--rose)] transition-colors">Create Bouquet</Link>
            <Link href="/blog" className="text-[var(--stone)] text-sm hover:text-[var(--rose)] transition-colors">Blog</Link>
            <span className="text-[var(--stone)] text-sm opacity-75">Pricing (Coming Soon)</span>
          </div>

          {/* Occasions Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-lg text-[var(--charcoal)] font-medium">Occasions</h4>
            {[
              { slug: 'mothers-day', name: "Mother's Day" },
              { slug: 'birthday', name: 'Birthday' },
              { slug: 'anniversary', name: 'Anniversary' },
              { slug: 'apology', name: 'Apology' },
              { slug: 'just-because', name: 'Just Because' }
            ].map((occ) => (
              <Link key={occ.slug} href={`/occasions/${occ.slug}`} className="text-[var(--stone)] text-sm hover:text-[var(--rose)] transition-colors">
                {occ.name}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-lg text-[var(--charcoal)] font-medium">Legal</h4>
            <Link href="#" className="text-[var(--stone)] text-sm hover:text-[var(--rose)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[var(--stone)] text-sm hover:text-[var(--rose)] transition-colors">Terms of Service</Link>
            <Link href="#" className="text-[var(--stone)] text-sm hover:text-[var(--rose)] transition-colors">Contact</Link>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--blush)]/50 flex flex-col items-center">
          <p className="text-[var(--stone)] text-sm">© 2026 BloomNote. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
