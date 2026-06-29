'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center bg-[var(--blush)]">
      <div className="text-center space-y-6">
        <h2 className="text-3xl text-[var(--charcoal)]">Something went wrong</h2>
        <p className="text-[var(--stone)] max-w-md mx-auto">
          We are sorry, but an unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-[var(--rose)] text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
