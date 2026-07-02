'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, Copy, Volume2, VolumeX } from 'lucide-react';
import { NoteCard } from '@/components/bouquet/NoteCard';
import { RevealEnvelope } from '@/components/bouquet/RevealEnvelope';
import Image from 'next/image';
import { FlowerAsset } from '@prisma/client';

interface DBFlower {
  id: string;
  positionX: number;
  positionY: number;
  scale: number;
  rotation: number;
  zIndex: number;
  flowerAsset: FlowerAsset;
}

interface BouquetViewerProps {
  bouquet: {
    slug: string;
    flowers: DBFlower[];
    noteText: string | null;
    senderName: string | null;
    noteFont: string;
    textColor: string;
    bgColor: string;
    viewedAt: Date | null;
  };
  isPreview?: boolean;
}

export function BouquetViewer({ bouquet, isPreview = false }: BouquetViewerProps) {
  // If preview mode, NEVER skip the envelope so the creator can see the full experience.
  // Otherwise, skip if already viewed.
  const skipEnvelope = !isPreview && bouquet.viewedAt !== null;
  
  const [hasOpened, setHasOpened] = useState(skipEnvelope);
  const [isMuted, setIsMuted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const bouquetRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  // Patch view tracking on open
  useEffect(() => {
    if (hasOpened && !skipEnvelope && !isPreview) {
      fetch(`/api/bouquets/${bouquet.slug}/view`, { method: 'PATCH' }).catch(console.error);
    }
  }, [hasOpened, skipEnvelope, isPreview, bouquet.slug]);

  // Audio handling
  useEffect(() => {
    if (hasOpened && audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by browser despite interaction, fallback gracefully
        console.log("Audio autoplay blocked by browser");
      });
    } else if (audioRef.current && isMuted) {
      audioRef.current.pause();
    }
  }, [hasOpened, isMuted]);

  const handleOpen = () => {
    setHasOpened(true);
  };

  const isCream = bouquet.bgColor === '#FFFDD0' || bouquet.bgColor.toLowerCase() === 'var(--cream)';
  const bgStyle = isCream 
    ? { backgroundImage: 'linear-gradient(to bottom right, var(--cream), var(--blush))' }
    : { backgroundColor: bouquet.bgColor };

  // Calculate staggering. If skipped, delay is 0. If reduced motion, delay is short.
  const staggerDelay = skipEnvelope ? 0 : (shouldReduceMotion ? 0.05 : 0.08);
  const noteDelay = skipEnvelope ? 0 : (bouquet.flowers.length * staggerDelay) + 0.8;

  const downloadImage = async () => {
    if (!bouquetRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(bouquetRef.current, {
        scale: 2,
        backgroundColor: bouquet.bgColor,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `bouquet-from-${bouquet.senderName || 'dearbloomy'}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyAndEdit = () => {
    // Basic draft storage (optional delight layer feature)
    try {
      localStorage.setItem('draft_bouquet_reply', bouquet.slug);
    } catch(e) {}
    router.push('/create?replyTo=' + bouquet.slug);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col pt-12 pb-24" style={bgStyle}>
      {/* Hidden Audio Player */}
      <audio ref={audioRef} loop src="/audio/ambient-placeholder.mp3" preload="auto" />

      {/* Floating Audio Toggle */}
      {hasOpened && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed top-4 right-4 z-50 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow border border-black/5 text-[var(--charcoal)] transition-transform hover:scale-105"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}

      {/* Landing Envelope */}
      <AnimatePresence>
        {!hasOpened && (
          <RevealEnvelope senderName={bouquet.senderName} onOpen={handleOpen} />
        )}
      </AnimatePresence>

      {hasOpened && (
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 flex flex-col relative z-10">
          <div ref={bouquetRef} className="pb-8 -mt-8 pt-8">
            {/* Canvas Area */}
            <div className="relative w-full max-w-lg mx-auto h-[60vh] sm:h-[70vh] flex-shrink-0 mb-8">
              {bouquet.flowers.map((flower, index) => {
                const initialMotion = shouldReduceMotion 
                  ? { opacity: 0 } 
                  : { opacity: 0, scale: 0.3, y: 50 };
                  
                const animateMotion = shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: flower.scale, y: 0 };
                  
                const transition = skipEnvelope 
                  ? { duration: 0 }
                  : (shouldReduceMotion ? { duration: 1, delay: index * 0.05 } : { type: "spring", stiffness: 120, damping: 12, delay: index * staggerDelay });

                return (
                  <motion.div
                    key={flower.id}
                    initial={skipEnvelope ? animateMotion : initialMotion}
                    animate={animateMotion}
                    transition={transition}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${flower.positionX}%`,
                      top: `${flower.positionY}%`,
                      zIndex: flower.zIndex,
                      rotate: `${flower.rotation}deg`
                    }}
                  >
                    <div className="relative w-32 h-32 select-none pointer-events-none drop-shadow-md">
                      <Image 
                        src={flower.flowerAsset.imagePath} 
                        alt={flower.flowerAsset.name} 
                        fill 
                        className="object-contain"
                        draggable={false}
                        priority={index < 5}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Note Card Area */}
            <div className="w-full relative z-20 -mt-20 sm:-mt-32 px-2">
              <NoteCard 
                note={bouquet.noteText || ''}
                fromName={bouquet.senderName}
                font={bouquet.noteFont}
                textColor={bouquet.textColor}
                delay={noteDelay}
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: noteDelay + 0.5, duration: 1 }}
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
                Send one back
              </button>
            </div>

            <p className="text-[var(--stone)] font-medium mb-4">Want to create your own?</p>
            <Link 
              href="/create"
              className="inline-block bg-[var(--rose)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-[var(--rose)]/30 hover:shadow-xl hover:shadow-[var(--rose)]/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Creating
            </Link>
          </motion.div>
        </main>
      )}

      {hasOpened && (
        <footer className="absolute bottom-6 left-0 right-0 text-center z-10">
          <Link href="/" className="text-xs font-medium text-[var(--stone)]/80 hover:text-[var(--rose)] transition-colors">
            Made with BloomNote 🌸
          </Link>
        </footer>
      )}
    </div>
  );
}

