'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error.message);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--cream)] px-4 text-center">
      <h2 className="font-heading text-4xl text-[var(--charcoal)] mb-4">Oops! Something went wrong!</h2>
      <p className="text-[var(--stone)] mb-8 max-w-md">
        We encountered an unexpected error. Please try again or head back home.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-[var(--rose)] text-white px-6 py-3 rounded-full hover:bg-[var(--rose)]/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-white text-[var(--charcoal)] px-6 py-3 rounded-full border border-[var(--blush)] hover:bg-[var(--blush)]/20 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
