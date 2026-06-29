'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Canvas, CanvasFlower } from '@/components/bouquet/Canvas';
import { FlowerSVG } from '@/components/bouquet/FlowerSVG';
import { NoteCard } from '@/components/bouquet/NoteCard';
import { Toast } from '@/components/shared/Toast';
import { FLOWER_TYPES, FONT_OPTIONS, MESSAGE_TEMPLATES, OCCASIONS } from '@/lib/constants';
import { Trash2, ChevronLeft, ChevronRight, Check, Copy, Share2, Mail, Sparkles, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateBouquet() {
  const router = useRouter();
  
  // State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [flowers, setFlowers] = useState<CanvasFlower[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [note, setNote] = useState('');
  const [fromName, setFromName] = useState('');
  const [font, setFont] = useState('serif');
  const [textColor, setTextColor] = useState('#2D2D2D');
  const [bgColor, setBgColor] = useState('#FFFDD0'); // --cream
  
  const [slug, setSlug] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Canvas Actions
  const handleAddFlower = (type: string) => {
    const newFlower: CanvasFlower = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 50 + (Math.random() * 10 - 5), // center with slight jitter
      y: 50 + (Math.random() * 10 - 5),
      scale: 1,
      rotation: Math.random() * 360,
      zIndex: flowers.length + 1
    };
    setFlowers([...flowers, newFlower]);
    setSelectedId(newFlower.id);
  };

  const handleFlowerMove = useCallback((id: string, x: number, y: number) => {
    setFlowers(prev => prev.map(f => f.id === id ? { ...f, x, y } : f));
  }, []);

  const handleFlowerUpdate = useCallback((id: string, updates: Partial<CanvasFlower>) => {
    setFlowers(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const handleFlowerDelete = useCallback((id: string) => {
    setFlowers(prev => prev.filter(f => f.id !== id));
    setSelectedId(null);
  }, []);

  const clearCanvas = () => {
    setFlowers([]);
    setSelectedId(null);
  };

  // Submit
  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bouquet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowers: flowers.map(f => ({
            type: f.type,
            x: f.x,
            y: f.y,
            scale: f.scale,
            rotation: f.rotation,
            zIndex: f.zIndex
          })),
          note,
          fromName,
          font,
          textColor,
          bgColor
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setSlug(data.slug);
        setStep(3);
      } else {
        throw new Error(data.error || 'Failed to create bouquet');
      }
    } catch (error) {
      console.error(error);
      setToastMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Share Actions
  const shareUrl = slug ? `${typeof window !== 'undefined' ? window.location.origin : ''}/b/${slug}` : '';
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setToastMessage('Link copied to clipboard!');
  };

  const colors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Blush', value: '#F8E8E8' },
    { name: 'Cream', value: '#FFFDD0' },
    { name: 'Sage', value: '#e2ece0' },
    { name: 'Lavender', value: '#E6E6FA' },
    { name: 'Pink', value: '#fde8ef' },
  ];

  const textColors = [
    { name: 'Charcoal', value: '#2D2D2D' },
    { name: 'Rose', value: '#E8A0A0' },
    { name: 'Sage', value: '#799173' },
    { name: 'Purple', value: '#8b8bb3' },
    { name: 'Stone', value: '#8C8C8C' },
    { name: 'White', value: '#FFFFFF' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--cream)]/30">
      <Header variant="minimal" />
      
      {/* Progress Bar */}
      <div className="pt-16 w-full bg-white border-b border-[var(--blush)]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-sm font-medium text-[var(--charcoal)] w-24">
            Step {step} of 3
          </div>
          <div className="flex-1 max-w-md mx-8 relative h-1.5 bg-[var(--blush)] rounded-full overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-[var(--rose)]"
              initial={{ width: `${((step - 1) / 3) * 100}%` }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-sm text-[var(--stone)] w-24 text-right hidden sm:block">
            {step === 1 ? 'Arrange' : step === 2 ? 'Write Note' : 'Share'}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-5rem)] overflow-hidden">
        
        {/* Step 1 & 2: Left/Top Area - Canvas */}
        {(step === 1 || step === 2) && (
          <div className={cn(
            "flex-1 bg-stone-50/50 flex flex-col relative transition-all duration-300",
            step === 1 ? "lg:w-3/5" : "lg:w-1/2"
          )}>
            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full shadow-md px-4 py-2 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--stone)] mr-1 hidden sm:inline">Background:</span>
                {colors.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setBgColor(c.value)}
                    className={cn(
                      "w-6 h-6 rounded-full border shadow-sm transition-transform hover:scale-110",
                      bgColor === c.value ? "ring-2 ring-[var(--charcoal)] ring-offset-2 scale-110 border-transparent" : "border-gray-200"
                    )}
                    style={{ backgroundColor: c.value }}
                    aria-label={`Set background color to ${c.name}`}
                  />
                ))}
              </div>
              
              <div className="w-px h-6 bg-gray-200" />
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[var(--charcoal)] whitespace-nowrap">🌸 {flowers.length}</span>
                <button 
                  onClick={clearCanvas}
                  className="text-xs text-[var(--stone)] hover:text-[var(--rose)] flex items-center gap-1 transition-colors whitespace-nowrap"
                  disabled={flowers.length === 0}
                >
                  <Trash2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Clear all</span>
                </button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 w-full flex items-center justify-center p-4 pt-16 overflow-y-auto">
              <div className="w-full max-w-md aspect-[4/5] bg-white rounded-2xl shadow-xl overflow-hidden relative">
                <Canvas 
                  flowers={flowers}
                  backgroundColor={bgColor}
                  onFlowerMove={handleFlowerMove}
                  onFlowerSelect={setSelectedId}
                  onFlowerDelete={handleFlowerDelete}
                  onFlowerUpdate={handleFlowerUpdate}
                  selectedId={selectedId}
                />

                {/* Step 2: Overlay Note Card Preview */}
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute inset-x-4 bottom-4 z-30 pointer-events-none"
                    >
                      <NoteCard 
                        note={note} 
                        fromName={fromName} 
                        font={font} 
                        textColor={textColor}
                        className="shadow-2xl max-h-[50%] overflow-hidden" 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Right/Bottom Area - Palette */}
        {step === 1 && (
          <div className="lg:w-2/5 bg-white border-t lg:border-t-0 lg:border-l border-[var(--blush)]/50 flex flex-col h-1/3 lg:h-full z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:shadow-none">
            <div className="p-6 border-b border-[var(--blush)]/50 hidden lg:block">
              <h2 className="font-heading text-2xl text-[var(--charcoal)]">Your bouquet</h2>
              <p className="text-sm text-[var(--stone)] mt-1">Tap a flower to add it to your canvas. Drag to move.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* Fake Categories for MVP */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-2 hide-scrollbar">
                {['All Flowers', 'Roses', 'Tulips', 'Lilies', 'Greenery'].map((cat, i) => (
                  <button 
                    key={cat} 
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                      i === 0 ? "bg-[var(--rose)] text-white" : "bg-[var(--blush)]/30 text-[var(--stone)] hover:bg-[var(--blush)]/50 hover:text-[var(--charcoal)]"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-20 lg:pb-0">
                {[
                  'rose-pink', 'rose-red', 'rose-white', 
                  'tulip-yellow', 'tulip-purple', 
                  'sunflower', 'daisy', 'lily', 'greenery'
                ].map(type => (
                  <button
                    key={type}
                    onClick={() => handleAddFlower(type)}
                    className="aspect-square bg-[var(--cream)] rounded-xl flex items-center justify-center hover:scale-105 hover:shadow-md transition-all active:scale-95"
                    title={`Add ${type.replace('-', ' ')}`}
                  >
                    <FlowerSVG type={type} width={40} height={40} />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile/Desktop Next Button */}
            <div className="absolute bottom-4 right-4 lg:relative lg:bottom-0 lg:right-0 lg:p-6 lg:border-t lg:border-[var(--blush)]/50 lg:bg-gray-50/50 mt-auto">
              <button
                onClick={() => setStep(2)}
                disabled={flowers.length === 0}
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all w-full lg:w-auto ml-auto",
                  flowers.length === 0 
                    ? "bg-gray-300 cursor-not-allowed opacity-80" 
                    : "bg-[var(--rose)] hover:bg-[var(--rose)]/90 hover:shadow-xl hover:scale-105"
                )}
              >
                Next: Write Note <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Right/Bottom Area - Note Editor */}
        {step === 2 && (
          <div className="lg:w-1/2 bg-white border-t lg:border-t-0 lg:border-l border-[var(--blush)]/50 flex flex-col h-1/2 lg:h-full z-20 overflow-y-auto">
            <div className="p-6 sm:p-8 flex-1 flex flex-col max-w-xl mx-auto w-full">
              <h2 className="font-heading text-3xl text-[var(--charcoal)] mb-6">Write a message</h2>
              
              <div className="space-y-6">
                <div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={500}
                    placeholder="Write something from the heart..."
                    className="w-full h-40 bg-[var(--cream)] rounded-xl border border-[var(--blush)]/50 p-4 font-script text-xl text-[var(--charcoal)] focus:ring-2 focus:ring-[var(--rose)]/50 focus:border-[var(--rose)] outline-none resize-none transition-all placeholder:text-[var(--stone)]/60"
                  />
                  <div className="text-right text-xs text-[var(--stone)] mt-1">
                    {note.length} / 500
                  </div>
                </div>

                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  placeholder="Your name (optional)"
                  maxLength={50}
                  className="w-full bg-white border border-[var(--blush)] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--rose)]/50 focus:border-[var(--rose)] outline-none transition-all text-[var(--charcoal)]"
                />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-[var(--charcoal)]">Typography</label>
                  <div className="grid grid-cols-3 gap-2">
                    {FONT_OPTIONS.filter(f => f.id !== 'elegant').map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFont(f.id)}
                        className={cn(
                          "py-2 px-3 rounded-lg border text-sm transition-colors",
                          font === f.id 
                            ? "bg-[var(--rose)] text-white border-transparent" 
                            : "bg-white border-[var(--blush)] text-[var(--charcoal)] hover:bg-[var(--blush)]/30"
                        )}
                      >
                        <span className={f.id === 'script' ? 'font-script text-lg' : f.className}>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-[var(--charcoal)]">Text Color</label>
                  <div className="flex flex-wrap gap-3">
                    {textColors.map(c => (
                      <button
                        key={c.value}
                        onClick={() => setTextColor(c.value)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                          textColor === c.value ? "ring-2 ring-[var(--charcoal)] ring-offset-2 scale-110 border-transparent" : "border-gray-200"
                        )}
                        style={{ backgroundColor: c.value }}
                        aria-label={`Set text color to ${c.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Templates - Simplified for MVP */}
                <div className="bg-[var(--blush)]/30 rounded-xl p-4 mt-6">
                  <h3 className="text-sm font-medium text-[var(--charcoal)] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--rose)]" /> Need inspiration?
                  </h3>
                  <div className="space-y-2">
                    {MESSAGE_TEMPLATES['just-because'].slice(0, 2).map((msg, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setNote(msg)}
                        className="block w-full text-left text-sm text-[var(--stone)] hover:text-[var(--rose)] p-2 rounded hover:bg-white transition-colors"
                      >
                        "{msg}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="p-6 border-t border-[var(--blush)]/50 bg-gray-50/50 flex justify-between mt-auto">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-[var(--charcoal)] font-medium hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button
                onClick={handleCreate}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white bg-[var(--charcoal)] hover:bg-[var(--charcoal)]/90 shadow-lg transition-all disabled:opacity-70 disabled:cursor-wait font-medium"
              >
                {isSubmitting ? 'Creating...' : 'Finish Bouquet'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <div className="flex-1 w-full bg-white flex flex-col items-center justify-center p-6 text-center h-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-[var(--sage)]/20 text-emerald-600 rounded-full flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10" />
            </motion.div>
            
            <h2 className="font-heading text-4xl text-[var(--charcoal)] mb-3">Your bouquet is ready!</h2>
            <p className="text-[var(--stone)] mb-10 text-lg">Share this link with someone special.</p>

            <div className="w-full max-w-md space-y-6">
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-[var(--cream)]/50 border-2 border-[var(--blush)] rounded-xl px-4 py-4 text-center font-mono text-sm text-[var(--charcoal)] outline-none"
                  onClick={(e) => e.currentTarget.select()}
                />
              </div>

              <div className="grid gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`I made you a virtual bouquet! 💐 Open it here: ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white px-6 py-4 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-[#128C7E] transition-colors shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" /> Share on WhatsApp
                </a>
                
                <button
                  onClick={handleCopyLink}
                  className="w-full bg-white border border-[var(--charcoal)] text-[var(--charcoal)] px-6 py-4 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors"
                >
                  <Copy className="w-5 h-5" /> Copy Link
                </button>

                <a
                  href={`mailto:?subject=${encodeURIComponent("A virtual bouquet for you")}&body=${encodeURIComponent(`I made you a bouquet. You can view it here: ${shareUrl}`)}`}
                  className="w-full bg-[var(--charcoal)] text-white px-6 py-4 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-[var(--charcoal)]/90 transition-colors shadow-md"
                >
                  <Mail className="w-5 h-5" /> Send via Email
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                setStep(1);
                clearCanvas();
                setNote('');
                setFromName('');
                setSlug(null);
              }}
              className="mt-12 text-[var(--stone)] hover:text-[var(--rose)] underline underline-offset-4 transition-colors font-medium"
            >
              Create Another Bouquet
            </button>
          </div>
        )}

      </main>

      <Toast 
        message={toastMessage} 
        isVisible={!!toastMessage} 
        onClose={() => setToastMessage('')} 
        type="success"
      />
    </div>
  );
}
