'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { AnimatedGradientText } from '@/components/magic/AnimatedGradientText';

interface RevealEnvelopeProps {
  senderName: string | null;
  onOpen: () => void;
}

export function RevealEnvelope({ senderName, onOpen }: RevealEnvelopeProps) {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, scale: number, delay: number, duration: number}[]>([]);

  useEffect(() => {
    // Generate some random floating particles on client-side only
    setParticles(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
    })));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: 'blur(12px)', scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--cream)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,246,240,1)_0%,rgba(247,231,228,0.7)_100%)]" />
      
      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--rose)]/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--blush)]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      
      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full bg-[var(--rose)]/20 pointer-events-none blur-[1px]"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: ['0%', '-500%'],
            opacity: [0, 0.8, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, type: 'spring', damping: 20 }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-md"
      >
        <div className="relative mb-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 bg-gradient-to-tr from-[var(--rose)] to-[var(--blush)] rounded-full blur-xl opacity-30"
          />
          <div className="relative w-28 h-28 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl shadow-[var(--rose)]/20 flex items-center justify-center border border-white/50 group hover:scale-105 transition-transform duration-500">
            <Heart className="w-12 h-12 text-[var(--rose)] fill-[var(--rose)]/10 group-hover:fill-[var(--rose)]/30 transition-all duration-500" strokeWidth={1.5} />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        <h2 className="font-heading text-4xl md:text-5xl text-[var(--charcoal)] mb-6 leading-tight">
          <AnimatedGradientText>
            {senderName ? `A gift from ${senderName}` : 'Someone made this for you'}
          </AnimatedGradientText>
        </h2>
        
        <p className="text-[var(--stone)] text-lg mb-14 max-w-xs leading-relaxed font-light">
          A special digital arrangement crafted with care.
        </p>

        <button
          onClick={onOpen}
          className="group relative px-10 py-5 bg-gradient-to-r from-[var(--charcoal)] to-black text-white rounded-full font-medium shadow-2xl hover:shadow-[var(--rose)]/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--rose)] to-[var(--rose-deep)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-3 text-lg tracking-wide">
            Tap to Open 
            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="inline-block"
            >
              🌸
            </motion.span>
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
