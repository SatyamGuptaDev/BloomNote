'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlacedElement } from '@/types/card-studio';

interface DraggableElementProps {
  element: PlacedElement;
  isSelected: boolean;
  readOnly: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  onUpdate: (updates: Partial<PlacedElement>) => void;
  onDelete: () => void;
  index: number;
}

export function DraggableElement({
  element,
  isSelected,
  readOnly,
  containerRef,
  onSelect,
  onMove,
  onUpdate,
  onDelete,
  index
}: DraggableElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (!containerRef.current) return;
    
    const dx = info.offset.x;
    const dy = info.offset.y;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Convert pixel offset to percentage
    const dpx = (dx / containerRect.width) * 100;
    const dpy = (dy / containerRect.height) * 100;
    
    const newX = Math.max(0, Math.min(100, element.x + dpx));
    const newY = Math.max(0, Math.min(100, element.y + dpy));
    
    onMove(newX, newY);
    
    // Reset motion values instantly so it relies purely on the new left/top %
    x.set(0);
    y.set(0);
  };

  const handleRotateStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsInteracting(true);
    if (!elementRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cx = containerRect.left + (element.x / 100) * containerRect.width + x.get();
    const cy = containerRect.top + (element.y / 100) * containerRect.height + y.get();

    const onMove = (me: PointerEvent) => {
       const angle = Math.atan2(me.clientY - cy, me.clientX - cx) * (180 / Math.PI);
       // The handle is at the top (-90 degrees), so offset by +90
       onUpdate({ rotation: angle + 90 });
    };
    const onUp = () => {
       setIsInteracting(false);
       window.removeEventListener('pointermove', onMove);
       window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const handleScaleStart = (e: React.PointerEvent, corner: 'tl' | 'tr' | 'bl' | 'br') => {
    e.stopPropagation();
    setIsInteracting(true);
    if (!elementRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cx = containerRect.left + (element.x / 100) * containerRect.width + x.get();
    const cy = containerRect.top + (element.y / 100) * containerRect.height + y.get();
    const startDist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const startScale = element.scale;

    const onMove = (me: PointerEvent) => {
       const dist = Math.hypot(me.clientX - cx, me.clientY - cy);
       const ratio = dist / startDist;
       const newScale = Math.max(0.2, Math.min(5.0, startScale * ratio));
       onUpdate({ scale: newScale });
    };
    const onUp = () => {
       setIsInteracting(false);
       window.removeEventListener('pointermove', onMove);
       window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const renderContent = () => {
    switch (element.type) {
      case 'sticker':
        return (
          <div className="text-4xl filter drop-shadow-sm pointer-events-auto select-none whitespace-nowrap">
            {element.payload}
          </div>
        );
      case 'text':
        return (
          <div 
            className={cn("text-xl filter drop-shadow-sm pointer-events-auto select-none whitespace-pre-wrap break-words w-max max-w-[280px] text-center leading-relaxed", element.textOptions?.fontFamily)}
            style={{ color: element.textOptions?.color || 'var(--charcoal)' }}
          >
            {element.payload}
          </div>
        );
      case 'photo':
        return (
          <div className="bg-white p-2 pb-6 shadow-md pointer-events-auto select-none relative">
            <div className="relative w-24 h-24 overflow-hidden border border-black/5 bg-gray-100">
              <img src={element.payload} alt="Photo" className="w-full h-full object-cover pointer-events-none" draggable={false} />
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/40 backdrop-blur-md rotate-[-3deg] shadow-sm pointer-events-none" />
          </div>
        );
      case 'signature':
        return (
          <div className="pointer-events-auto select-none">
            <svg viewBox="0 0 300 150" className="w-32 h-auto text-[var(--charcoal)] drop-shadow-sm overflow-visible pointer-events-none">
              <path
                d={element.payload}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const isMainNote = element.id === 'main-note';

  return (
    <motion.div
      ref={elementRef}
      className={cn(
        "absolute touch-none",
        !readOnly && !isMainNote && "cursor-grab active:cursor-grabbing",
      )}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        x,
        y,
        originX: 0,
        originY: 0,
        zIndex: (isSelected && !readOnly) ? 9999 : element.zIndex,
      }}
      initial={readOnly ? { opacity: 0, scale: 0.8, y: 20 } : { opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={readOnly ? {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: index * 0.1
      } : {
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      drag={!readOnly && !isInteracting && !isMainNote}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        if (!readOnly) onSelect();
      }}
    >
      <motion.div 
        style={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: element.rotation, scale: element.scale }}
        className="relative pointer-events-auto"
      >
        {renderContent()}
        
        {/* Professional Bounding Box Controls */}
        {isSelected && !readOnly && !isDragging && (
          <div className="absolute inset-0 pointer-events-none" style={{ margin: '-4px' }}>
            {/* Outline */}
            <div className="absolute inset-0 border-[1.5px] border-blue-500/80 pointer-events-none" />
            
            {/* Corner Scale Handles */}
            <div 
              onPointerDown={(e) => handleScaleStart(e, 'tl')}
              className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-[1.5px] border-blue-500 rounded-full pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform" 
            />
            <div 
              onPointerDown={(e) => handleScaleStart(e, 'tr')}
              className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-[1.5px] border-blue-500 rounded-full pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform" 
            />
            <div 
              onPointerDown={(e) => handleScaleStart(e, 'bl')}
              className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-[1.5px] border-blue-500 rounded-full pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform" 
            />
            <div 
              onPointerDown={(e) => handleScaleStart(e, 'br')}
              className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-[1.5px] border-blue-500 rounded-full pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform" 
            />

            {/* Rotation Handle (Stem) */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div 
                onPointerDown={handleRotateStart}
                className="w-4 h-4 bg-white border-[1.5px] border-blue-500 rounded-full pointer-events-auto cursor-crosshair hover:scale-110 transition-transform flex items-center justify-center shadow-sm"
              >
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
              </div>
              <div className="w-px h-3 bg-blue-500/80 mt-0.5" />
            </div>

            {/* Delete Button */}
            {!isMainNote && (
              <div className="absolute -top-10 -right-4 pointer-events-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  className="w-7 h-7 bg-white text-red-500 border border-border rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                  aria-label="Delete element"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
