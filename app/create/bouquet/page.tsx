'use client';

import { useState, useEffect, useRef } from 'react';
import { StudioStage, STUDIO_STAGES } from '@/types/studio';
import { FlowerAsset } from '@prisma/client';
import { TopProgress } from '@/components/bouquet/TopProgress';
import { FlowerLibrary } from '@/components/bouquet/FlowerLibrary';
import { BouquetCanvas } from '@/components/bouquet/BouquetCanvas';
import { ContextualControls } from '@/components/bouquet/ContextualControls';
import { Header } from '@/components/layout/Header';

export default function BouquetStudio() {
  const [currentStage, setCurrentStage] = useState<StudioStage>('arrange');
  const [highestStage, setHighestStage] = useState<StudioStage>('arrange');
  const [flowers, setFlowers] = useState<FlowerAsset[]>([]);
  const [isLoadingFlowers, setIsLoadingFlowers] = useState(true);
  const [selectedFlower, setSelectedFlower] = useState<FlowerAsset | null>(null);

  // Phase 2: Write, Enhance, Preview State
  const [note, setNote] = useState('');
  const [font, setFont] = useState('font-serif');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  // Draft State
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const draftRef = useRef<NodeJS.Timeout | null>(null);

  // Load Draft Check
  useEffect(() => {
    try {
      const draftStr = localStorage.getItem('draft_bouquet');
      if (draftStr) {
        const draft = JSON.parse(draftStr);
        if (draft.flowers && draft.flowers.length > 0) {
          setShowDraftBanner(true);
        }
      }
    } catch (e) {}
  }, []);



  const handleAutoArrange = () => {
    // Generate a beautiful surprise arrangement using the current library
    if (flowers.length === 0) return;
    pushToUndo(canvasFlowers);
    
    // Pick 5 to 10 random flowers
    const count = Math.floor(Math.random() * 6) + 5;
    const template = [];
    for (let i = 0; i < count; i++) {
      const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
      template.push({
        f: randomFlower,
        x: 10 + Math.random() * 80, // Random X between 10% and 90%
        y: 10 + Math.random() * 80, // Random Y between 10% and 90%
        s: 0.8 + Math.random() * 0.7, // Random Scale between 0.8 and 1.5
        r: Math.random() * 360, // Random Rotation
        z: i // Stacking order
      });
    }
    
    setCanvasFlowers(template.map((t, i) => ({
      id: Math.random().toString(36).substring(2, 9),
      asset: t.f!,
      x: t.x,
      y: t.y,
      scale: t.s,
      rotation: t.r,
      zIndex: t.z
    })));
  };

  const handleClearCanvas = () => {
    if (canvasFlowers.length === 0) return;
    pushToUndo(canvasFlowers);
    setCanvasFlowers([]);
    setSelectedCanvasFlowerId(null);
  };

  const handleForwardCanvas = (id: string) => {
    pushToUndo(canvasFlowers);
    setCanvasFlowers(prev => {
      const maxZ = Math.max(0, ...prev.map(f => f.zIndex));
      return prev.map(f => f.id === id ? { ...f, zIndex: maxZ + 1 } : f);
    });
  };

  // Phase 2 Canvas State
  const [canvasFlowers, setCanvasFlowers] = useState<import('@/types/studio').PlacedFlower[]>([]);
  const [undoStack, setUndoStack] = useState<import('@/types/studio').PlacedFlower[][]>([]);
  const [selectedCanvasFlowerId, setSelectedCanvasFlowerId] = useState<string | null>(null);

  const restoreDraft = () => {
    try {
      const draftStr = localStorage.getItem('draft_bouquet');
      if (draftStr) {
        const draft = JSON.parse(draftStr);
        if (draft.flowers) setCanvasFlowers(draft.flowers);
        if (draft.note) setNote(draft.note);
        if (draft.font) setFont(draft.font);
        if (draft.bgColor) setBgColor(draft.bgColor);
        if (draft.senderName) setSenderName(draft.senderName);
        if (draft.recipientName) setRecipientName(draft.recipientName);
      }
      setShowDraftBanner(false);
    } catch (e) {}
  };

  const dismissDraft = () => {
    try { localStorage.removeItem('draft_bouquet'); } catch (e) {}
    setShowDraftBanner(false);
  };

  // Auto-save Draft
  useEffect(() => {
    if (currentStage === 'preview') return; // Don't save if on preview
    if (canvasFlowers.length === 0 && note === '') return;
    
    if (draftRef.current) clearTimeout(draftRef.current);
    draftRef.current = setTimeout(() => {
      try {
        const payload = { flowers: canvasFlowers, note, font, bgColor, senderName, recipientName };
        localStorage.setItem('draft_bouquet', JSON.stringify(payload));
      } catch (err) {}
    }, 1500);
    
    return () => { if (draftRef.current) clearTimeout(draftRef.current); };
  }, [canvasFlowers, note, font, bgColor, senderName, recipientName, currentStage]);

  const handleSubmitBouquet = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bouquets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowers: canvasFlowers.map(f => ({
            id: f.asset.id,
            x: f.x, y: f.y, scale: f.scale, rotation: f.rotation, zIndex: f.zIndex
          })),
          note, font, bgColor, senderName, recipientName
        })
      });
      if (res.ok) {
        const data = await res.json();
        setShareLink(`${window.location.origin}/b/${data.slug}?preview=true`);
        // Clear draft on success
        try { localStorage.removeItem('draft_bouquet'); } catch(e) {}
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

  const pushToUndo = (newState: import('@/types/studio').PlacedFlower[]) => {
    setUndoStack(prev => {
      const nextStack = [...prev, canvasFlowers];
      if (nextStack.length > 20) return nextStack.slice(nextStack.length - 20);
      return nextStack;
    });
  };

  const handleUndo = () => {
    setUndoStack(prev => {
      if (prev.length === 0) return prev;
      const stack = [...prev];
      const previousState = stack.pop();
      if (previousState) setCanvasFlowers(previousState);
      return stack;
    });
    setSelectedCanvasFlowerId(null);
  };

  const addFlowerToCanvas = (asset: FlowerAsset) => {
    if (canvasFlowers.length >= 15) {
      alert("Your bouquet is getting quite full! Try arranging what you have before adding more.");
      return;
    }
    pushToUndo(canvasFlowers);
    const maxZ = Math.max(0, ...canvasFlowers.map(f => f.zIndex));
    const newFlower: import('@/types/studio').PlacedFlower = {
      id: Math.random().toString(36).substring(2, 9),
      asset,
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
      scale: 1,
      rotation: Math.random() * 20 - 10,
      zIndex: maxZ + 1
    };
    setCanvasFlowers([...canvasFlowers, newFlower]);
    setSelectedCanvasFlowerId(newFlower.id);
  };

  const updateCanvasFlower = (id: string, updates: Partial<import('@/types/studio').PlacedFlower>) => {
    pushToUndo(canvasFlowers);
    setCanvasFlowers(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeCanvasFlower = (id: string) => {
    pushToUndo(canvasFlowers);
    setCanvasFlowers(prev => prev.filter(f => f.id !== id));
    if (selectedCanvasFlowerId === id) setSelectedCanvasFlowerId(null);
  };

  const handleReorderCanvasFlowers = (newOrder: import('@/types/studio').PlacedFlower[]) => {
    pushToUndo(canvasFlowers);
    // Reverse z-index: index 0 (top of list) gets highest z-index, index N gets 0
    // Wait, let's just use the index if rendering order matters, but here zIndex is used.
    // So index 0 is top of the list in UI, which means highest zIndex.
    setCanvasFlowers(newOrder.map((f, i) => ({ ...f, zIndex: newOrder.length - i })));
  };

  useEffect(() => {
    async function fetchFlowers() {
      try {
        const res = await fetch('/api/flowers');
        if (res.ok) {
          const data = await res.json();
          setFlowers(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingFlowers(false);
      }
    }
    fetchFlowers();
  }, []);

  const handleNavigate = (stage: StudioStage) => {
    setCurrentStage(stage);
  };

  const handleNext = () => {
    const stages: StudioStage[] = ['arrange', 'write', 'enhance', 'preview'];
    const idx = stages.indexOf(currentStage);
    if (idx < stages.length - 1) {
      const nextStage = stages[idx + 1];
      setCurrentStage(nextStage);
      setHighestStage(prev => {
        const prevIdx = stages.indexOf(prev);
        return prevIdx > idx + 1 ? prev : nextStage;
      });
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--background)]">
      <Header />
      
      {showDraftBanner && (
        <div className="bg-[var(--rose)]/10 px-4 py-3 text-sm text-[var(--charcoal)] flex justify-center items-center gap-4 border-b border-[var(--rose)]/20 shadow-sm">
          <span>You have an unsaved draft from a previous session.</span>
          <div className="flex gap-4">
            <button onClick={restoreDraft} className="font-semibold text-[var(--rose)] hover:text-[var(--rose-deep)] transition-colors underline">Restore Draft</button>
            <button onClick={dismissDraft} className="font-semibold text-[var(--stone)] hover:text-[var(--charcoal)] transition-colors underline">Dismiss</button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-h-0 relative">
          <TopProgress 
            stages={STUDIO_STAGES}
            currentStage={currentStage} 
            highestStage={highestStage}
            onNavigate={handleNavigate} 
          />

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-[30%_1fr_30%] flex-1 min-h-0">
          <FlowerLibrary 
            flowers={flowers} 
            isLoading={isLoadingFlowers} 
            onSelectFlower={(asset) => {
              setSelectedFlower(asset);
              addFlowerToCanvas(asset);
            }} 
          />
          <BouquetCanvas 
            stage={currentStage}
            flowers={canvasFlowers}
            selectedId={selectedCanvasFlowerId}
            onSelect={setSelectedCanvasFlowerId}
            onUpdate={updateCanvasFlower}
            onRemove={removeCanvasFlower}
            onForward={handleForwardCanvas}
            onClear={handleClearCanvas}
            bgColor={bgColor}
            note={note}
            font={font}
            senderName={senderName}
          />
          <ContextualControls 
            stage={currentStage} 
            selectedFlower={selectedFlower} 
            onUndo={handleUndo}
            canUndo={undoStack.length > 0}
            onAutoArrange={handleAutoArrange}
            placedFlowers={canvasFlowers}
            onSelectPlacedFlower={setSelectedCanvasFlowerId}
            onReorderPlacedFlowers={handleReorderCanvasFlowers}
            note={note} setNote={setNote}
            font={font} setFont={setFont}
            bgColor={bgColor} setBgColor={setBgColor}
            senderName={senderName} setSenderName={setSenderName}
            recipientName={recipientName} setRecipientName={setRecipientName}
            onSubmit={handleSubmitBouquet}
            isSubmitting={isSubmitting}
            shareLink={shareLink}
          />
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden flex-1 min-h-0 overflow-y-auto hide-scrollbar">
          <div className="sticky top-0 z-40 bg-background pt-2 pb-4 px-4 h-[45vh]">
            <BouquetCanvas 
              flowers={canvasFlowers}
              selectedId={selectedCanvasFlowerId}
              onSelect={setSelectedCanvasFlowerId}
              onUpdate={updateCanvasFlower}
              onRemove={removeCanvasFlower}
            />
          </div>
          
          <div className="flex-1 bg-background z-30">
            {currentStage === 'arrange' ? (
              <FlowerLibrary 
                flowers={flowers} 
                isLoading={isLoadingFlowers} 
                onSelectFlower={(asset) => {
                  setSelectedFlower(asset);
                  addFlowerToCanvas(asset);
                }} 
              />
            ) : (
              <div className="p-4 pb-24">
                <ContextualControls 
                  stage={currentStage} 
                  selectedFlower={selectedFlower} 
                  onUndo={handleUndo}
                  canUndo={undoStack.length > 0}
                  onAutoArrange={handleAutoArrange}
                  placedFlowers={canvasFlowers}
                  onSelectPlacedFlower={setSelectedCanvasFlowerId}
                  onReorderPlacedFlowers={handleReorderCanvasFlowers}
                  note={note} setNote={setNote}
                  font={font} setFont={setFont}
                  bgColor={bgColor} setBgColor={setBgColor}
                  senderName={senderName} setSenderName={setSenderName}
                  recipientName={recipientName} setRecipientName={setRecipientName}
                  onSubmit={handleSubmitBouquet}
                  isSubmitting={isSubmitting}
                  shareLink={shareLink}
                />
              </div>
            )}
          </div>
        </div>

        {/* Floating Next Button */}
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-50">
           {currentStage !== 'preview' && (
             <button
               onClick={handleNext}
               className="bg-[var(--charcoal)] text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--charcoal)]"
             >
               Next Step →
             </button>
           )}
        </div>
      </main>
    </div>
  );
}
