'use client';

import { BlurFade } from '@/components/magic/BlurFade';
import { PAPER_TEXTURES, REVEAL_STYLES } from '@/lib/card-constants';
import { PlayCircle, StopCircle, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Copied from Bouquet context
const BG_SWATCHES = [
  { id: 'bg-white', color: '#ffffff', name: 'Clean White' },
  { id: 'bg-cream', color: '#fcfaf8', name: 'Soft Cream' },
  { id: 'bg-blush', color: '#fdf8f7', name: 'Pale Blush' },
  { id: 'bg-stone', color: '#f4f4f5', name: 'Cool Stone' },
  { id: 'bg-sage', color: '#f1f5f2', name: 'Mist Sage' },
];

const MUSIC_TRACKS = [
  { id: 'no-music', title: 'No music', desc: 'Silence', file: null },
  { id: 'gentle-guitar', title: 'Gentle Guitar', desc: 'Warm & acoustic', file: '/audio/gentle-guitar.mp3' },
  { id: 'sweet-piano', title: 'Sweet Piano', desc: 'Soft & emotional', file: '/audio/sweet-piano.mp3' },
  { id: 'lofi-vibe', title: 'Lofi Vibe', desc: 'Chill & relaxing', file: '/audio/lofi-vibe.mp3' },
  { id: 'cute-chiptune', title: 'Cute Chiptune', desc: 'Playful 8-bit', file: '/audio/cute-chiptune.mp3' },
];

interface CardEnhanceControlsProps {
  paperTexture: string;
  setPaperTexture: (t: string) => void;
  palette: { bg: string; text: string; accent: string };
  setPalette: (p: { bg: string; text: string; accent: string }) => void;
  musicId: string;
  setMusicId: (id: string) => void;
  revealStyle: string;
  setRevealStyle: (id: string) => void;
  defaultThemePalette: { bg: string; text: string; accent: string };
}

export function CardEnhanceControls({
  paperTexture,
  setPaperTexture,
  palette,
  setPalette,
  musicId,
  setMusicId,
  revealStyle,
  setRevealStyle,
  defaultThemePalette
}: CardEnhanceControlsProps) {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePreview = (track: typeof MUSIC_TRACKS[0]) => {
    if (playingTrack === track.id) {
      audioRef.current?.pause();
      setPlayingTrack(null);
    } else {
      if (track.file) {
        if (audioRef.current) {
          audioRef.current.src = track.file;
          audioRef.current.play().catch(e => console.warn('Audio play failed', e));
        }
        setPlayingTrack(track.id);
      } else {
        setPlayingTrack(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full h-full bg-background border-l border-border p-6 flex flex-col hide-scrollbar overflow-y-auto pb-24">
      <h3 className="font-heading text-xl text-[var(--charcoal)] mb-2">Enhance</h3>
      <p className="text-sm text-muted-foreground mb-6">Finalize the physical details of your card.</p>
      
      <audio ref={audioRef} loop />

      <BlurFade delay={0.1} yOffset={10}>
        <div className="space-y-8">
          
          {/* Paper Texture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--stone)] mb-3">Paper Texture</h4>
            <div className="grid grid-cols-2 gap-2">
              {PAPER_TEXTURES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setPaperTexture(t.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border text-center transition-all ${
                    paperTexture === t.id
                      ? 'border-[var(--rose)] bg-[var(--rose)]/5 shadow-sm text-[var(--charcoal)]'
                      : 'border-border bg-white text-muted-foreground hover:border-border/80'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Background Override */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--stone)]">Background Color</h4>
              <button 
                onClick={() => setPalette(defaultThemePalette)}
                className="text-[10px] uppercase font-bold text-[var(--rose)] flex items-center gap-1 hover:opacity-80"
              >
                <RefreshCw size={10} /> Reset to Theme
              </button>
            </div>
            <div className="flex gap-2">
              {BG_SWATCHES.map(swatch => (
                <button
                  key={swatch.id}
                  onClick={() => setPalette({ ...palette, bg: swatch.color })}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${
                    palette.bg === swatch.color ? 'border-[var(--charcoal)] scale-110 shadow-md' : 'border-black/5 hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.color }}
                  title={swatch.name}
                />
              ))}
            </div>
          </div>

          {/* Reveal Animation Override */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--stone)] mb-3">Reveal Animation</h4>
            <div className="flex flex-wrap gap-2">
              {REVEAL_STYLES.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRevealStyle(r.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    revealStyle === r.id
                      ? 'border-[var(--rose)] bg-[var(--rose)]/10 text-[var(--rose-deep)] shadow-sm'
                      : 'border-border bg-white text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              How the card opens for the recipient. It defaults to matching your chosen format.
            </p>
          </div>

          {/* Ambient Sound */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--stone)] mb-3">Ambient Sound</h4>
            <div className="space-y-2">
              {MUSIC_TRACKS.map((track) => {
                const isSelected = musicId === track.id;
                const isPlaying = playingTrack === track.id;
                
                return (
                  <div 
                    key={track.id}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected ? 'border-[var(--rose)] bg-[var(--rose)]/5 shadow-sm' : 'border-border bg-white hover:border-border/80'
                    }`}
                    onClick={() => setMusicId(track.id)}
                  >
                    <div>
                      <p className={`text-sm font-medium ${isSelected ? 'text-[var(--charcoal)]' : 'text-muted-foreground'}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{track.desc}</p>
                    </div>
                    
                    {track.file && (
                      <button
                        onClick={(e) => { e.stopPropagation(); togglePreview(track); }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isPlaying ? 'bg-[var(--rose)] text-white' : 'bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-white'
                        }`}
                      >
                        {isPlaying ? <StopCircle size={16} /> : <PlayCircle size={16} />}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </BlurFade>
    </div>
  );
}
