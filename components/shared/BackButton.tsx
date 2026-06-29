'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export function BackButton({ label = 'Back' }: { label?: string }) {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()}
      className="flex items-center gap-1 text-[var(--stone)] hover:text-[var(--rose)] transition-colors py-2 font-medium mb-4"
    >
      <ChevronLeft className="w-5 h-5 -ml-1" /> {label}
    </button>
  );
}
