'use client';

import { Check } from 'lucide-react';
import { STUDIO_STAGES, StudioStage } from '@/types/studio';
import { motion } from 'framer-motion';

interface TopProgressProps {
  currentStage: StudioStage;
  highestStage: StudioStage;
  onNavigate: (stage: StudioStage) => void;
}

export function TopProgress({ currentStage, highestStage, onNavigate }: TopProgressProps) {
  const currentIndex = STUDIO_STAGES.findIndex(s => s.id === currentStage);
  const highestIndex = Math.max(currentIndex, STUDIO_STAGES.findIndex(s => s.id === highestStage));

  return (
    <div className="w-full flex justify-center py-4 px-4 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="flex items-center space-x-2 sm:space-x-4 max-w-2xl w-full justify-between relative">
        {/* Progress line background */}
        <div className="absolute left-0 top-4 w-full h-[2px] bg-muted -z-10" />
        {/* Progress line active */}
        <div 
          className="absolute left-0 top-4 h-[2px] bg-[var(--rose)] -z-10 transition-all duration-500 ease-in-out" 
          style={{ width: `${(currentIndex / (STUDIO_STAGES.length - 1)) * 100}%` }}
        />

        {STUDIO_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isLocked = idx > highestIndex;

          return (
            <button
              key={stage.id}
              disabled={isLocked}
              onClick={() => !isLocked && onNavigate(stage.id)}
              className={`flex flex-col items-center group focus:outline-none ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <motion.div 
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? 'var(--rose)' : 'hsl(var(--muted))',
                  borderColor: isCompleted || isCurrent ? 'var(--rose)' : 'hsl(var(--border))'
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-sm transition-colors mb-1.5"
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-white' : 'text-muted-foreground group-hover:text-foreground transition-colors'}`}>
                    {idx + 1}
                  </span>
                )}
              </motion.div>
              <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-colors ${isCurrent ? 'text-[var(--charcoal)] font-bold' : isLocked ? 'text-muted-foreground/50' : 'text-muted-foreground group-hover:text-[var(--charcoal)]'}`}>
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
