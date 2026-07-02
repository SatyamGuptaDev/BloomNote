'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { X, Scaling, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CanvasFlower {
  id: string;
  type: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  scale: number;
  rotation: number;
  zIndex: number;
}

interface CanvasProps {
  flowers: CanvasFlower[];
  backgroundColor: string;
  onFlowerMove?: (id: string, x: number, y: number) => void;
  onFlowerSelect?: (id: string) => void;
  onFlowerDelete?: (id: string) => void;
  onFlowerUpdate?: (id: string, updates: Partial<CanvasFlower>) => void;
  selectedId?: string | null;
  readOnly?: boolean;
}

export function Canvas({
  flowers = [],
  backgroundColor,
  onFlowerMove,
  onFlowerSelect,
  onFlowerDelete,
  onFlowerUpdate,
  selectedId,
  readOnly = false
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden transition-colors duration-500 ease-in-out"
      style={{ backgroundColor }}
      onClick={() => {
        if (!readOnly && onFlowerSelect) onFlowerSelect('');
      }}
    >
      {flowers.length === 0 && !readOnly && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-[var(--stone)] font-serif text-lg animate-pulse">Tap flowers below to start</p>
        </div>
      )}

      {flowers.map((flower, index) => (
        <FlowerDraggable 
          key={flower.id || `flower-${index}`}
          flower={flower}
          isSelected={selectedId === flower.id}
          readOnly={readOnly}
          containerRef={containerRef}
          onSelect={() => onFlowerSelect && onFlowerSelect(flower.id)}
          onMove={(x, y) => onFlowerMove && onFlowerMove(flower.id, x, y)}
          onUpdate={(updates) => onFlowerUpdate && onFlowerUpdate(flower.id, updates)}
          onDelete={() => onFlowerDelete && onFlowerDelete(flower.id)}
          index={index}
        />
      ))}
    </div>
  );
}

function FlowerDraggable({ 
  flower, 
  isSelected, 
  readOnly, 
  containerRef,
  onSelect,
  onMove,
  onUpdate,
  onDelete,
  index
}: {
  flower: CanvasFlower;
  isSelected: boolean;
  readOnly: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  onUpdate: (updates: Partial<CanvasFlower>) => void;
  onDelete: () => void;
  index: number;
}) {
  const [isDragging, setIsDragging] = useState(false);

  // We are storing position in percentages, but Framer Motion drag uses pixels
  // Best approach for responsive canvas: position with left/top %, but allow drag
  // to update those percentages on dragEnd.
  
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (!containerRef.current) return;
    
    // We get the final position of the element
    const rect = event.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Center point of flower
    const cx = rect.left - containerRect.left + rect.width / 2;
    const cy = rect.top - containerRect.top + rect.height / 2;
    
    // Convert back to percentages
    const px = Math.max(0, Math.min(100, (cx / containerRect.width) * 100));
    const py = Math.max(0, Math.min(100, (cy / containerRect.height) * 100));
    
    onMove(px, py);
  };

  return (
    <motion.div
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 touch-none",
        !readOnly && "cursor-grab active:cursor-grabbing",
      )}
      style={{
        left: `${flower.x}%`,
        top: `${flower.y}%`,
        zIndex: flower.zIndex,
      }}
      initial={readOnly ? { opacity: 0, scale: 0.3, y: 50 } : { opacity: 0, scale: 0 }}
      animate={readOnly ? { 
        opacity: 1, 
        scale: flower.scale, 
        y: 0,
        rotate: flower.rotation 
      } : { 
        opacity: 1, 
        scale: flower.scale,
        rotate: flower.rotation 
      }}
      transition={readOnly ? {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: index * 0.08
      } : {
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      drag={!readOnly}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        if (!readOnly) onSelect();
      }}
      whileDrag={{ scale: flower.scale * 1.05 }}
    >
      <div className={cn(
        "relative rounded-full transition-all",
        isSelected && !readOnly && "ring-2 ring-[var(--rose)] ring-offset-4 ring-offset-transparent"
      )}>
        <FlowerSVG type={flower.type} width={100} height={100} />
        
        {/* Controls */}
        {isSelected && !readOnly && !isDragging && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="absolute -top-3 -right-3 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-red-200"
              aria-label="Delete flower"
            >
              <X size={14} />
            </button>

            {/* Resize handle (simplified for MVP: just two buttons to scale up/down) */}
            <div className="absolute -bottom-4 -left-4 flex gap-1 bg-white rounded-full p-1 shadow-md z-10">
               <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onUpdate({ scale: Math.max(0.5, flower.scale - 0.2) }); 
                  }}
                  className="w-6 h-6 bg-[var(--cream)] rounded-full flex items-center justify-center text-[var(--charcoal)]"
               >
                 -
               </button>
               <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onUpdate({ scale: Math.min(2.0, flower.scale + 0.2) }); 
                  }}
                  className="w-6 h-6 bg-[var(--cream)] rounded-full flex items-center justify-center text-[var(--charcoal)]"
               >
                 +
               </button>
            </div>

            {/* Rotate handle */}
            <div className="absolute -top-4 -left-4 flex gap-1 bg-white rounded-full p-1 shadow-md z-10">
               <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onUpdate({ rotation: (flower.rotation - 15) % 360 }); 
                  }}
                  className="w-6 h-6 bg-[var(--cream)] rounded-full flex items-center justify-center text-[var(--charcoal)]"
               >
                 <RotateCw size={12} className="-scale-x-100" />
               </button>
               <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onUpdate({ rotation: (flower.rotation + 15) % 360 }); 
                  }}
                  className="w-6 h-6 bg-[var(--cream)] rounded-full flex items-center justify-center text-[var(--charcoal)]"
               >
                 <RotateCw size={12} />
               </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
