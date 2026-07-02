'use client';

import { StudioStage } from '@/types/studio';
import { FlowerAsset } from '@prisma/client';
import { BlurFade } from '@/components/magic/BlurFade';
import { Undo2, Sparkles, Send, Copy, Loader2, QrCode } from 'lucide-react';
import { useState } from 'react';

interface ContextualControlsProps {
  stage: StudioStage;
  selectedFlower?: FlowerAsset | null;
  onUndo: () => void;
  canUndo: boolean;
  onAutoArrange?: () => void;
  placedFlowers: import('@/types/studio').PlacedFlower[];
  onSelectPlacedFlower: (id: string) => void;
  onReorderPlacedFlowers: (newOrder: import('@/types/studio').PlacedFlower[]) => void;
  
  // Write State
  note: string;
  setNote: (note: string) => void;
  font: string;
  setFont: (font: string) => void;
  
  // Enhance State
  bgColor: string;
  setBgColor: (color: string) => void;
  
  // Preview State
  senderName: string;
  setSenderName: (name: string) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  shareLink: string | null;
}

const FONTS = [
  { id: 'font-serif', name: 'Classic Serif', class: 'font-serif' },
  { id: 'font-script', name: 'Dancing Script', class: 'font-script' },
  { id: 'font-heading', name: 'Fraunces', class: 'font-heading' },
];

const PROMPT_STARTERS = [
  "I may not be there today, but this bouquet carries my warmest hug.",
  "Thank you for being the calm in my noisy days. You mean more than words can hold.",
  "I saw these flowers and thought of your smile. Hope they brighten your day.",
  "For every time you stood by me quietly, this is a small way to say I noticed.",
  "Sending a little sunshine your way.",
  "You make the world a more beautiful place.",
  "Just a reminder of how deeply you are loved.",
  "Because you deserve flowers every single day.",
  "I am so proud of the person you're becoming.",
  "Here's to new beginnings and beautiful chapters.",
  "Let this bouquet remind you of my unwavering support.",
  "I cherish every memory we've made together.",
  "Thank you for always listening without judgment.",
  "May your day be as vibrant as these colors.",
  "I can't wait to see you again.",
  "You're the reason I believe in good things.",
  "Wishing you peace, joy, and everything in between.",
  "I hope this brings a quiet moment of happiness.",
  "To my favorite person in the whole world.",
  "You've got this. I believe in you.",
  "Thank you for being exactly who you are.",
  "Sending strength, love, and a bit of magic.",
  "You are stronger than you know.",
  "I'm always here for you, no matter what.",
  "Happy anniversary to my better half."
];

const BG_SWATCHES = [
  { id: 'bg-white', color: '#ffffff', name: 'Clean White' },
  { id: 'bg-cream', color: '#fcfaf8', name: 'Soft Cream' },
  { id: 'bg-blush', color: '#fdf8f7', name: 'Pale Blush' },
  { id: 'bg-stone', color: '#f4f4f5', name: 'Cool Stone' },
  { id: 'bg-sage', color: '#f1f5f2', name: 'Mist Sage' },
];

const MUSIC_TRACKS = [
  { id: 'no-music', title: 'No music', desc: 'Silence' },
  { id: 'gentle-guitar', title: 'Gentle Guitar', desc: 'Warm & acoustic' },
  { id: 'sweet-piano', title: 'Sweet Piano', desc: 'Soft & emotional' },
  { id: 'lofi-vibe', title: 'Lofi Vibe', desc: 'Chill & relaxing' },
  { id: 'cute-chiptune', title: 'Cute Chiptune', desc: 'Playful 8-bit' },
];

import { Reorder } from 'framer-motion';

export function ContextualControls({ 
  stage, selectedFlower, onUndo, canUndo, onAutoArrange,
  placedFlowers, onSelectPlacedFlower, onReorderPlacedFlowers,
  note, setNote, font, setFont,
  bgColor, setBgColor,
  senderName, setSenderName, recipientName, setRecipientName,
  onSubmit, isSubmitting, shareLink
}: ContextualControlsProps) {

  const [showQr, setShowQr] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);

  return (
    <div className="w-full h-full bg-background border-l border-border p-6 flex flex-col hide-scrollbar overflow-y-auto pb-24">
      <h3 className="font-heading text-xl text-[var(--charcoal)] mb-6 capitalize">{stage}</h3>
      
      <div className="flex-1">
        {stage === 'arrange' && (
          <BlurFade delay={0.1} yOffset={10} key="arrange">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--stone)] disabled:opacity-40 hover:text-[var(--charcoal)] transition-colors"
              >
                <Undo2 size={16} /> Undo
              </button>
              
              <button
                onClick={onAutoArrange}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--rose)] hover:text-[var(--rose-deep)] transition-colors"
              >
                <Sparkles size={16} /> Surprise Me
              </button>
            </div>

            {selectedFlower ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[var(--cream)]/50 border border-border">
                  <h4 className="font-medium text-sm text-[var(--charcoal)] mb-1">{selectedFlower.name}</h4>
                  <p className="text-xs text-muted-foreground">{selectedFlower.category}</p>
                  
                  {selectedFlower.meaningTag && (
                    <div className="mt-4 p-3 bg-white rounded-lg shadow-sm border border-black/5">
                      <p className="text-xs italic text-[var(--stone)] leading-relaxed">
                        "{selectedFlower.meaningTag}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center rounded-xl bg-muted/30 border border-border border-dashed text-center p-4 mt-8">
                <p className="text-sm text-muted-foreground text-balance">
                  Select a flower from the library to see its details.
                </p>
              </div>
            )}

            {placedFlowers.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Placed Elements</h4>
                <Reorder.Group 
                  values={placedFlowers} 
                  onReorder={onReorderPlacedFlowers}
                  className="space-y-2"
                >
                  {placedFlowers.map(pf => (
                    <Reorder.Item
                      key={pf.id}
                      value={pf}
                      dragListener={true}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-white hover:border-[var(--rose)] hover:bg-[var(--rose)]/5 transition-colors cursor-grab active:cursor-grabbing text-left"
                    >
                      <button 
                        onClick={() => onSelectPlacedFlower(pf.id)} 
                        className="flex-1 text-left outline-none"
                      >
                        <span className="text-sm font-medium text-[var(--charcoal)]">{pf.asset.name}</span>
                      </button>
                      <span className="text-xs text-muted-foreground">Layer {pf.zIndex}</span>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>
            )}
          </BlurFade>
        )}

        {stage === 'write' && (
          <BlurFade delay={0.1} yOffset={10} key="write">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--charcoal)] mb-2">Typography</label>
                <div className="grid grid-cols-3 gap-2">
                  {FONTS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFont(f.id)}
                      className={`p-2 rounded-lg text-sm border transition-all ${font === f.id ? 'border-[var(--rose)] bg-[var(--rose)]/5 text-[var(--rose)]' : 'border-border bg-white text-muted-foreground hover:border-black/20'}`}
                    >
                      <span className={f.class}>{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex justify-between items-end mb-2">
                  <span className="block text-sm font-medium text-[var(--charcoal)]">Your Message</span>
                  <span className="text-xs text-muted-foreground">{note.length} / 250</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write something beautiful..."
                  className={`w-full h-40 p-4 rounded-xl border border-border resize-none focus:outline-none focus:ring-2 focus:ring-[var(--rose)]/50 bg-white ${font}`}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Note Ideas</label>
                  <button 
                    onClick={() => setShowAllNotes(!showAllNotes)}
                    className="text-xs px-3 py-1 rounded-full border border-border bg-white text-[var(--charcoal)] hover:bg-black/5 transition-colors"
                  >
                    {showAllNotes ? 'Show less' : 'See all'}
                  </button>
                </div>
                <div className="space-y-3">
                  {(showAllNotes ? PROMPT_STARTERS : PROMPT_STARTERS.slice(0, 5)).map((starter, i) => (
                    <button
                      key={i}
                      onClick={() => setNote(starter)}
                      className="w-full text-left p-4 rounded-xl border border-border bg-[var(--cream)]/30 hover:bg-[var(--blush)]/50 transition-colors text-sm text-[var(--charcoal)] leading-relaxed"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        )}

        {stage === 'enhance' && (
          <BlurFade delay={0.1} yOffset={10} key="enhance">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-[var(--charcoal)] mb-3">Background Color</label>
                <div className="flex flex-wrap gap-3">
                  {BG_SWATCHES.map(swatch => (
                    <button
                      key={swatch.id}
                      onClick={() => setBgColor(swatch.color)}
                      title={swatch.name}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${bgColor === swatch.color ? 'border-[var(--rose)] scale-110 shadow-sm' : 'border-black/5 hover:scale-105 shadow-sm'}`}
                      style={{ backgroundColor: swatch.color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--charcoal)] mb-3">Background Music (Preview)</label>
                <div className="grid grid-cols-2 gap-3">
                  {MUSIC_TRACKS.map((track) => (
                    <label 
                      key={track.id} 
                      className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-[var(--rose)]/5 hover:border-[var(--rose)]/30 cursor-pointer transition-colors relative"
                    >
                      <input 
                        type="radio" 
                        name="music" 
                        defaultChecked={track.id === 'lofi-vibe'}
                        className="absolute opacity-0 w-full h-full cursor-pointer z-10" 
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--charcoal)]">{track.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{track.desc}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[var(--rose)]/10 flex items-center justify-center text-[var(--charcoal)]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        )}

        {stage === 'preview' && (
          <BlurFade delay={0.1} yOffset={10} key="preview">
            {!shareLink ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--charcoal)] mb-1">To (Optional)</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Recipient's Name"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--rose)]/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--charcoal)] mb-1">From (Optional)</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name (leave blank to be anonymous)"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-[var(--rose)]/50"
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[var(--charcoal)] text-white font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-80"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    {isSubmitting ? 'Generating...' : 'Create & Share Bouquet'}
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Creates a unique shareable link. No account required.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} />
                </div>
                <h4 className="font-heading text-2xl text-[var(--charcoal)]">Bouquet Created!</h4>
                <p className="text-sm text-muted-foreground">Your beautiful arrangement is ready to share.</p>
                
                <div className="bg-muted/30 p-4 rounded-xl border border-border flex items-center gap-3">
                  <input 
                    type="text" 
                    readOnly 
                    value={shareLink} 
                    className="flex-1 bg-transparent text-sm focus:outline-none overflow-hidden text-ellipsis"
                  />
                  <button 
                    onClick={() => navigator.clipboard.writeText(shareLink)}
                    className="p-2 bg-white rounded-md shadow-sm border border-border hover:bg-gray-50 text-[var(--charcoal)] transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <a
                    href={'https://wa.me/?text=' + encodeURIComponent('I made a bouquet for you: ' + shareLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Share on WhatsApp
                  </a>
                  <button 
                    onClick={() => setShowQr(!showQr)}
                    className="py-3 rounded-xl bg-white border border-border text-[var(--charcoal)] font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <QrCode size={16} /> {showQr ? 'Hide QR' : 'Show QR'}
                  </button>
                </div>

                {showQr && (
                  <div className="mt-6 flex flex-col items-center">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-border inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLink)}`} 
                        alt="QR Code" 
                        width={150} 
                        height={150} 
                        className="rounded-md"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Scan this code to open the bouquet on another device.</p>
                  </div>
                )}
              </div>
            )}
          </BlurFade>
        )}
      </div>
    </div>
  );
}
