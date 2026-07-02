'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, Copy, Volume2, VolumeX } from 'lucide-react';
import { CardCanvas } from '@/components/card/CardCanvas';
import { PlacedElement } from '@/types/card-studio';

interface CardOpenStateProps {
  card: any;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export function CardOpenState({ card, isMuted, setIsMuted }: CardOpenStateProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const downloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `card-from-${card.senderName || 'dearbloomy'}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyAndEdit = () => {
    router.push('/create/card?replyTo=' + card.slug);
  };

  const elements: PlacedElement[] = card.elements.map((el: any) => ({
    id: el.id,
    type: el.type,
    payload: el.payload,
    x: el.positionX,
    y: el.positionY,
    scale: el.scale,
    rotation: el.rotation,
    zIndex: el.zIndex,
    textOptions: el.textOptions ? JSON.parse(el.textOptions) : undefined
  }));

  const palette = {
    bg: '#fff',
    text: card.textColor,
    accent: '#ccc'
  };
  // In a real implementation we would fetch the theme palette, 
  // but for readOnly the background color might be stored or we just assume white/theme default
  // Wait, does Card store the background color? No, it stores themeId and paperTexture.
  // We can just rely on paperTexture and default CSS if theme is not loaded, 
  // or fetch theme defaults from CARD_THEMES.

  return (
    <main className="flex-1 w-full h-full mx-auto flex flex-col relative z-10 pt-12 pb-24 overflow-y-auto">
      {/* Floating Audio Toggle */}
      {card.musicId && card.musicId !== 'no-music' && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed top-4 right-4 z-50 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow border border-black/5 text-[var(--charcoal)] transition-transform hover:scale-105"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}

      <div ref={cardRef} className="flex-shrink-0 flex items-center justify-center mb-8 h-[70vh]">
        <CardCanvas 
          format={card.format}
          themeId={card.themeId}
          stage="preview"
          palette={palette}
          paperTexture={card.paperTexture}
          readOnly={true}
          elements={elements}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (elements.length * 0.08) + 0.5, duration: 1 }}
        className="mt-8 text-center px-4 shrink-0"
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
          href="/create/card"
          className="inline-block bg-[var(--charcoal)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-black transition-all duration-300"
        >
          Start Creating
        </Link>
      </motion.div>
    </main>
  );
}
