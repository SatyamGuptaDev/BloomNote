'use client';

import { useState } from 'react';
import { BlurFade } from '@/components/magic/BlurFade';
import { SignaturePad } from './SignaturePad';
import { PlacedElement } from '@/types/card-studio';
import { ImagePlus, Type as TypeIcon, PenTool, Sticker, Undo2, Redo2 } from 'lucide-react';
import { Reorder } from 'framer-motion';

const STICKERS = [
  { id: 'stk-heart', emoji: '❤️' },
  { id: 'stk-sparkles', emoji: '✨' },
  { id: 'stk-star', emoji: '⭐' },
  { id: 'stk-kiss', emoji: '💋' },
  { id: 'stk-cake', emoji: '🎂' },
  { id: 'stk-flower', emoji: '🌸' },
  { id: 'stk-diya', emoji: '🪔' },
  { id: 'stk-om', emoji: '🕉️' },
  { id: 'stk-rakhi', emoji: '🎀' },
];

const FONTS = [
  { id: 'font-serif', name: 'Serif' },
  { id: 'font-dancing', name: 'Script' },
  { id: 'font-sans', name: 'Sans' },
];

interface CardPersonalizeControlsProps {
  elements: PlacedElement[];
  onAddElement: (element: Omit<PlacedElement, 'id'>) => void;
  onReorderElements: (elements: PlacedElement[]) => void;
  onSelectElement: (id: string) => void;
  selectedElementId: string | null;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export function CardPersonalizeControls({
  elements,
  onAddElement,
  onReorderElements,
  onSelectElement,
  selectedElementId,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: CardPersonalizeControlsProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'stickers' | 'photo' | 'signature'>('text');

  // Text Tab State
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#2B2522');
  const [textFont, setTextFont] = useState('font-serif');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAddElement({
            type: 'photo',
            payload: event.target.result as string,
            x: 50,
            y: 50,
            scale: 1,
            rotation: (Math.random() - 0.5) * 20, // slight random rotation
            zIndex: elements.length + 1
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSignature = (svgPath: string) => {
    onAddElement({
      type: 'signature',
      payload: svgPath,
      x: 50,
      y: 80, // signatures usually go at the bottom
      scale: 1,
      rotation: 0,
      zIndex: elements.length + 1
    });
    // switch back to stickers so the pad resets
    setActiveTab('stickers');
  };

  const handleAddText = () => {
    if (!textInput.trim()) return;
    onAddElement({
      type: 'text',
      payload: textInput.trim(),
      x: 50,
      y: 50,
      scale: 1.5,
      rotation: 0,
      zIndex: elements.length + 1,
      textOptions: { color: textColor, fontFamily: textFont }
    });
    setTextInput('');
  };

  return (
    <div className="w-full h-full bg-background border-l border-border p-6 flex flex-col hide-scrollbar overflow-y-auto pb-24">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-heading text-xl text-[var(--charcoal)]">Personalize</h3>
          <p className="text-sm text-muted-foreground mt-1">Add text layers, stickers, and photos.</p>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={onUndo} 
            disabled={!canUndo}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </button>
          <button 
            onClick={onRedo} 
            disabled={!canRedo}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={18} />
          </button>
        </div>
      </div>

      <BlurFade delay={0.1} yOffset={10} className="mt-4">
        <div className="flex border-b border-border mb-6">
          <button 
            onClick={() => setActiveTab('text')}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'text' ? 'text-[var(--charcoal)] border-b-2 border-[var(--rose)]' : 'text-muted-foreground'}`}
          >
            <TypeIcon size={16} className="mx-auto mb-1" />
            Text
          </button>
          <button 
            onClick={() => setActiveTab('stickers')}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'stickers' ? 'text-[var(--charcoal)] border-b-2 border-[var(--rose)]' : 'text-muted-foreground'}`}
          >
            <Sticker size={16} className="mx-auto mb-1" />
            Stickers
          </button>
          <button 
            onClick={() => setActiveTab('photo')}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'photo' ? 'text-[var(--charcoal)] border-b-2 border-[var(--rose)]' : 'text-muted-foreground'}`}
          >
            <ImagePlus size={16} className="mx-auto mb-1" />
            Photo
          </button>
          <button 
            onClick={() => setActiveTab('signature')}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'signature' ? 'text-[var(--charcoal)] border-b-2 border-[var(--rose)]' : 'text-muted-foreground'}`}
          >
            <PenTool size={16} className="mx-auto mb-1" />
            Sign
          </button>
        </div>

        {activeTab === 'text' && (
          <div className="space-y-4 mb-8">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter your custom text..."
              className="w-full h-24 p-3 rounded-xl border border-border text-sm resize-none focus:ring-2 focus:ring-[var(--rose)] focus:outline-none"
            />
            <div className="flex gap-2">
              <input 
                type="color" 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 p-1 rounded-lg border border-border bg-white cursor-pointer"
              />
              <div className="flex-1 grid grid-cols-3 gap-2">
                {FONTS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setTextFont(f.id)}
                    className={`text-xs p-2 rounded-lg border transition-colors ${textFont === f.id ? 'border-[var(--rose)] bg-[var(--rose)]/5' : 'border-border bg-white'}`}
                  >
                    <span className={f.id}>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddText}
              disabled={!textInput.trim()}
              className="w-full py-2 bg-[var(--charcoal)] text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
            >
              Add Text Layer
            </button>
          </div>
        )}

        {activeTab === 'stickers' && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {STICKERS.map(s => (
              <button
                key={s.id}
                onClick={() => onAddElement({
                  type: 'sticker',
                  payload: s.emoji,
                  x: 50,
                  y: 50,
                  scale: 1.5,
                  rotation: 0,
                  zIndex: elements.length + 1
                })}
                className="h-16 rounded-xl border border-border bg-white text-3xl hover:bg-muted/50 transition-colors shadow-sm flex items-center justify-center"
              >
                {s.emoji}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'photo' && (
          <div className="mb-8 p-6 border-2 border-dashed border-border rounded-xl bg-white text-center">
            <input 
              type="file" 
              accept="image/*" 
              id="photo-upload" 
              className="hidden" 
              onChange={handlePhotoUpload}
            />
            <label 
              htmlFor="photo-upload"
              className="inline-flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--rose)]/10 text-[var(--rose-deep)] flex items-center justify-center mb-3">
                <ImagePlus size={20} />
              </div>
              <span className="text-sm font-medium text-[var(--charcoal)]">Upload a Photo</span>
              <span className="text-xs text-muted-foreground mt-1">JPEG, PNG up to 5MB</span>
            </label>
          </div>
        )}

        {activeTab === 'signature' && (
          <div className="mb-8">
            <SignaturePad onComplete={handleAddSignature} />
          </div>
        )}

        {/* Layers (Z-Index Reordering) */}
        {elements.length > 0 && (
          <div className="mt-8 pt-8 border-t border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--stone)] mb-3">Layers</h4>
            <Reorder.Group 
              axis="y" 
              values={elements} 
              onReorder={onReorderElements}
              className="space-y-2"
            >
              {elements.map((el) => (
                <Reorder.Item
                  key={el.id}
                  value={el}
                  className={`p-3 rounded-lg border bg-white flex items-center justify-between cursor-grab active:cursor-grabbing ${selectedElementId === el.id ? 'border-[var(--rose)] shadow-sm' : 'border-border'}`}
                  onClick={() => onSelectElement(el.id)}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xl shrink-0">
                      {el.type === 'sticker' ? el.payload : el.type === 'photo' ? '📸' : el.type === 'text' ? 'T' : '✍️'}
                    </span>
                    <span className="text-sm font-medium capitalize text-[var(--charcoal)] truncate">
                      {el.type === 'text' ? el.payload : el.type}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono shrink-0">z: {el.zIndex}</span>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <p className="text-[10px] text-muted-foreground text-center mt-3">Drag to reorder layers (top = front)</p>
          </div>
        )}
      </BlurFade>
    </div>
  );
}
