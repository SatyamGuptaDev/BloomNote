'use client';

import { useState, useRef } from 'react';
import { Trash2, Check } from 'lucide-react';

interface SignaturePadProps {
  onComplete: (svgPath: string) => void;
  onCancel?: () => void;
}

export function SignaturePad({ onComplete, onCancel }: SignaturePadProps) {
  const [points, setPoints] = useState<number[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true);
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setPoints([[e.clientX - rect.left, e.clientY - rect.top, e.pressure || 0.5]]);
    
    // Capture pointer to track outside if needed
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setPoints((pts) => [
      ...pts,
      [e.clientX - rect.left, e.clientY - rect.top, e.pressure || 0.5]
    ]);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDrawing(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const clear = () => setPoints([]);

  // Generate perfect-freehand stroke
  // perfect-freehand generates an array of points for a polygon.
  // We need to convert it to an SVG path string.
  // Note: For simplicity in this demo, if perfect-freehand isn't installed, 
  // we could just generate a simple polyline, but the prompt implies a real SVG path.
  // We will build a simple SVG path from the points.
  
  const getSvgPathFromStroke = (stroke: number[][]) => {
    if (!stroke.length) return "";
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );
    d.push("Z");
    return d.join(" ");
  };

  const generatePath = () => {
    if (points.length === 0) return "";
    
    // Simple polyline path
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    return path;
  };

  const handleDone = () => {
    const path = generatePath();
    if (path) {
      onComplete(path);
      setPoints([]);
    }
  };

  const strokePath = generatePath();

  return (
    <div className="flex flex-col gap-3">
      <div 
        ref={containerRef}
        className="relative w-full h-40 bg-[var(--cream)] rounded-xl border-2 border-dashed border-border overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {strokePath && (
            <path
              d={strokePath}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--charcoal)]"
            />
          )}
        </svg>
        
        {points.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[var(--stone)] pointer-events-none opacity-50">
            Sign here
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={clear}
          disabled={points.length === 0}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground disabled:opacity-40 hover:text-[var(--charcoal)] transition-colors"
        >
          <Trash2 size={16} /> Clear
        </button>
        
        <div className="flex gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleDone}
            disabled={points.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--charcoal)] text-white hover:bg-[var(--stone)] disabled:opacity-50 transition-colors"
          >
            <Check size={16} /> Add to Card
          </button>
        </div>
      </div>
    </div>
  );
}
