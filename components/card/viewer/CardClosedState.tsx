'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CardClosedStateProps {
  format: string;
  themeId?: string | null;
  onOpen: () => void;
  senderName?: string | null;
}

export function CardClosedState({ format, themeId, onOpen, senderName }: CardClosedStateProps) {
  // Render a different visual based on the format
  const getFormatVisual = () => {
    switch (format) {
      case 'wax-seal':
        return (
          <div className="w-72 h-48 bg-amber-50 rounded-lg shadow-xl relative border border-amber-100 flex items-center justify-center">
            {/* Flap lines */}
            <div className="absolute top-0 left-0 right-0 h-24 border-b border-amber-200/50 transform -skew-y-[20deg] origin-top-left" />
            <div className="absolute top-0 left-0 right-0 h-24 border-b border-amber-200/50 transform skew-y-[20deg] origin-top-right" />
            {/* Wax Seal */}
            <div className="w-12 h-12 bg-red-800 rounded-full shadow-md z-10 flex items-center justify-center border border-red-900/50 cursor-pointer hover:scale-105 transition-transform">
               <div className="w-10 h-10 border border-red-950/30 rounded-full flex items-center justify-center">
                 <span className="font-serif text-red-300 text-xs italic">{senderName ? senderName[0].toUpperCase() : 'B'}</span>
               </div>
            </div>
          </div>
        );
      case 'scroll-letter':
        return (
          <div className="w-64 h-24 bg-[#fdf8f0] rounded-full shadow-lg relative border-y-2 border-r-8 border-r-[#e8dfd3] border-l-8 border-l-[#e8dfd3] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
             {/* Ribbon tied around */}
             <div className="absolute left-1/2 -translate-x-1/2 w-4 h-28 bg-red-600/80 -top-2" />
             <div className="w-16 h-8 border-2 border-red-600/80 rounded-full absolute -top-4 -ml-4 rotate-12" />
             <div className="w-16 h-8 border-2 border-red-600/80 rounded-full absolute -top-4 ml-4 -rotate-12" />
          </div>
        );
      case 'pop-up':
      case 'classic-fold':
      default:
        return (
          <div className="w-64 aspect-[3/4] bg-white rounded-r-3xl shadow-2xl relative border-l-8 border-l-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:-rotate-2 transition-transform">
            <div className="absolute inset-0 bg-[var(--rose)]/10" />
            <p className="font-heading text-xl text-[var(--charcoal)] mb-4 text-center px-4 relative z-10">
              A Card For You
            </p>
            {senderName && (
              <p className="text-sm text-muted-foreground relative z-10 italic">from {senderName}</p>
            )}
            <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        );
    }
  };

  const [particles, setParticles] = useState<{x: number, delay: number, left: number, w: number, h: number, bg: string}[]>([]);

  useEffect(() => {
    setParticles([...Array(15)].map((_, i) => ({
      x: Math.random() * 100 - 50,
      delay: Math.random() * 5,
      left: Math.random() * 100,
      w: Math.random() * 6 + 2,
      h: Math.random() * 6 + 2,
      bg: i % 3 === 0 ? "var(--rose)" : i % 3 === 1 ? "var(--blush)" : "var(--sage)"
    })));
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-[var(--background)] flex flex-col items-center justify-center p-4">
      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {particles.map((p, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ y: "100vh", opacity: 0, x: p.x }}
            animate={{ 
              y: "-100vh", 
              opacity: [0, 0.5, 0],
              x: p.x
            }}
            transition={{
              duration: 10 + p.delay,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              width: `${p.w}px`,
              height: `${p.h}px`,
              backgroundColor: p.bg
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.8, type: 'spring' }}
        onClick={onOpen}
        className="relative z-10 flex flex-col items-center group"
      >
        {getFormatVisual()}
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-sm uppercase tracking-widest text-muted-foreground font-semibold"
        >
          Tap to Open
        </motion.p>
      </motion.div>
    </div>
  );
}
