'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { WordReveal } from '@/components/magic/WordReveal';

interface NoteCardProps {
  note: string;
  fromName?: string | null;
  font: string;
  textColor: string;
  className?: string;
  delay?: number;
}

export function NoteCard({ note, fromName, font, textColor, className, delay = 0 }: NoteCardProps) {
  // Mapping standard font identifiers to their CSS variable classes
  const getFontClass = (fontId: string) => {
    switch (fontId) {
      case 'serif': return 'font-heading';
      case 'script': return 'font-script text-2xl leading-relaxed';
      case 'sans': return 'font-body';
      case 'elegant': return 'font-heading italic';
      default: return 'font-heading';
    }
  };

  const hasContent = note.trim().length > 0 || (fromName && fromName.trim().length > 0);
  const displayNote = hasContent ? note : "A beautiful bouquet for you 🌸";

  return (
    <motion.div 
      initial={delay > 0 ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={cn(
        "bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto relative",
        className
      )}
      style={{ color: textColor }}
    >
      <div className="flex justify-center mb-6 opacity-50">
        <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 20C40 20 30 35 30 50C30 65 40 80 50 80C60 80 70 65 70 50C70 35 60 20 50 20Z" />
        </svg>
      </div>
      
      <div className={cn("text-center whitespace-pre-wrap break-words flex flex-col gap-1 items-center max-w-full", getFontClass(font))}>
        <WordReveal text={displayNote} delay={delay} />
      </div>

      {fromName && fromName.trim().length > 0 && (
        <p className="text-center text-[var(--stone)] text-sm mt-6 font-body uppercase tracking-wider">
          — {fromName}
        </p>
      )}
    </motion.div>
  );
}
