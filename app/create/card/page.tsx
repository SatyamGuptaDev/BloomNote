'use client';

import { useState, useEffect } from 'react';
import { CardStage, CARD_STAGES, PlacedElement } from '@/types/card-studio';
import { CARD_FORMATS, CARD_THEMES } from '@/lib/card-constants';
import { TopProgress } from '@/components/bouquet/TopProgress';
import { Header } from '@/components/layout/Header';
import { CardCanvas } from '@/components/card/CardCanvas';
import { CardFormatPicker } from '@/components/card/CardFormatPicker';
import { ThemeLibrary } from '@/components/card/ThemeLibrary';
import { CardWriteControls } from '@/components/card/CardWriteControls';
import { CardPersonalizeControls } from '@/components/card/CardPersonalizeControls';
import { CardEnhanceControls } from '@/components/card/CardEnhanceControls';
import { CardPreviewControls } from '@/components/card/CardPreviewControls';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// Simple ID generator for elements
const generateId = () => Math.random().toString(36).substring(2, 9);

export default function CardStudio() {
  const [currentStage, setCurrentStage] = useState<CardStage>('design');
  const [highestStage, setHighestStage] = useState<CardStage>('design');

  // Stage 1: Design State
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [palette, setPalette] = useState<{ bg: string; text: string; accent: string }>({ bg: '#fff', text: '#000', accent: '#ccc' });
  const [defaultPalette, setDefaultPalette] = useState<{ bg: string; text: string; accent: string }>({ bg: '#fff', text: '#000', accent: '#ccc' });

  // Stage 2: Write State
  const [note, setNote] = useState<string>('');
  const [font, setFont] = useState<string>('font-serif');
  const [occasion, setOccasion] = useState<string>('general');

  // Stage 3: Personalize State
  const [elementsState, setElementsState] = useState<PlacedElement[]>([]);
  const [history, setHistory] = useState<PlacedElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const elements = elementsState;

  // Sync note to elements so it can be layered/dragged
  useEffect(() => {
    setElementsState(prev => {
      const existing = prev.find(e => e.id === 'main-note');
      if (!note) {
        return existing ? prev.filter(e => e.id !== 'main-note') : prev;
      }
      if (existing) {
        if (existing.payload === note && existing.textOptions?.fontFamily === font && existing.textOptions?.color === palette.text) return prev;
        return prev.map(e => e.id === 'main-note' ? { ...e, payload: note, textOptions: { ...e.textOptions, fontFamily: font, color: palette.text } } : e);
      } else {
        const minZ = prev.length > 0 ? Math.min(...prev.map(p => p.zIndex)) - 1 : 0;
        return [{
          id: 'main-note',
          type: 'text',
          payload: note,
          x: 50,
          y: 50,
          scale: 1,
          rotation: 0,
          zIndex: minZ,
          textOptions: { color: palette.text, fontFamily: font }
        }, ...prev];
      }
    });
  }, [note, font, palette.text]);

  const setElements = (newElements: PlacedElement[] | ((prev: PlacedElement[]) => PlacedElement[])) => {
    setElementsState(prev => {
      const nextElements = typeof newElements === 'function' ? newElements(prev) : newElements;
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(nextElements);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      return nextElements;
    });
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setElementsState(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setElementsState(history[newIndex]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' || e.key === 'Z') {
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
        } else if (e.key === 'y' || e.key === 'Y') {
          e.preventDefault();
          redo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex]);

  // Stage 4: Enhance State
  const [paperTexture, setPaperTexture] = useState<string>('matte');
  const [musicId, setMusicId] = useState<string>('no-music');
  const [revealStyle, setRevealStyle] = useState<string>('');

  // Stage 5: Preview & Send State
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [scheduledFor, setScheduledFor] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState<'format' | 'theme'>('format');

  // Handle Design Defaults
  const handleThemeSelect = (themeId: string, theme: typeof CARD_THEMES[0]) => {
    setSelectedThemeId(themeId);
    setPalette(theme.defaultPalette);
    setDefaultPalette(theme.defaultPalette);
    setPaperTexture(theme.defaultPaper);
    setFont(theme.defaultFont);
  };

  const handleFormatSelect = (id: string) => {
    setSelectedFormat(id);
    const format = CARD_FORMATS.find(f => f.id === id);
    if (format) setRevealStyle(format.defaultRevealStyle);
    setMobileTab('theme');
  };

  // Element Handlers
  const handleAddElement = (el: Omit<PlacedElement, 'id'>) => {
    const id = generateId();
    setElements([...elements, { ...el, id }]);
    setSelectedElementId(id);
  };

  const handleElementMove = (id: string, x: number, y: number) => {
    setElements(elements.map(el => el.id === id ? { ...el, x, y } : el));
  };

  const handleElementUpdate = (id: string, updates: Partial<PlacedElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const handleElementDelete = (id: string) => {
    if (id === 'main-note') setNote('');
    setElements(elements.filter(el => el.id !== id));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  const handleReorderElements = (newOrder: PlacedElement[]) => {
    // newOrder comes from framer-motion Reorder, we just need to update zIndexes
    // Top of the list in UI = highest z-index
    const ordered = newOrder.map((el, idx) => ({ ...el, zIndex: newOrder.length - idx }));
    setElements(ordered);
  };

  const handleSubmitCard = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          elements,
          senderName,
          recipientName,
          format: selectedFormat,
          themeId: selectedThemeId,
          paperTexture,
          palette,
          musicId,
          occasion,
          scheduledFor: scheduledFor || undefined
        })
      });
      if (res.ok) {
        const data = await res.json();
        setShareLink(`${window.location.origin}/c/${data.slug}?preview=true`);
      } else {
        alert("Failed to generate share link.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation Logic
  const handleNext = () => {
    const stages: CardStage[] = ['design', 'write', 'personalize', 'enhance', 'preview'];
    const idx = stages.indexOf(currentStage);
    if (idx < stages.length - 1) {
      const nextStage = stages[idx + 1];
      setCurrentStage(nextStage);
      setHighestStage(prev => {
        const prevIdx = stages.indexOf(prev);
        return prevIdx > idx + 1 ? prev : nextStage;
      });
      setSelectedElementId(null); // deselect on stage change
    }
  };

  // Validation for "Next Step"
  let canProceed = false;
  if (currentStage === 'design') {
    canProceed = !!(selectedFormat && selectedThemeId);
  } else if (currentStage === 'write') {
    canProceed = true; // allow empty note if they really want, or require it? We allow it for now.
  } else if (currentStage === 'personalize') {
    canProceed = true;
  } else if (currentStage === 'enhance') {
    canProceed = true;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--background)]">
      <Header />

      <main className="flex-1 flex flex-col min-h-0 relative">
        <TopProgress 
          stages={CARD_STAGES}
          currentStage={currentStage} 
          highestStage={highestStage}
          onNavigate={(stage) => {
            setCurrentStage(stage as CardStage);
            setSelectedElementId(null);
          }}
        />

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_360px] xl:grid-cols-[300px_1fr_400px] flex-1 min-h-0 relative">
          
          {/* Left Panel */}
          <div className="border-r border-border bg-white overflow-hidden relative">
            <AnimatePresence mode="wait">
              {currentStage === 'design' && (
                <motion.div key="design" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <CardFormatPicker selectedFormatId={selectedFormat} onSelect={handleFormatSelect} />
                </motion.div>
              )}
              {currentStage === 'write' && (
                <motion.div key="write" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <CardWriteControls 
                    note={note} setNote={setNote} 
                    font={font} setFont={setFont} 
                    formatId={selectedFormat} occasion={occasion} 
                  />
                </motion.div>
              )}
              {currentStage === 'personalize' && (
                <motion.div key="personalize" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <CardPersonalizeControls 
                    elements={elements} onAddElement={handleAddElement} 
                    onReorderElements={handleReorderElements} 
                    onSelectElement={setSelectedElementId} selectedElementId={selectedElementId} 
                    onUndo={undo} onRedo={redo}
                    canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1}
                  />
                </motion.div>
              )}
              {currentStage === 'enhance' && (
                <motion.div key="enhance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <CardEnhanceControls 
                    paperTexture={paperTexture} setPaperTexture={setPaperTexture}
                    palette={palette} setPalette={setPalette}
                    musicId={musicId} setMusicId={setMusicId}
                    revealStyle={revealStyle} setRevealStyle={setRevealStyle}
                    defaultThemePalette={defaultPalette}
                  />
                </motion.div>
              )}
              {currentStage === 'preview' && (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <CardPreviewControls
                    senderName={senderName} setSenderName={setSenderName}
                    recipientName={recipientName} setRecipientName={setRecipientName}
                    scheduledFor={scheduledFor} setScheduledFor={setScheduledFor}
                    onSubmit={handleSubmitCard} isSubmitting={isSubmitting} shareLink={shareLink}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center Canvas */}
          <div className="bg-[var(--background)] overflow-hidden relative border-r border-border p-8 flex items-center justify-center">
            <CardCanvas 
              format={selectedFormat}
              themeId={selectedThemeId}
              stage={currentStage}
              palette={palette}
              paperTexture={paperTexture}
              note={note}
              font={font}
              elements={elements}
              selectedElementId={selectedElementId}
              onElementMove={handleElementMove}
              onElementSelect={setSelectedElementId}
              onElementUpdate={handleElementUpdate}
              onElementDelete={handleElementDelete}
              revealStyle={currentStage === 'enhance' ? revealStyle : undefined}
            />
          </div>

          {/* Right Panel */}
          <div className="bg-white overflow-hidden relative">
            <AnimatePresence mode="wait">
              {currentStage === 'design' ? (
                <motion.div key="design" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <ThemeLibrary selectedThemeId={selectedThemeId} onSelect={handleThemeSelect} />
                </motion.div>
              ) : (
                <motion.div key="blank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 text-center text-muted-foreground opacity-50">
                  <p>Right panel tools not needed for {currentStage} stage.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Floating Next Button */}
            {canProceed && currentStage !== 'preview' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 right-8 z-50"
              >
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--charcoal)] text-white rounded-full font-bold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
                >
                  Next Step <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden flex-col flex-1 min-h-0 relative">
          {/* Top Half: Canvas */}
          <div className="h-[45vh] shrink-0 border-b border-border bg-[var(--background)] p-4 relative z-10 shadow-sm">
            <CardCanvas 
              format={selectedFormat}
              themeId={selectedThemeId}
              stage={currentStage}
              palette={palette}
              paperTexture={paperTexture}
              note={note}
              font={font}
              elements={elements}
              selectedElementId={selectedElementId}
              onElementMove={handleElementMove}
              onElementSelect={setSelectedElementId}
              onElementUpdate={handleElementUpdate}
              onElementDelete={handleElementDelete}
              revealStyle={currentStage === 'enhance' ? revealStyle : undefined}
            />
            {canProceed && currentStage !== 'preview' && (
              <motion.button
                onClick={handleNext}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-4 right-4 z-50 w-12 h-12 bg-[var(--charcoal)] text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <ArrowRight size={20} />
              </motion.button>
            )}
          </div>
          
          {/* Bottom Half: Controls */}
          <div className="flex-1 flex flex-col min-h-0 bg-white">
            {currentStage === 'design' && (
              <>
                <div className="flex border-b border-border shrink-0 bg-white/95 backdrop-blur-sm z-20 shadow-sm relative">
                  <button 
                    onClick={() => setMobileTab('format')}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${mobileTab === 'format' ? 'text-[var(--charcoal)]' : 'text-muted-foreground'}`}
                  >
                    1. Format
                    {mobileTab === 'format' && <motion.div layoutId="mobile-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--rose)]" />}
                  </button>
                  <div className="w-px bg-border/50 my-3" />
                  <button 
                    onClick={() => setMobileTab('theme')}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${mobileTab === 'theme' ? 'text-[var(--charcoal)]' : 'text-muted-foreground'}`}
                  >
                    2. Theme
                    {mobileTab === 'theme' && <motion.div layoutId="mobile-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--rose)]" />}
                  </button>
                </div>
                
                <div className="flex-1 relative overflow-hidden pb-16">
                  <AnimatePresence mode="wait">
                    {mobileTab === 'format' ? (
                      <motion.div key="format" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                        <CardFormatPicker selectedFormatId={selectedFormat} onSelect={handleFormatSelect} />
                      </motion.div>
                    ) : (
                      <motion.div key="theme" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                        <ThemeLibrary selectedThemeId={selectedThemeId} onSelect={handleThemeSelect} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {currentStage === 'write' && (
              <div className="flex-1 relative overflow-hidden pb-16">
                <CardWriteControls note={note} setNote={setNote} font={font} setFont={setFont} formatId={selectedFormat} occasion={occasion} />
              </div>
            )}

            {currentStage === 'personalize' && (
              <div className="flex-1 relative overflow-hidden pb-16">
                <CardPersonalizeControls 
                  elements={elements} onAddElement={handleAddElement} 
                  onReorderElements={handleReorderElements} 
                  onSelectElement={setSelectedElementId} selectedElementId={selectedElementId} 
                  onUndo={undo} onRedo={redo}
                  canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1}
                />
              </div>
            )}

            {currentStage === 'enhance' && (
              <div className="flex-1 relative overflow-hidden pb-16">
                <CardEnhanceControls 
                  paperTexture={paperTexture} setPaperTexture={setPaperTexture}
                  palette={palette} setPalette={setPalette}
                  musicId={musicId} setMusicId={setMusicId}
                  revealStyle={revealStyle} setRevealStyle={setRevealStyle}
                  defaultThemePalette={defaultPalette}
                />
              </div>
            )}
            
            {currentStage === 'preview' && (
              <div className="flex-1 relative overflow-hidden pb-16">
                <CardPreviewControls
                  senderName={senderName} setSenderName={setSenderName}
                  recipientName={recipientName} setRecipientName={setRecipientName}
                  scheduledFor={scheduledFor} setScheduledFor={setScheduledFor}
                  onSubmit={handleSubmitCard} isSubmitting={isSubmitting} shareLink={shareLink}
                />
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
