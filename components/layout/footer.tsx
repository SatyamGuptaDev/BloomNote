import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium text-zinc-900">Petals & Words</h3>
            <p className="text-sm text-zinc-500 max-w-xs">
              Crafting beautiful floral arrangements and poetic stationary for unforgettable moments.
            </p>
          </div>
          <div className="space-y-4 lg:col-start-3">
            <h4 className="text-sm font-medium text-zinc-900">Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-zinc-900 transition-colors">Our Story</Link>
              <Link href="/services" className="hover:text-zinc-900 transition-colors">Services</Link>
              <Link href="/portfolio" className="hover:text-zinc-900 transition-colors">Portfolio</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-zinc-900">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <a href="mailto:hello@petalsandwords.com" className="hover:text-zinc-900 transition-colors">
                hello@petalsandwords.com
              </a>
              <p>Los Angeles, CA</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-zinc-100 pt-8 sm:flex-row text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Petals & Words. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
