'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AnimatedGradientText } from '@/components/magic/AnimatedGradientText';
import { CardStage, PlacedElement } from '@/types/card-studio';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { DraggableElement } from './DraggableElement';

interface CardCanvasProps {
  format: string | null;
  themeId: string | null;
  stage: CardStage;
  palette: { bg: string; text: string; accent: string } | null;
  paperTexture?: string;
  readOnly?: boolean;
  elements?: PlacedElement[];
  selectedElementId?: string | null;
  onElementMove?: (id: string, x: number, y: number) => void;
  onElementSelect?: (id: string) => void;
  onElementDelete?: (id: string) => void;
  onElementUpdate?: (id: string, updates: Partial<PlacedElement>) => void;
  note?: string;
  font?: string;
  revealStyle?: string;
}

export function CardCanvas({ 
  format, 
  themeId, 
  stage, 
  palette, 
  paperTexture, 
  readOnly = false,
  elements = [],
  selectedElementId = null,
  onElementMove,
  onElementSelect,
  onElementDelete,
  onElementUpdate,
  note = '',
  font = 'font-serif',
  revealStyle
}: CardCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getRevealVariants = (style?: string) => {
    if (!style) return { initial: { opacity: 1, scale: 1, y: 0, rotateX: 0 }, animate: { opacity: 1, scale: 1, y: 0, rotateX: 0 } };
    switch (style) {
      case 'slide-up': return { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 } };
      case 'fade-up': return { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
      case 'unfold': return { initial: { opacity: 0, rotateX: 90 }, animate: { opacity: 1, rotateX: 0 } };
      case 'pop-up': return { initial: { opacity: 0, scale: 0.5, y: 50 }, animate: { opacity: 1, scale: 1, y: 0 } };
      case 'stamp': return { initial: { opacity: 0, scale: 1.5 }, animate: { opacity: 1, scale: 1 } };
      default: return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    }
  };
  const variants = getRevealVariants(revealStyle);

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
    <div className={cn("w-full h-full flex flex-col items-center justify-center p-4 sm:p-12 relative overflow-y-auto hide-scrollbar", !readOnly && "bg-[var(--cream)]/20 rounded-2xl border-2 border-dashed border-border")}>
      <motion.div 
        key={revealStyle || 'default'}
        layout
        ref={containerRef}
        initial={variants.initial}
        animate={variants.animate}
        transition={{ duration: 0.8, type: 'spring' }}
        className={cn(
          `w-full max-w-md ${aspectRatio} ${borderRadius} shadow-2xl relative overflow-hidden ring-1 ring-black/5 transition-all duration-500`,
          paperTexture
        )}
        style={{ backgroundColor: palette.bg }}
        onClick={() => {
          if (!readOnly && onElementSelect) onElementSelect('');
        }}
      >

        {/* Theme Placeholder (only if no note) */}
        {!note && (
          <div className="absolute inset-0 flex items-center justify-center p-8 z-0 opacity-40 pointer-events-none overflow-hidden">
            <div 
              className="absolute w-48 h-48 lg:w-56 lg:h-56 rounded-full"
              style={{ backgroundColor: palette.accent }}
            />
            <span 
              className="relative z-10 text-4xl lg:text-6xl font-black uppercase tracking-widest text-center leading-tight -rotate-45"
              style={{ color: palette.text }}
            >
              {themeId.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        )}

        {/* Placed Elements */}
        {elements.map((element, index) => (
          <DraggableElement
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            readOnly={readOnly || stage !== 'personalize'}
            containerRef={containerRef}
            onSelect={() => onElementSelect && onElementSelect(element.id)}
            onMove={(x, y) => onElementMove && onElementMove(element.id, x, y)}
            onUpdate={(updates) => onElementUpdate && onElementUpdate(element.id, updates)}
            onDelete={() => onElementDelete && onElementDelete(element.id)}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}
