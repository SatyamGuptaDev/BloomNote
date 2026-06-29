'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

function Avatar({ name, email }: { name?: string | null; email?: string | null }) {
  const initial = (name?.trim()?.[0] || email?.trim()?.[0] || 'U').toUpperCase();
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--rose)] text-sm font-semibold text-white">
      {initial}
    </span>
  );
}

interface HeaderProps {
  variant?: 'default' | 'minimal';
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentBouquets, setRecentBouquets] = useState<{slug: string, fromName: string | null, note: string | null, date: string}[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    try {
      const recentStr = localStorage.getItem('recent_bouquets');
      if (recentStr) {
        setRecentBouquets(JSON.parse(recentStr));
      }
    } catch (error) {
      console.error('Error loading recent bouquets', error);
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--blush)] shadow-sm shadow-[var(--charcoal)]/[0.03] h-16">
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
                {recentBouquets.length > 0 && (
                  <div className="relative group">
                    <span className="text-[var(--stone)] hover:text-[var(--rose)] transition-colors duration-200 cursor-pointer">
                      Recent
                    </span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="bg-white rounded-xl shadow-xl border border-[var(--blush)]/50 py-2 w-64 flex flex-col max-h-80 overflow-y-auto">
                        {recentBouquets.map((b) => (
                          <Link 
                            key={b.slug} 
                            href={`/b/${b.slug}`}
                            className="px-4 py-3 text-sm text-[var(--charcoal)] border-b border-[var(--blush)]/30 hover:bg-[var(--blush)]/20 transition-colors last:border-0"
                          >
                            <div className="font-medium truncate">{b.fromName ? `From ${b.fromName}` : 'Anonymous'}</div>
                            {b.note && <div className="text-xs text-[var(--stone)] truncate mt-1">"{b.note}"</div>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </nav>

              {/* Desktop CTA + Auth */}
              <div className="hidden md:flex items-center gap-4">
                {session?.user ? (
                  <div className="relative group">
                    <button className="flex items-center gap-2" aria-label="Account menu">
                      <Avatar name={session.user.name} email={session.user.email} />
                    </button>
                    <div className="absolute top-full right-0 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="w-56 bg-white rounded-xl shadow-xl border border-[var(--blush)]/50 py-2">
                        <div className="px-4 py-2 border-b border-[var(--blush)]/40">
                          <div className="text-sm font-medium text-[var(--charcoal)] truncate">{session.user.name || 'Your account'}</div>
                          {session.user.email && <div className="text-xs text-[var(--stone)] truncate">{session.user.email}</div>}
                        </div>
                        <Link href="/create" className="block px-4 py-2 text-sm text-[var(--charcoal)] hover:bg-[var(--blush)]/20">Create a gift</Link>
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--charcoal)] hover:bg-[var(--blush)]/20"
                        >
                          <LogOut className="w-4 h-4" /> Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="text-sm font-medium text-[var(--charcoal)] hover:text-[var(--rose)] transition-colors">
                    Log in
                  </Link>
                )}
                <Link
                  href="/create"
                  className="bg-[var(--rose)] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 hover:shadow-lg hover:shadow-[var(--rose)]/20 transition-all"
                >
                  Start gifting
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
              <div className="flex-1 flex flex-col gap-6 p-8 overflow-y-auto">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-[var(--charcoal)]">
                  Home
                </Link>
                <Link href="/create" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-[var(--charcoal)]">
                  Start gifting
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

                {recentBouquets.length > 0 && (
                  <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-[var(--blush)]/50">
                    <span className="text-sm text-[var(--stone)] uppercase tracking-wider font-semibold">Recent Bouquets</span>
                    {recentBouquets.map((b) => (
                      <Link 
                        key={b.slug} 
                        href={`/b/${b.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col py-2"
                      >
                        <span className="font-heading text-lg text-[var(--charcoal)] hover:text-[var(--rose)]">
                          {b.fromName ? `From ${b.fromName}` : 'Anonymous'}
                        </span>
                        {b.note && <span className="text-sm text-[var(--stone)] truncate">"{b.note}"</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-8 pb-12 mt-auto space-y-3">
                {session?.user ? (
                  <button
                    onClick={() => { setMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                    className="flex w-full items-center justify-center gap-2 border border-[var(--blush)] text-[var(--charcoal)] px-6 py-3 rounded-full text-base font-medium hover:bg-[var(--blush)]/30 transition-all"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-center border border-[var(--blush)] text-[var(--charcoal)] px-6 py-3 rounded-full text-base font-medium hover:bg-[var(--blush)]/30 transition-all"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-center border border-[var(--blush)] text-[var(--charcoal)] px-6 py-3 rounded-full text-base font-medium hover:bg-[var(--blush)]/30 transition-all"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
                <Link
                  href="/create"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center bg-[var(--rose)] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-opacity-90 shadow-lg transition-all"
                >
                  Start gifting
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
