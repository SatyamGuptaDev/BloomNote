'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, Copy } from 'lucide-react';
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
  const [isDownloading, setIsDownloading] = useState(false);
  const bouquetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Hide overlay after a short delay
    const t = setTimeout(() => setShowOverlay(false), 500);
    
    // Store in recent bouquets
    try {
      const recentStr = localStorage.getItem('recent_bouquets');
      let recent = recentStr ? JSON.parse(recentStr) : [];
      // Remove if exists
      recent = recent.filter((b: any) => b.slug !== bouquet.slug);
      // Add to front
      recent.unshift({
        slug: bouquet.slug,
        fromName: bouquet.fromName,
        note: bouquet.note,
        date: new Date().toISOString()
      });
      // Keep only last 10
      if (recent.length > 10) recent.pop();
      localStorage.setItem('recent_bouquets', JSON.stringify(recent));
    } catch (error) {
      console.error('Error saving recent bouquet', error);
    }
    
    return () => clearTimeout(t);
  }, [bouquet]);

  // Determine gradient background based on bouquet bgColor
  // If cream, use cream-to-blush. Otherwise use the exact color or a generic gradient.
  const isCream = bouquet.bgColor === '#FFFDD0' || bouquet.bgColor.toLowerCase() === 'var(--cream)';
  const bgStyle = isCream 
    ? { backgroundImage: 'linear-gradient(to bottom right, var(--cream), var(--blush))' }
    : { backgroundColor: bouquet.bgColor };

  const noteDelay = (bouquet.flowers.length * 0.08) + 0.5; // Starts after flowers finish

  const downloadImage = async () => {
    if (!bouquetRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(bouquetRef.current, {
        scale: 2,
        backgroundColor: isCream ? '#FFFDD0' : bouquet.bgColor,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `bouquet-from-${bouquet.fromName || 'dearbloomy'}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyAndEdit = () => {
    try {
      localStorage.setItem('draft_bouquet', JSON.stringify({
        flowers: bouquet.flowers,
        note: bouquet.note,
        fromName: bouquet.fromName,
        font: bouquet.font,
        textColor: bouquet.textColor,
        bgColor: bouquet.bgColor
      }));
      router.push('/create?from=draft');
    } catch (error) {
      console.error('Error storing draft:', error);
      router.push('/create');
    }
  };

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
        
        <div ref={bouquetRef} className="pb-8 -mt-8 pt-8">
          {/* Canvas Area */}
          <div className="relative w-full max-w-lg mx-auto h-[60vh] sm:h-[70vh] flex-shrink-0 mb-8">
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
          <div className="w-full relative z-20 -mt-20 sm:-mt-32 px-2">
            <NoteCard 
              note={bouquet.note || ''}
              fromName={bouquet.fromName}
              font={bouquet.font}
              textColor={bouquet.textColor}
              delay={noteDelay}
            />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: noteDelay + 1, duration: 1 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button 
              onClick={downloadImage}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 bg-white text-[var(--charcoal)] px-6 py-3 rounded-full text-md font-medium shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Saving...' : 'Save as Image'}
            </button>
            <button 
              onClick={handleCopyAndEdit}
              className="flex items-center justify-center gap-2 bg-white text-[var(--charcoal)] px-6 py-3 rounded-full text-md font-medium shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
            >
              <Copy className="w-4 h-4" />
              Copy & Edit
            </button>
          </div>

          <p className="text-[var(--stone)] font-medium mb-4">Want to send one back?</p>
          <Link 
            href={`/create?replyTo=${bouquet.slug}`}
            className="inline-block bg-[var(--rose)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-[var(--rose)]/30 hover:shadow-xl hover:shadow-[var(--rose)]/40 hover:scale-105 transition-all duration-300"
          >
            Create a Bouquet
          </Link>
        </motion.div>
      </main>

      <footer className="absolute bottom-6 left-0 right-0 text-center z-10">
        <Link href="/" className="text-xs font-medium text-[var(--stone)]/60 hover:text-[var(--rose)] transition-colors">
          Made with Dear Bloomy
        </Link>
      </footer>
    </div>
  );
}

