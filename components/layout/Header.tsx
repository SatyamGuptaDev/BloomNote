'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  variant?: 'default' | 'minimal';
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <svg className="w-6 h-6 text-[var(--rose)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7.5 2 4 5.5 4 10c0 4.5 3.5 12 8 12s8-7.5 8-12c0-4.5-3.5-8-8-8zm0 18c-3.3 0-6-6-6-10 0-3.3 2.7-6 6-6s6 2.7 6 6c0 4 2.7 10-6 10z" />
        <path d="M12 7c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
      </svg>
      <span className="font-heading text-xl text-[var(--charcoal)] font-semibold">BloomNote</span>
    </Link>
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--blush)]/50 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Logo />

          {variant === 'default' && (
            <>
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-[var(--stone)] hover:text-[var(--rose)] transition-colors duration-200">
                  Home
                </Link>
                <Link href="/create" className="text-[var(--stone)] hover:text-[var(--rose)] transition-colors duration-200">
                  Create
                </Link>
                <Link href="/blog" className="text-[var(--stone)] hover:text-[var(--rose)] transition-colors duration-200">
                  Blog
                </Link>
                <div className="relative group">
                  <span className="text-[var(--stone)] hover:text-[var(--rose)] transition-colors duration-200 cursor-pointer">
                    Occasions
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-xl border border-[var(--blush)]/50 py-2 w-48 flex flex-col">
                      {[
                        { slug: 'mothers-day', name: "Mother's Day" },
                        { slug: 'birthday', name: 'Birthday' },
                        { slug: 'anniversary', name: 'Anniversary' },
                        { slug: 'apology', name: 'Apology' },
                        { slug: 'just-because', name: 'Just Because' }
                      ].map((occ) => (
                        <Link 
                          key={occ.slug} 
                          href={`/occasions/${occ.slug}`}
                          className="px-4 py-2 text-sm text-[var(--stone)] hover:text-[var(--rose)] hover:bg-[var(--blush)]/20 transition-colors"
                        >
                          {occ.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <Link 
                  href="/create" 
                  className="bg-[var(--rose)] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 hover:shadow-lg hover:shadow-[var(--rose)]/20 transition-all"
                >
                  Create Bouquet
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-[var(--charcoal)]"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[var(--charcoal)]/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 flex justify-end">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[var(--stone)] hover:text-[var(--charcoal)]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-6 p-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-[var(--charcoal)]">
                  Home
                </Link>
                <Link href="/create" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-[var(--charcoal)]">
                  Create Bouquet
                </Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-[var(--charcoal)]">
                  Blog
                </Link>
                <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-[var(--blush)]/50">
                  <span className="text-sm text-[var(--stone)] uppercase tracking-wider font-semibold">Occasions</span>
                  {[
                    { slug: 'mothers-day', name: "Mother's Day" },
                    { slug: 'birthday', name: 'Birthday' },
                    { slug: 'anniversary', name: 'Anniversary' },
                    { slug: 'apology', name: 'Apology' },
                    { slug: 'just-because', name: 'Just Because' }
                  ].map((occ) => (
                    <Link 
                      key={occ.slug} 
                      href={`/occasions/${occ.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-heading text-xl text-[var(--charcoal)] hover:text-[var(--rose)]"
                    >
                      {occ.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-8 pb-12">
                <Link 
                  href="/create" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center bg-[var(--rose)] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-opacity-90 shadow-lg transition-all"
                >
                  Create Bouquet
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
