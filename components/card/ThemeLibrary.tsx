'use client';

import { CARD_THEMES } from '@/lib/card-constants';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ThemeLibraryProps {
  selectedThemeId: string | null;
  onSelect: (id: string, theme: any) => void;
}

export function ThemeLibrary({ selectedThemeId, onSelect }: ThemeLibraryProps) {
  // Group themes by category
  const categories = CARD_THEMES.reduce((acc, theme) => {
    if (!acc[theme.category]) acc[theme.category] = [];
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, typeof CARD_THEMES>);

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-y-auto hide-scrollbar">
      <div className="p-5 md:p-6 pb-2 border-b border-border/50 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="font-heading text-xl text-[var(--charcoal)]">Cover Theme</h2>
        <p className="text-sm text-muted-foreground mt-1">Pick an artistic style for your card.</p>
      </div>

      <div className="p-5 md:p-6 space-y-8">
        {Object.entries(categories).map(([category, themes]) => (
          <div key={category}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--stone)] mb-3">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => {
                const isSelected = selectedThemeId === theme.id;
                
                return (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(theme.id, theme)}
                    className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm transition-all duration-300 ring-2 ring-offset-2 ${
                      isSelected ? 'ring-[var(--rose)]' : 'ring-transparent hover:ring-black/10'
                    }`}
                    style={{ backgroundColor: theme.defaultPalette.bg }}
                  >
                    {/* Placeholder for Theme Artwork */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                      <div 
                        className="w-8 h-8 rounded-full mb-2 opacity-50"
                        style={{ backgroundColor: theme.defaultPalette.accent }}
                      />
                      <span 
                        className="text-[10px] font-bold text-center leading-tight"
                        style={{ color: theme.defaultPalette.text }}
                      >
                        {theme.name}
                      </span>
                    </div>

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
        ))}
      </div>
    </div>
  );
}
