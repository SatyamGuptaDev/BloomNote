'use client';

import { useState } from 'react';
import { BlurFade } from '@/components/magic/BlurFade';
import { Loader2, Sparkles, RefreshCw, Scissors, Heart } from 'lucide-react';
import { TONE_OPTIONS } from '@/lib/card-constants';

interface CardWriteControlsProps {
  note: string;
  setNote: (note: string) => void;
  font: string;
  setFont: (font: string) => void;
  formatId: string | null;
  occasion: string;
}

const FONTS = [
  { id: 'font-serif', name: 'Classic Serif', class: 'font-serif' },
  { id: 'font-dancing', name: 'Dancing Script', class: 'font-dancing' },
  { id: 'font-sans', name: 'Modern Sans', class: 'font-sans' },
];

export function CardWriteControls({
  note,
  setNote,
  font,
  setFont,
  formatId,
  occasion
}: CardWriteControlsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState(TONE_OPTIONS[0].id);
  const [aiError, setAiError] = useState<string | null>(null);

  // Scroll letter allows more characters
  const MAX_CHARS = formatId === 'scroll-letter' ? 600 : 250;
  const charsLeft = MAX_CHARS - note.length;

  const handleAI = async (action: 'generate' | 'shorten' | 'warmer') => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const res = await fetch('/api/ai-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion: occasion || 'general',
          tone,
          existingNote: note,
          action
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate note');
      }
      
      const data = await res.json();
      if (data.note) {
        setNote(data.note.slice(0, MAX_CHARS));
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Failed to connect to AI assistant. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-full bg-background border-l border-border p-6 flex flex-col hide-scrollbar overflow-y-auto pb-24">
      <h3 className="font-heading text-xl text-[var(--charcoal)] mb-2">Write</h3>
      <p className="text-sm text-muted-foreground mb-6">Compose your heartfelt message.</p>

      <BlurFade delay={0.1} yOffset={10}>
        <div className="space-y-6">
          {/* AI Assist Box */}
          <div className="p-4 rounded-xl bg-white border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[var(--rose)]" />
              <h4 className="font-semibold text-sm text-[var(--charcoal)]">AI Assistant</h4>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {TONE_OPTIONS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    tone === t.id
                      ? 'bg-[var(--rose)] text-white shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {t.emoji} {t.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAI('generate')}
                disabled={isGenerating}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-[var(--rose)]/10 text-[var(--rose-deep)] hover:bg-[var(--rose)]/20 transition-colors disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                <span className="text-[10px] font-bold uppercase tracking-wider text-center">Write For Me</span>
              </button>
              <button
                onClick={() => handleAI('shorten')}
                disabled={isGenerating || !note}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-[var(--rose)]/10 text-[var(--rose-deep)] hover:bg-[var(--rose)]/20 transition-colors disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Scissors size={16} />}
                <span className="text-[10px] font-bold uppercase tracking-wider">Shorten</span>
              </button>
              <button
                onClick={() => handleAI('warmer')}
                disabled={isGenerating || !note}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-[var(--rose)]/10 text-[var(--rose-deep)] hover:bg-[var(--rose)]/20 transition-colors disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Heart size={16} />}
                <span className="text-[10px] font-bold uppercase tracking-wider">Make Warmer</span>
              </button>
            </div>
            {aiError && <p className="text-xs text-red-500 mt-2">{aiError}</p>}
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Type your message here..."
              className="w-full h-48 p-4 rounded-xl border border-border bg-white shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--rose)] transition-shadow text-[var(--charcoal)]"
            />
            <div className={`absolute bottom-3 right-3 text-xs font-medium ${charsLeft < 20 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {charsLeft} chars left
            </div>
          </div>

          {/* Typography */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--stone)] mb-3">Typography</h4>
            <div className="grid grid-cols-3 gap-2">
              {FONTS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFont(f.id)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    font === f.id
                      ? 'border-[var(--rose)] bg-[var(--rose)]/5 shadow-sm'
                      : 'border-border bg-white hover:border-border/80'
                  }`}
                >
                  <span className={`block text-lg text-[var(--charcoal)] ${f.class}`}>Ag</span>
                  <span className="block text-[10px] text-muted-foreground mt-1">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
