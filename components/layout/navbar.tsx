import Link from 'next/link';
import { Menu } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-medium tracking-tight text-zinc-900">
            Petals & Words
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="/about" className="hover:text-zinc-900 transition-colors">
            Our Story
          </Link>
          <Link href="/services" className="hover:text-zinc-900 transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="hover:text-zinc-900 transition-colors">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-zinc-900 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90">
            Inquire Now
          </button>
          <button className="md:hidden p-2 text-zinc-600">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
