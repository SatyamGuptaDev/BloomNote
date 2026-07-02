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
      <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--cream)]/20 rounded-2xl border-2 border-dashed border-border p-4 sm:p-12 relative overflow-y-auto hide-scrollbar">
        <div className="w-full max-w-md aspect-[3/4] bg-white rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-8 relative overflow-hidden ring-1 ring-black/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(247,231,228,0.3))] pointer-events-none" />
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-[var(--blush)] flex items-center justify-center mb-6 text-[var(--rose)] shadow-sm">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-2xl text-[var(--charcoal)] mb-3 text-center">
              <AnimatedGradientText>Design Your Card</AnimatedGradientText>
            </h3>
            <p className="text-muted-foreground text-center text-sm max-w-[250px] leading-relaxed">
              Choose a format and theme from the library to begin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Base shape based on format
  const isPostcard = format === 'postcard';
  const aspectRatio = isPostcard ? 'aspect-[4/3]' : 'aspect-[3/4]';
  const borderRadius = format === 'scroll-letter' ? 'rounded-md' : 'rounded-[1.5rem]';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--cream)]/20 rounded-2xl border-2 border-dashed border-border p-4 sm:p-12 relative overflow-y-auto hide-scrollbar">
      <motion.div 
        layout
        className={`w-full max-w-md ${aspectRatio} ${borderRadius} shadow-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden ring-1 ring-black/5 transition-all duration-500`}
        style={{ backgroundColor: palette.bg }}
      >
        {/* Paper Texture Overlay */}
        {paperTexture && (
          <div className={`absolute inset-0 pointer-events-none ${paperTexture}`} />
        )}
        
        {/* Placeholder for Theme Art */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <h1 className="font-heading text-6xl rotate-[-45deg]" style={{ color: palette.accent }}>
            {themeId.replace('-', ' ').toUpperCase()}
          </h1>
        </div>

        {/* Content Area */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-xl p-4">
          <p className="font-medium text-center" style={{ color: palette.text }}>
            Design Canvas Ready
          </p>
        </div>
      </motion.div>
    </div>
  );
}
