'use client';

import { useState, useEffect } from 'react';
import { Card, CardElement } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';

import { CardClosedState } from '@/components/card/viewer/CardClosedState';
import { CardOpenState } from '@/components/card/viewer/CardOpenState';
import { useRef } from 'react';

interface CardWithElements extends Card {
  elements: CardElement[];
}

interface CardViewerProps {
  card: CardWithElements;
  isPreview: boolean;
}

export function CardViewer({ card, isPreview }: CardViewerProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isOpen && audioRef.current && !isMuted && card.musicId && card.musicId !== 'no-music') {
      audioRef.current.play().catch(() => {
        console.log("Audio autoplay blocked by browser");
      });
    } else if (audioRef.current && isMuted) {
      audioRef.current.pause();
    }
  }, [isOpen, isMuted, card.musicId]);

  useEffect(() => {
    if (card.scheduledFor) {
      const scheduledTime = new Date(card.scheduledFor).getTime();
      if (scheduledTime > Date.now()) {
        setIsLocked(true);
      }
    }
  }, [card.scheduledFor]);

  useEffect(() => {
    if (!isLocked || !card.scheduledFor) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      const scheduledTime = new Date(card.scheduledFor!).getTime();
      if (currentTime >= scheduledTime) {
        setIsLocked(false);
        clearInterval(interval);
      }
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const currentTime = Date.now();
        setNow(currentTime);
        const scheduledTime = new Date(card.scheduledFor!).getTime();
        if (currentTime >= scheduledTime) {
          setIsLocked(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLocked, card.scheduledFor]);

  // Mark as viewed logic
  useEffect(() => {
    if (!isLocked && !isOpen) {
      fetch(`/api/cards/${card.slug}/view`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPreview })
      }).then(res => res.json()).then(data => {
        if (!data.isFirstView && !isPreview) {
          setIsOpen(true);
        }
      }).catch(console.error);
    }
  }, [isLocked, isOpen, card.slug, isPreview]);


  if (isLocked && card.scheduledFor) {
    const scheduledTime = new Date(card.scheduledFor).getTime();
    const diffSeconds = Math.floor((scheduledTime - now) / 1000);
    const days = Math.floor(diffSeconds / (3600 * 24));
    const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto text-center border border-black/5">
          <div className="w-16 h-16 mx-auto bg-[var(--rose)]/10 text-[var(--rose)] rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M12 14v4"/><path d="M10 16h4"/></svg>
          </div>
          <h2 className="font-heading text-2xl text-[var(--charcoal)] mb-4">Time Capsule Locked</h2>
          <p className="text-[var(--stone)] text-sm mb-8">This card is scheduled to be opened at {new Date(card.scheduledFor).toLocaleString()}. Please return when the time comes!</p>
          
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[var(--background)] p-3 rounded-lg"><p className="font-bold text-xl text-[var(--charcoal)]">{days}</p><p className="text-[10px] uppercase text-muted-foreground">Days</p></div>
            <div className="bg-[var(--background)] p-3 rounded-lg"><p className="font-bold text-xl text-[var(--charcoal)]">{hours}</p><p className="text-[10px] uppercase text-muted-foreground">Hrs</p></div>
            <div className="bg-[var(--background)] p-3 rounded-lg"><p className="font-bold text-xl text-[var(--charcoal)]">{minutes}</p><p className="text-[10px] uppercase text-muted-foreground">Min</p></div>
            <div className="bg-[var(--background)] p-3 rounded-lg"><p className="font-bold text-xl text-[var(--charcoal)]">{seconds}</p><p className="text-[10px] uppercase text-muted-foreground">Sec</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-x-hidden">
      {card.musicId && card.musicId !== 'no-music' && (
        <audio ref={audioRef} loop src="/audio/ambient-placeholder.mp3" preload="auto" />
      )}
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div key="closed" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-50">
             <CardClosedState 
               format={card.format}
               themeId={card.themeId}
               onOpen={() => setIsOpen(true)}
               senderName={card.senderName}
             />
          </motion.div>
        ) : (
          <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0">
             <CardOpenState 
               card={card}
               isMuted={isMuted}
               setIsMuted={setIsMuted}
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
