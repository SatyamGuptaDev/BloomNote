export type StudioStage = 'arrange' | 'write' | 'enhance' | 'preview';

export const STUDIO_STAGES: { id: StudioStage; label: string }[] = [
  { id: 'arrange', label: 'Arrange' },
  { id: 'write', label: 'Write' },
  { id: 'enhance', label: 'Enhance' },
  { id: 'preview', label: 'Preview & Send' },
];

import { FlowerAsset } from '@prisma/client';

export interface PlacedFlower {
  id: string; // unique instance ID on canvas
  asset: FlowerAsset;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  rotation: number;
  zIndex: number;
}
