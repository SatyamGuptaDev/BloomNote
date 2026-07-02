'use client';

import { motion } from 'framer-motion';
import { FlowerAsset } from '@prisma/client';
import Image from 'next/image';

interface FlowerCardProps {
  flower: FlowerAsset;
  onClick: (flower: FlowerAsset) => void;
}

export function FlowerCard({ flower, onClick }: FlowerCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(flower)}
      className="group relative flex flex-col items-center p-3 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow h-44 w-full focus:outline-none focus:ring-2 focus:ring-[var(--rose)]"
    >
      <div className="relative w-full flex-1 mb-2 rounded-xl overflow-hidden bg-[var(--cream)]/50">
        <Image 
          src={flower.imagePath} 
          alt={flower.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>
      <div className="w-full text-center">
        <h4 className="text-sm font-semibold font-body text-foreground line-clamp-1">{flower.name}</h4>
      </div>
      
      {/* Meaning tooltip/reveal on hover */}
      {flower.meaningTag && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <p className="text-white text-xs text-center font-medium leading-relaxed text-balance">
            {flower.meaningTag}
          </p>
        </div>
      )}
    </motion.button>
  );
}

export function FlowerCardSkeleton() {
  return (
    <div className="flex flex-col items-center p-3 rounded-2xl bg-card border border-border h-44 w-full animate-pulse">
      <div className="w-full flex-1 mb-2 rounded-xl bg-muted" />
      <div className="w-20 h-4 bg-muted rounded" />
    </div>
  );
}
