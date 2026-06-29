'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NoteCard } from '@/components/bouquet/NoteCard';
import { CanvasFlower } from '@/components/bouquet/Canvas';
import { FlowerSVG } from '@/components/bouquet/FlowerSVG';

interface BouquetViewerProps {
  bouquet: {
    slug: string;
    flowers: CanvasFlower[];
    note: string | null;
    fromName: string | null;
    font: string;
    textColor: string;
    bgColor: string;
  };
}

export function BouquetViewer({ bouquet }: BouquetViewerProps) {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Hide overlay after a short delay
    const t = setTimeout(() => setShowOverlay(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Determine gradient background based on bouquet bgColor
  // If cream, use cream-to-blush. Otherwise use the exact color or a generic gradient.
  const isCream = bouquet.bgColor === '#FFFDD0' || bouquet.bgColor.toLowerCase() === 'var(--cream)';
  const bgStyle = isCream 
    ? { backgroundImage: 'linear-gradient(to bottom right, var(--cream), var(--blush))' }
    : { backgroundColor: bouquet.bgColor };

  const noteDelay = (bouquet.flowers.length * 0.08) + 0.5; // Starts after flowers finish

  return (
    <div 
      className="min-h-screen w-full relative overflow-x-hidden flex flex-col pt-12 pb-24"
      style={bgStyle}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[var(--charcoal)]/10"
          />
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 flex flex-col relative z-10">
        
        {/* Canvas Area */}
        <div className="relative w-full max-w-lg mx-auto h-[60vh] sm:h-[70vh] flex-shrink-0 mt-8 mb-8">
          {bouquet.flowers.map((flower, index) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, scale: 0.3, y: 50 }}
              animate={{ opacity: 1, scale: flower.scale, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: index * 0.08
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${flower.x}%`,
                top: `${flower.y}%`,
                zIndex: flower.zIndex,
                rotate: flower.rotation
              }}
            >
              <FlowerSVG type={flower.type} width={100} height={100} />
            </motion.div>
          ))}
        </div>

        {/* Note Card Area */}
        <div className="w-full relative z-20 -mt-20 sm:-mt-32">
          <NoteCard 
            note={bouquet.note || ''}
            fromName={bouquet.fromName}
            font={bouquet.font}
            textColor={bouquet.textColor}
            delay={noteDelay}
          />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: noteDelay + 1, duration: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-[var(--stone)] font-medium mb-4">Want to send one back?</p>
            <Link 
              href={`/create?replyTo=${bouquet.slug}`}
              className="inline-block bg-[var(--rose)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-[var(--rose)]/30 hover:shadow-xl hover:shadow-[var(--rose)]/40 hover:scale-105 transition-all duration-300"
            >
              Create a Bouquet
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="absolute bottom-6 left-0 right-0 text-center z-10">
        <Link href="/" className="text-xs font-medium text-[var(--stone)]/60 hover:text-[var(--rose)] transition-colors">
          Made with BloomNote
        </Link>
      </footer>
    </div>
  );
}
