'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { AnimatedGradientText } from '@/components/magic/AnimatedGradientText';
import { Flower2, X, ZoomIn, ZoomOut, RotateCw, ArrowUp, Trash2 } from 'lucide-react';
import { PlacedFlower, StudioStage } from '@/types/studio';
import Image from 'next/image';
import { NoteCard } from '@/components/bouquet/NoteCard';

interface BouquetCanvasProps {
  flowers?: PlacedFlower[];
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  onUpdate?: (id: string, updates: Partial<PlacedFlower>) => void;
  onRemove?: (id: string) => void;
  onForward?: (id: string) => void;
  onClear?: () => void;
  readOnly?: boolean;
  stage?: StudioStage;
  bgColor?: string;
  note?: string;
  font?: string;
  senderName?: string;
}

export function BouquetCanvas({
  flowers = [],
  selectedId,
  onSelect,
  onUpdate,
  onRemove,
  onForward,
  onClear,
  readOnly = false,
  stage = 'arrange',
  bgColor = '#ffffff',
  note = '',
  font = 'font-serif',
  senderName = ''
}: BouquetCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center bg-[var(--cream)]/20 rounded-2xl border-2 border-dashed border-border p-4 sm:p-12 relative overflow-y-auto hide-scrollbar"
      onClick={() => !readOnly && onSelect && onSelect(null)}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-md aspect-[3/4] bg-white rounded-t-full rounded-b-[2rem] shadow-xl flex flex-col items-center justify-center p-8 relative overflow-hidden ring-1 ring-black/5 transition-colors duration-500"
        style={{ backgroundColor: stage !== 'arrange' ? bgColor : '#ffffff' }}
      >
        
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(247,231,228,0.3))] pointer-events-none" />
        
        {flowers.length === 0 ? (
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-[var(--blush)] flex items-center justify-center mb-6 text-[var(--rose)] shadow-sm">
              <Flower2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-2xl text-[var(--charcoal)] mb-3 text-center">
              <AnimatedGradientText>Canvas is Empty</AnimatedGradientText>
            </h3>
            <p className="text-muted-foreground text-center text-sm max-w-[250px] leading-relaxed">
              Select flowers from the library to begin crafting your digital bouquet.
            </p>
          </div>
        ) : (
          flowers.map((flower, idx) => (
            <DraggableFlower
              key={flower.id}
              flower={flower}
              isSelected={selectedId === flower.id}
              readOnly={readOnly || stage !== 'arrange'}
              containerRef={containerRef}
              onSelect={() => onSelect && onSelect(flower.id)}
              onUpdate={(updates) => onUpdate && onUpdate(flower.id, updates)}
              onDelete={() => onRemove && onRemove(flower.id)}
            />
          ))
        )}
      </div>

      {stage !== 'arrange' && (note || senderName) && (
        <div className="absolute z-20 -bottom-8 w-[90%] max-w-md sm:-bottom-12 pointer-events-none">
          <NoteCard 
            note={note}
            fromName={senderName}
            font={font}
            textColor="var(--charcoal)"
            delay={0}
          />
        </div>
      )}

      {stage === 'arrange' && !readOnly && (
        <div className="mt-8 flex items-center justify-center gap-3 w-full max-w-md">
          <button
            onClick={(e) => { e.stopPropagation(); if (selectedId && onForward) onForward(selectedId); }}
            disabled={!selectedId}
            className="flex-1 flex flex-col items-center justify-center py-3 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-100 transition-colors"
          >
            <ArrowUp size={18} className="mb-1" strokeWidth={2.5} />
            <span className="text-xs font-bold tracking-wider">FORWARD</span>
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); if (selectedId && onRemove) onRemove(selectedId); }}
            disabled={!selectedId}
            className="flex-1 flex flex-col items-center justify-center py-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-100 transition-colors"
          >
            <X size={18} className="mb-1" strokeWidth={2.5} />
            <span className="text-xs font-bold tracking-wider">REMOVE</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); if (onClear) onClear(); }}
            disabled={flowers.length === 0}
            className="flex-1 flex flex-col items-center justify-center py-3 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors"
          >
            <Trash2 size={18} className="mb-1" strokeWidth={2.5} />
            <span className="text-xs font-bold tracking-wider">CLEAR</span>
          </button>
        </div>
      )}
    </div>
  );
}

function DraggableFlower({
  flower,
  isSelected,
  readOnly,
  containerRef,
  onSelect,
  onUpdate,
  onDelete
}: {
  flower: PlacedFlower;
  isSelected: boolean;
  readOnly: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  onSelect: () => void;
  onUpdate: (updates: Partial<PlacedFlower>) => void;
  onDelete: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const prevPos = useRef({ x: flower.x, y: flower.y });

  // Local Transform State for 120fps smooth interactions
  const [localRotation, setLocalRotation] = useState<number | null>(null);
  const [localScale, setLocalScale] = useState<number | null>(null);
  const [startAngle, setStartAngle] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [startDist, setStartDist] = useState(0);
  const [startScale, setStartScale] = useState(0);

  const currentRotation = localRotation !== null ? localRotation : flower.rotation;
  const currentScale = localScale !== null ? localScale : flower.scale;

  // Reset drag transform synchronously during render when the new absolute position is received.
  // This completely eliminates the "pushing back" visual glitch caused by async React state updates.
  if (prevPos.current.x !== flower.x || prevPos.current.y !== flower.y) {
    dragX.set(0);
    dragY.set(0);
    prevPos.current = { x: flower.x, y: flower.y };
  }

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (!containerRef.current || !nodeRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const nodeRect = nodeRef.current.getBoundingClientRect();
    
    // Calculate exact center of the dragged node relative to the container
    // This perfectly accounts for all rotations and offsets since the bounding box center of a rotated element is its true center.
    const cx = nodeRect.left + nodeRect.width / 2 - containerRect.left;
    const cy = nodeRect.top + nodeRect.height / 2 - containerRect.top;
    
    const px = Math.max(0, Math.min(100, (cx / containerRect.width) * 100));
    const py = Math.max(0, Math.min(100, (cy / containerRect.height) * 100));
    
    onUpdate({ x: px, y: py });
  };

  // Rotation Handlers
  const handleRotateStart = (e: any, info: any) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(info.point.y - cy, info.point.x - cx) * (180 / Math.PI);
    setStartAngle(angle);
    setStartRotation(flower.rotation);
  };

  const handleRotatePan = (e: any, info: any) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(info.point.y - cy, info.point.x - cx) * (180 / Math.PI);
    let newRotation = (startRotation + (angle - startAngle)) % 360;
    if (newRotation < 0) newRotation += 360;
    setLocalRotation(newRotation);
  };

  const handleRotateEnd = () => {
    if (localRotation !== null) {
      onUpdate({ rotation: localRotation });
      setLocalRotation(null);
    }
  };

  // Resize Handlers
  const handleResizeStart = (e: any, info: any) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(info.point.x - cx, info.point.y - cy);
    setStartDist(dist);
    setStartScale(flower.scale);
  };

  const handleResizePan = (e: any, info: any) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const currentDist = Math.hypot(info.point.x - cx, info.point.y - cy);
    if (startDist === 0) return;
    const scaleFactor = currentDist / startDist;
    const newScale = Math.max(0.3, Math.min(3.0, startScale * scaleFactor));
    setLocalScale(newScale);
  };

  const handleResizeEnd = () => {
    if (localScale !== null) {
      onUpdate({ scale: localScale });
      setLocalScale(null);
    }
  };

  return (
    <motion.div
      ref={nodeRef}
      className={`absolute -translate-x-1/2 -translate-y-1/2 touch-none select-none ${!readOnly ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{
        left: `${flower.x}%`,
        top: `${flower.y}%`,
        zIndex: flower.zIndex,
        x: dragX,
        y: dragY
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: currentScale, rotate: currentRotation }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      drag={!readOnly}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        if (!readOnly) onSelect();
      }}
      whileDrag={{ scale: currentScale * 1.05 }}
    >
      <div className="relative">
        <div className="relative w-32 h-32 select-none pointer-events-none mix-blend-multiply">
          <Image 
            src={flower.asset.imagePath} 
            alt={flower.asset.name} 
            fill 
            className="object-contain"
            draggable={false}
          />
        </div>
        
        {isSelected && !readOnly && !isDragging && (
          <div className="absolute inset-0 border-[1.5px] border-[var(--rose)] -m-1 pointer-events-none z-10">
            
            {/* Top Rotation Handle */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
              <motion.div 
                className="w-7 h-7 bg-white border border-[var(--rose)] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-sm hover:bg-[var(--blush)]/20 transition-colors"
                onPanStart={handleRotateStart}
                onPan={handleRotatePan}
                onPanEnd={handleRotateEnd}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <RotateCw size={14} className="text-[var(--rose)]" />
              </motion.div>
              <div className="w-px h-3 bg-[var(--rose)]" />
            </div>
            
            {/* Corner Resize Handles */}
            {[
              { top: '-5px', left: '-5px', cursor: 'nwse-resize' },
              { top: '-5px', right: '-5px', cursor: 'nesw-resize' },
              { bottom: '-5px', left: '-5px', cursor: 'nesw-resize' },
              { bottom: '-5px', right: '-5px', cursor: 'nwse-resize' },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white border-[1.5px] border-[var(--rose)] rounded-sm shadow-sm pointer-events-auto hover:scale-125 transition-transform"
                style={{ ...pos, cursor: pos.cursor }}
                onPanStart={handleResizeStart}
                onPan={handleResizePan}
                onPanEnd={handleResizeEnd}
                onPointerDown={(e) => e.stopPropagation()}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
