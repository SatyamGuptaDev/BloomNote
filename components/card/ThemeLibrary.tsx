'use client';

import { CARD_THEMES } from '@/lib/card-constants';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ThemeLibraryProps {
  selectedThemeId: string | null;
  onSelect: (id: string, theme: any) => void;
}

export function ThemeLibrary({ selectedThemeId, onSelect }: ThemeLibraryProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-y-auto hide-scrollbar">
      <div className="p-5 md:p-6 pb-2 border-b border-border/50 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="font-heading text-xl text-[var(--charcoal)]">Cover Theme</h2>
        <p className="text-sm text-muted-foreground mt-1">Pick an artistic style for your card.</p>
      </div>

      <div className="p-5 md:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {CARD_THEMES.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            
            return (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(theme.id, theme)}
                className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm transition-all duration-300 ring-2 ring-offset-2 flex flex-col items-center justify-center p-3 group ${
                  isSelected ? 'ring-[var(--rose)] shadow-md' : 'ring-transparent hover:ring-black/10'
                }`}
                style={{ backgroundColor: theme.defaultPalette.bg }}
              >
                {/* Category Badge */}
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase bg-white/50 backdrop-blur-md" style={{ color: theme.defaultPalette.text }}>
                  {theme.category}
                </div>

                {/* Abstract Artwork Representation */}
                <div 
                  className="w-10 h-10 rounded-full mb-3 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme.defaultPalette.accent }}
                />
                <span 
                  className="text-xs font-semibold text-center leading-tight"
                  style={{ color: theme.defaultPalette.text }}
                >
                  {theme.name}
                </span>

                {/* Selected Check */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--rose)] flex items-center justify-center shadow-md">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
