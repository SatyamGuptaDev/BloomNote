'use client';

import { Suspense, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Canvas, CanvasFlower } from '@/components/bouquet/Canvas';
import { FlowerSVG } from '@/components/bouquet/FlowerSVG';
import { NoteCard } from '@/components/bouquet/NoteCard';
import { Toast } from '@/components/shared/Toast';
import { FONT_OPTIONS, MESSAGE_TEMPLATES } from '@/lib/constants';
import { Trash2, ChevronLeft, ChevronRight, Check, Copy, Mail, Sparkles, MessageCircle, Eye, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWER_PALETTE = ['rose-pink', 'rose-red', 'rose-white', 'tulip-yellow', 'tulip-purple', 'sunflower', 'daisy', 'lily', 'greenery'];

function CreateBouquetInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [flowers, setFlowers] = useState<CanvasFlower[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [note, setNote] = useState('');
  const [fromName, setFromName] = useState('');
  const [font, setFont] = useState('serif');
  const [textColor, setTextColor] = useState('#2D2D2D');
  const [bgColor, setBgColor] = useState('#FAF3EC');

  const [slug, setSlug] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle Templates from query params
  useEffect(() => {
    const templateId = searchParams.get('template');
    const from = searchParams.get('from');
    if (from === 'draft') {
      try {
        const draftStr = localStorage.getItem('draft_bouquet');
        if (draftStr) {
          const draft = JSON.parse(draftStr);
          if (draft.flowers) setFlowers(draft.flowers);
          if (draft.note) setNote(draft.note);
          if (draft.fromName) setFromName(draft.fromName);
          if (draft.font) setFont(draft.font);
          if (draft.textColor) setTextColor(draft.textColor);
          if (draft.bgColor) setBgColor(draft.bgColor);
        }
      } catch (error) {
        console.error('Error loading draft', error);
      }
    } else if (templateId) {
      const predefinedTemplates = {
        '1': ['rose-red', 'rose-pink', 'greenery'],
        '2': ['sunflower', 'daisy', 'tulip-yellow'],
        '3': ['lily', 'tulip-purple', 'rose-white'],
      };
      const types = predefinedTemplates[templateId as keyof typeof predefinedTemplates];
      if (types) {
        const generated = types.map((type, i) => ({
          id: Math.random().toString(36).substr(2, 9),
          type,
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
          scale: 0.8 + Math.random() * 0.4,
          rotation: Math.random() * 360,
          zIndex: i + 1,
        }));
        setFlowers(generated);
      }
    }
  }, [searchParams]);

  // Canvas Actions
  const handleFlowerSelect = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id) {
      setFlowers((prev) => {
        const maxZ = Math.max(0, ...prev.map((f) => f.zIndex));
        return prev.map((f) => (f.id === id ? { ...f, zIndex: maxZ + 1 } : f));
      });
    }
  }, []);

  const handleAddFlower = (type: string) => {
    const maxZ = Math.max(0, ...flowers.map((f) => f.zIndex));
    const newFlower: CanvasFlower = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 50 + (Math.random() * 10 - 5),
      y: 50 + (Math.random() * 10 - 5),
      scale: 1,
      rotation: Math.random() * 360,
      zIndex: maxZ + 1,
    };
    setFlowers([...flowers, newFlower]);
    setSelectedId(newFlower.id);
  };

  const handleAutoGenerate = () => {
    const templates = [
      { types: ['rose-red', 'rose-pink', 'greenery', 'rose-red', 'rose-white'], note: 'A classic romantic arrangement just for you. ❤️' },
      { types: ['sunflower', 'daisy', 'daisy', 'greenery', 'tulip-yellow'], note: 'Sending some sunshine and smiles your way! ☀️' },
      { types: ['lily', 'tulip-purple', 'tulip-purple', 'rose-white', 'greenery'], note: 'Thinking of you with these elegant pastels.' },
    ];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const generated = template.types.map((type, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      zIndex: i + 1,
    }));
    setFlowers(generated);
    setNote(template.note);
    setSelectedId(null);
  };

  const handleFlowerMove = useCallback((id: string, x: number, y: number) => {
    setFlowers((prev) => prev.map((f) => (f.id === id ? { ...f, x, y } : f)));
  }, []);

  const handleFlowerUpdate = useCallback((id: string, updates: Partial<CanvasFlower>) => {
    setFlowers((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  }, []);

  const handleFlowerDelete = useCallback((id: string) => {
    setFlowers((prev) => prev.filter((f) => f.id !== id));
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
          flowers: flowers.map((f) => ({ type: f.type, x: f.x, y: f.y, scale: f.scale, rotation: f.rotation, zIndex: f.zIndex })),
          note,
          fromName,
          font,
          textColor,
          bgColor,
        }),
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

  const shareUrl = slug ? `${typeof window !== 'undefined' ? window.location.origin : ''}/b/${slug}` : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setToastMessage('Link copied to clipboard!');
  };

  const colors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Blush', value: '#F7E7E4' },
    { name: 'Cream', value: '#FAF3EC' },
    { name: 'Sage', value: '#e2ece0' },
    { name: 'Lavender', value: '#E7E3F2' },
    { name: 'Pink', value: '#fde8ef' },
  ];

  const textColors = [
    { name: 'Charcoal', value: '#2B2522' },
    { name: 'Rose', value: '#C16E7E' },
    { name: 'Sage', value: '#799173' },
    { name: 'Purple', value: '#8b8bb3' },
    { name: 'Stone', value: '#897F7A' },
    { name: 'White', value: '#FFFFFF' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[var(--background)] to-[var(--blush)]/25">
      {!isOnline && (
        <div className="sticky top-0 z-50 animate-pulse bg-red-500 py-2 text-center text-sm font-medium text-white">
          You are offline. Reconnect to save your bouquet.
        </div>
      )}
      <Header variant="minimal" />

      {/* Stepper */}
      <div className="relative z-10 w-full border-b border-[var(--blush)] bg-white/80 pt-16 backdrop-blur-sm">
        <div className="mx-auto max-w-md px-6 py-5">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-5 right-5 top-5 h-[3px] -translate-y-1/2 rounded-full bg-[var(--blush)]" />
            <motion.div
              className="absolute left-5 top-5 h-[3px] -translate-y-1/2 rounded-full bg-[var(--rose)]"
              initial={false}
              animate={{ width: `calc(${((step - 1) / 2) * 100}% - ${((step - 1) / 2) * 40}px)` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
            {[
              { n: 1, label: 'Arrange' },
              { n: 2, label: 'Write note' },
              { n: 3, label: 'Share' },
            ].map((s) => {
              const done = step > s.n;
              const current = step === s.n;
              return (
                <div key={s.n} className="relative z-10 flex flex-col items-center gap-2">
                  <motion.div
                    animate={{ scale: current ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className={cn(
                      'grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition-colors duration-300',
                      done && 'bg-[var(--rose)] text-white',
                      current && 'bg-[var(--rose)] text-white ring-4 ring-[var(--rose)]/20',
                      !done && !current && 'border-2 border-[var(--blush)] bg-white text-[var(--stone)]'
                    )}
                  >
                    {done ? <Check className="h-5 w-5" /> : s.n}
                  </motion.div>
                  <span className={cn('text-xs font-medium transition-colors', current || done ? 'text-[var(--charcoal)]' : 'text-[var(--stone)]')}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex h-[calc(100vh-5rem)] flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Canvas (steps 1 & 2) */}
        {(step === 1 || step === 2) && (
          <div className={cn('relative flex flex-1 flex-col bg-[radial-gradient(circle_at_50%_30%,var(--blush)/40,transparent_70%)] transition-all duration-300', step === 1 ? 'lg:w-3/5' : 'lg:w-1/2')}>
            {/* Floating toolbar */}
            <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full border border-[var(--blush)] bg-white/90 px-4 py-2 shadow-lg shadow-[var(--rose)]/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="mr-1 hidden text-xs text-[var(--stone)] sm:inline">Backdrop</span>
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setBgColor(c.value)}
                    className={cn('h-6 w-6 rounded-full border shadow-sm transition-transform hover:scale-110', bgColor === c.value ? 'scale-110 border-transparent ring-2 ring-[var(--charcoal)] ring-offset-2' : 'border-gray-200')}
                    style={{ backgroundColor: c.value }}
                    aria-label={`Backdrop ${c.name}`}
                  />
                ))}
              </div>
              <div className="h-6 w-px bg-[var(--blush)]" />
              <span className="whitespace-nowrap text-sm font-semibold text-[var(--charcoal)]">🌸 {flowers.length}</span>
              <button
                onClick={clearCanvas}
                disabled={flowers.length === 0}
                className="flex items-center gap-1 whitespace-nowrap text-xs text-[var(--stone)] transition-colors hover:text-[var(--rose)] disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>

            {/* Canvas frame */}
            <div className="flex w-full flex-1 items-center justify-center overflow-y-auto p-4 pt-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-[var(--rose)]/15 ring-1 ring-[var(--blush)]"
              >
                <Canvas
                  flowers={flowers}
                  backgroundColor={bgColor}
                  onFlowerMove={handleFlowerMove}
                  onFlowerSelect={handleFlowerSelect}
                  onFlowerDelete={handleFlowerDelete}
                  onFlowerUpdate={handleFlowerUpdate}
                  selectedId={selectedId}
                />
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="pointer-events-none absolute inset-x-4 bottom-4 z-30"
                    >
                      <NoteCard note={note} fromName={fromName} font={font} textColor={textColor} className="max-h-[50%] overflow-hidden shadow-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        )}

        {/* Step 1: Palette */}
        {step === 1 && (
          <div className="z-20 flex h-2/5 flex-col border-t border-[var(--blush)] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:h-full lg:w-2/5 lg:border-l lg:border-t-0 lg:shadow-none">
            <div className="hidden items-start justify-between gap-3 border-b border-[var(--blush)] p-6 lg:flex">
              <div>
                <h2 className="font-heading text-2xl text-[var(--charcoal)]">Your bouquet</h2>
                <p className="mt-1 text-sm text-[var(--stone)]">Tap to add · drag to arrange</p>
              </div>
              <button
                onClick={handleAutoGenerate}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--rose)]/10 px-3.5 py-2 text-sm font-medium text-[var(--rose-deep)] transition-colors hover:bg-[var(--rose)]/20"
              >
                <Wand2 className="h-4 w-4" /> Surprise me
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
                {['All', 'Roses', 'Tulips', 'Lilies', 'Greenery'].map((cat, i) => (
                  <button
                    key={cat}
                    className={cn('whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors', i === 0 ? 'bg-[var(--rose)] text-white' : 'bg-[var(--blush)]/40 text-[var(--stone)] hover:bg-[var(--blush)]/70 hover:text-[var(--charcoal)]')}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-3 pb-24 sm:grid-cols-6 lg:grid-cols-4 lg:pb-0 xl:grid-cols-5">
                {FLOWER_PALETTE.map((type) => (
                  <motion.button
                    key={type}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleAddFlower(type)}
                    className="group flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-white to-[var(--blush)]/40 ring-1 ring-[var(--blush)] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--rose)]/10 hover:ring-[var(--rose)]/40"
                    title={`Add ${type.replace('-', ' ')}`}
                  >
                    <FlowerSVG type={type} width={42} height={42} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile surprise + Next */}
            <div className="flex items-center gap-3 border-t border-[var(--blush)] bg-white/60 p-4 lg:justify-end lg:p-6">
              <button
                onClick={handleAutoGenerate}
                className="flex items-center gap-1.5 rounded-full bg-[var(--rose)]/10 px-4 py-3 text-sm font-medium text-[var(--rose-deep)] transition-colors hover:bg-[var(--rose)]/20 lg:hidden"
              >
                <Wand2 className="h-4 w-4" /> Surprise
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={flowers.length === 0}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-white shadow-lg transition-all lg:flex-none',
                  flowers.length === 0 ? 'cursor-not-allowed bg-gray-300 opacity-80' : 'bg-[var(--rose)] shadow-[var(--rose)]/25 hover:bg-[var(--rose-deep)] hover:shadow-xl'
                )}
              >
                Next: Write note <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Note editor */}
        {step === 2 && (
          <div className="z-20 flex h-1/2 flex-col overflow-y-auto border-t border-[var(--blush)] bg-white lg:h-full lg:w-1/2 lg:border-l lg:border-t-0">
            <div className="mx-auto flex w-full max-w-xl flex-1 flex-col p-6 sm:p-8">
              <h2 className="font-heading text-3xl text-[var(--charcoal)]">Write your message</h2>
              <p className="mt-1 text-sm text-[var(--stone)]">A few heartfelt words go a long way.</p>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="relative">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      maxLength={500}
                      placeholder="Write something from the heart..."
                      className="h-40 w-full resize-none rounded-2xl border border-[var(--blush)] bg-[var(--background)] p-4 font-script text-xl text-[var(--charcoal)] outline-none transition-all placeholder:text-[var(--stone)]/60 focus:border-[var(--rose)] focus:ring-2 focus:ring-[var(--rose)]/30"
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-[var(--stone)]">{note.length}/500</span>
                  </div>
                </div>

                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  placeholder="Your name (optional)"
                  maxLength={50}
                  className="w-full rounded-xl border border-[var(--blush)] bg-white px-4 py-3 text-[var(--charcoal)] outline-none transition-all focus:border-[var(--rose)] focus:ring-2 focus:ring-[var(--rose)]/30"
                />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-[var(--charcoal)]">Typography</label>
                  <div className="grid grid-cols-3 gap-2">
                    {FONT_OPTIONS.filter((f) => f.id !== 'elegant').map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFont(f.id)}
                        className={cn('rounded-xl border px-3 py-2.5 text-sm transition-all', font === f.id ? 'border-transparent bg-[var(--rose)] text-white shadow-md shadow-[var(--rose)]/20' : 'border-[var(--blush)] bg-white text-[var(--charcoal)] hover:bg-[var(--blush)]/30')}
                      >
                        <span className={f.id === 'script' ? 'font-script text-lg' : f.className}>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-[var(--charcoal)]">Text colour</label>
                  <div className="flex flex-wrap gap-3">
                    {textColors.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setTextColor(c.value)}
                        className={cn('h-8 w-8 rounded-full border-2 transition-transform hover:scale-110', textColor === c.value ? 'scale-110 border-transparent ring-2 ring-[var(--charcoal)] ring-offset-2' : 'border-gray-200')}
                        style={{ backgroundColor: c.value }}
                        aria-label={`Text colour ${c.name}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--blush)] bg-[var(--blush)]/25 p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--charcoal)]">
                    <Sparkles className="h-4 w-4 text-[var(--rose)]" /> Need inspiration?
                  </h3>
                  <div className="space-y-1.5">
                    {MESSAGE_TEMPLATES['just-because'].slice(0, 3).map((msg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setNote(msg)}
                        className="block w-full rounded-lg p-2 text-left text-sm text-[var(--stone)] transition-colors hover:bg-white hover:text-[var(--rose-deep)]"
                      >
                        &ldquo;{msg}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 mt-auto flex justify-between border-t border-[var(--blush)] bg-white/90 p-5 backdrop-blur-sm">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 rounded-full px-5 py-3 font-medium text-[var(--charcoal)] transition-colors hover:bg-[var(--blush)]/40">
                <ChevronLeft className="h-5 w-5" /> Back
              </button>
              <button
                onClick={handleCreate}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-full bg-[var(--charcoal)] px-7 py-3 font-medium text-white shadow-lg transition-all hover:bg-black disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? 'Creating…' : <>Finish bouquet <Check className="h-5 w-5" /></>}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden p-6">
            {/* floating petals */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -40, x: (i - 3) * 60 }}
                animate={{ opacity: [0, 1, 0], y: 220 }}
                transition={{ duration: 3.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 1.5 }}
                className="pointer-events-none absolute top-10 text-2xl"
              >
                🌸
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-[var(--blush)] bg-white p-8 text-center shadow-2xl shadow-[var(--rose)]/10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--rose-deep)] text-white shadow-lg shadow-[var(--rose)]/30"
              >
                <Check className="h-10 w-10" />
              </motion.div>

              <h2 className="font-heading text-3xl text-[var(--charcoal)] sm:text-4xl">Your bouquet is ready!</h2>
              <p className="mt-2 text-[var(--stone)]">Share this link with someone special.</p>

              <div className="mt-7 flex items-center gap-2 rounded-xl border border-[var(--blush)] bg-[var(--background)] p-1.5 pl-4">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  onClick={(e) => e.currentTarget.select()}
                  className="flex-1 truncate bg-transparent font-mono text-sm text-[var(--stone)] outline-none"
                />
                <button onClick={handleCopyLink} className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[var(--rose)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--rose-deep)]">
                  <Copy className="h-4 w-4" /> Copy
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`I made you a virtual bouquet! 💐 Open it here: ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-medium text-white shadow-md transition-colors hover:bg-[#128C7E]"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent('A virtual bouquet for you')}&body=${encodeURIComponent(`I made you a bouquet. You can view it here: ${shareUrl}`)}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-[var(--blush)] bg-white px-4 py-3 font-medium text-[var(--charcoal)] transition-colors hover:bg-[var(--blush)]/30"
                >
                  <Mail className="h-5 w-5" /> Email
                </a>
              </div>

              <Link
                href={`/b/${slug}`}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[var(--charcoal)] px-4 py-3 font-medium text-white transition-colors hover:bg-black"
              >
                <Eye className="h-5 w-5" /> View your bouquet
              </Link>

              <button
                onClick={() => {
                  setStep(1);
                  clearCanvas();
                  setNote('');
                  setFromName('');
                  setSlug(null);
                }}
                className="mt-6 text-sm font-medium text-[var(--stone)] underline underline-offset-4 transition-colors hover:text-[var(--rose)]"
              >
                Create another bouquet
              </button>
            </motion.div>
          </div>
        )}
      </main>

      <Toast message={toastMessage} isVisible={!!toastMessage} onClose={() => setToastMessage('')} type="success" />
    </div>
  );
}

export default function CreateBouquet() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-white"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--rose)] border-t-transparent" /></div>}>
      <CreateBouquetInner />
    </Suspense>
  );
}
