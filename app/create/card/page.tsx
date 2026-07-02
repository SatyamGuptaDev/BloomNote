'use client';

import { useState, useEffect } from 'react';
import { CardStage, CARD_STAGES } from '@/types/card-studio';
import { TopProgress } from '@/components/bouquet/TopProgress';
import { Header } from '@/components/layout/Header';
import { CardCanvas } from '@/components/card/CardCanvas';
import { CardFormatPicker } from '@/components/card/CardFormatPicker';
import { ThemeLibrary } from '@/components/card/ThemeLibrary';
import { Sparkles, ArrowRight, Save, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CardStudio() {
  const [currentStage, setCurrentStage] = useState<CardStage>('design');
  const [highestStage, setHighestStage] = useState<CardStage>('design');

  // Stage 1: Design State
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [palette, setPalette] = useState<{ bg: string; text: string; accent: string } | null>(null);
  const [paperTexture, setPaperTexture] = useState<string>('matte');
  const [font, setFont] = useState<string>('font-serif');

  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState<'format' | 'theme'>('format');

  // Handle Design Defaults
  const handleThemeSelect = (themeId: string, theme: any) => {
    setSelectedThemeId(themeId);
    setPalette(theme.defaultPalette);
    setPaperTexture(theme.defaultPaper);
    setFont(theme.defaultFont);
  };

  const isNextDisabled = () => {
    if (currentStage === 'design') {
      return !selectedFormat || !selectedThemeId;
    }
    return true; // Other stages not built yet
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--background)]">
      <Header />

      <main className="flex-1 flex flex-col min-h-0 relative">
        <TopProgress 
          stages={CARD_STAGES}
          currentStage={currentStage} 
          highestStage={highestStage}
          onNavigate={setCurrentStage} 
        />

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_360px] xl:grid-cols-[300px_1fr_400px] flex-1 min-h-0">
          
          {/* Left Panel - Format Picker */}
          <div className="border-r border-border bg-white overflow-hidden relative">
            <CardFormatPicker 
              selectedFormatId={selectedFormat}
              onSelect={setSelectedFormat}
            />
          </div>

          {/* Center Panel - Canvas */}
          <div className="bg-[var(--background)] relative p-4 xl:p-8 flex items-center justify-center min-h-0 overflow-hidden">
            <CardCanvas 
              format={selectedFormat}
              themeId={selectedThemeId}
              stage={currentStage}
              palette={palette}
              paperTexture={paperTexture}
            />
          </div>

          {/* Right Panel - Theme Library / Contextual Controls */}
          <div className="border-l border-border bg-white overflow-hidden relative">
            <ThemeLibrary 
              selectedThemeId={selectedThemeId}
              onSelect={handleThemeSelect}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden flex-col flex-1 min-h-0">
          <div className="h-[45vh] shrink-0 border-b border-border bg-[var(--background)] p-4 relative z-10 shadow-sm">
            <CardCanvas 
              format={selectedFormat}
              themeId={selectedThemeId}
              stage={currentStage}
              palette={palette}
              paperTexture={paperTexture}
            />
          </div>
          
          <div className="flex-1 flex flex-col min-h-0 bg-white">
            <div className="flex border-b border-border shrink-0 bg-white/95 backdrop-blur-sm z-20 shadow-sm relative">
              <button 
                onClick={() => setMobileTab('format')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${mobileTab === 'format' ? 'text-[var(--charcoal)]' : 'text-muted-foreground'}`}
              >
                1. Format
                {mobileTab === 'format' && (
                  <motion.div layoutId="mobile-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--rose)]" />
                )}
              </button>
              <div className="w-px bg-border/50 my-3" />
              <button 
                onClick={() => setMobileTab('theme')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${mobileTab === 'theme' ? 'text-[var(--charcoal)]' : 'text-muted-foreground'}`}
              >
                2. Theme
                {mobileTab === 'theme' && (
                  <motion.div layoutId="mobile-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--rose)]" />
                )}
              </button>
            </div>
            
            <div className="flex-1 relative overflow-hidden pb-24">
              <AnimatePresence mode="wait">
                {mobileTab === 'format' ? (
                  <motion.div key="format" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                    <CardFormatPicker selectedFormatId={selectedFormat} onSelect={(id) => { setSelectedFormat(id); setMobileTab('theme'); }} />
                  </motion.div>
                ) : (
                  <motion.div key="theme" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                    <ThemeLibrary selectedThemeId={selectedThemeId} onSelect={handleThemeSelect} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </main>

      {/* Floating Action Button */}
      <AnimatePresence>
        {currentStage === 'design' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex flex-col items-end gap-2"
          >
            <button
              disabled={isNextDisabled()}
              className="flex items-center gap-2 bg-[var(--charcoal)] text-white px-6 py-4 rounded-full font-bold shadow-xl shadow-[var(--charcoal)]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group"
            >
              {isNextDisabled() ? 'Pick Format & Theme' : 'Next Step'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="bg-black/80 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full mr-2 shadow-sm">
              Write Stage Coming Soon
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
