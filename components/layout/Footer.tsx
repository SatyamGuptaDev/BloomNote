import Link from 'next/link';
import { Instagram, Twitter } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] pt-16 pb-8 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Logo dark />
            <p className="text-white/60 text-sm">Made for meaningful moments.</p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-[var(--rose)] hover:text-white" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-[var(--rose)] hover:text-white" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm font-medium text-white">Subscribe for updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-[var(--rose)] focus:ring-2 focus:ring-[var(--rose)]/40"
                />
                <button className="whitespace-nowrap rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--rose-deep)]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-lg text-white font-medium">Product</h4>
            <Link href="/" className="text-white/60 text-sm hover:text-[var(--rose)] transition-colors">Home</Link>
            <Link href="/create" className="text-white/60 text-sm hover:text-[var(--rose)] transition-colors">Create a gift</Link>
            <Link href="/blog" className="text-white/60 text-sm hover:text-[var(--rose)] transition-colors">Blog</Link>
            <span className="text-white/40 text-sm">Pricing (Coming Soon)</span>
          </div>

          {/* Occasions Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-lg text-white font-medium">Occasions</h4>
            {[
              { slug: 'mothers-day', name: "Mother's Day" },
              { slug: 'birthday', name: 'Birthday' },
              { slug: 'anniversary', name: 'Anniversary' },
              { slug: 'apology', name: 'Apology' },
              { slug: 'just-because', name: 'Just Because' }
            ].map((occ) => (
              <Link key={occ.slug} href={`/occasions/${occ.slug}`} className="text-white/60 text-sm hover:text-[var(--rose)] transition-colors">
                {occ.name}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-lg text-white font-medium">Legal</h4>
            <Link href="/privacy" className="text-white/60 text-sm hover:text-[var(--rose)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/60 text-sm hover:text-[var(--rose)] transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-white/60 text-sm hover:text-[var(--rose)] transition-colors">Contact</Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center">
          <p className="text-white/50 text-sm">© 2026 Dear Bloomy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
