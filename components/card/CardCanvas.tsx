'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AnimatedGradientText } from '@/components/magic/AnimatedGradientText';
import { CardStage } from '@/types/card-studio';

interface CardCanvasProps {
  format?: string | null;
  themeId?: string | null;
  stage: CardStage;
  palette?: { bg: string; text: string; accent: string } | null;
  paperTexture?: string;
  readOnly?: boolean;
}

export function CardCanvas({ format, themeId, stage, palette, paperTexture, readOnly }: CardCanvasProps) {
  // Empty State
  if (!format || !themeId || !palette) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--cream)]/30 rounded-3xl border-2 border-dashed border-border/60 p-6 relative overflow-hidden transition-all">
        <div className="flex flex-col items-center justify-center text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 text-[var(--stone)] shadow-sm border border-border/50">
            <Sparkles className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h3 className="font-heading text-2xl text-[var(--charcoal)] mb-2">
            Design Your Card
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Choose a format and theme from the sidebars to bring your canvas to life.
          </p>
        </div>
      </div>
    );
  }

  // Base shape based on format
  const isPostcard = format === 'postcard';
  const aspectRatio = isPostcard ? 'aspect-[4/3]' : 'aspect-[3/4]';
  const borderRadius = format === 'scroll-letter' ? 'rounded-md' : 'rounded-[1.5rem]';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <motion.div 
        layout
        className={`relative w-full max-w-[360px] 2xl:max-w-[420px] ${aspectRatio} ${borderRadius} shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden ring-1 ring-black/10 transition-all duration-500 mx-auto`}
        style={{ backgroundColor: palette.bg }}
      >
        {/* Paper Texture Overlay */}
        {paperTexture && (
          <div className={`absolute inset-0 pointer-events-none ${paperTexture}`} />
        )}
        
        {/* Placeholder for Theme Art */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-center leading-none -rotate-12 px-4" style={{ color: palette.accent }}>
            {themeId.replace(/-/g, ' ').toUpperCase()}
          </h1>
        </div>

        {/* Content Area */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center border-[1.5px] border-dashed border-black/10 rounded-xl p-4 transition-all">
          <p className="font-medium text-center text-sm uppercase tracking-widest opacity-60" style={{ color: palette.text }}>
            Design Canvas
          </p>
        </div>
      </motion.div>
    </div>
  );
}
