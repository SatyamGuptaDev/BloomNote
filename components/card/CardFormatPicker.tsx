'use client';

import { CARD_FORMATS } from '@/lib/card-constants';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardFormatPickerProps {
  selectedFormatId: string | null;
  onSelect: (id: string) => void;
}

export function CardFormatPicker({ selectedFormatId, onSelect }: CardFormatPickerProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-y-auto hide-scrollbar">
      <div className="p-5 md:p-6 pb-2 border-b border-border/50 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="font-heading text-xl text-[var(--charcoal)]">Select Format</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose the physical style of your card.</p>
      </div>

      <div className="p-4 md:p-5 grid gap-3">
        {CARD_FORMATS.map((format) => {
          const isSelected = selectedFormatId === format.id;
          
          return (
            <motion.button
              key={format.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(format.id)}
              className={`relative w-full text-left p-3.5 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                isSelected 
                  ? 'border-[var(--rose)] bg-[var(--rose)]/5 shadow-md' 
                  : 'border-transparent bg-[var(--cream)]/30 hover:bg-[var(--cream)]/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-semibold text-sm ${isSelected ? 'text-[var(--rose)]' : 'text-[var(--charcoal)]'}`}>
                    {format.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed max-w-[200px]">
                    {format.description}
                  </p>
                </div>
                
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-6 h-6 rounded-full bg-[var(--rose)] flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
