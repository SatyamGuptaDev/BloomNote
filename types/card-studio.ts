export type CardFormatId = 'classic-fold' | 'postcard' | 'scroll-letter' | 'pop-up' | 'wax-sealed';

export type CardStage = 'design' | 'write' | 'personalize' | 'enhance' | 'preview';

export const CARD_STAGES: { id: CardStage; label: string }[] = [
  { id: 'design', label: 'Design' },
  { id: 'write', label: 'Write' },
  { id: 'personalize', label: 'Personalize' },
  { id: 'enhance', label: 'Enhance' },
  { id: 'preview', label: 'Preview & Send' },
];

export type ElementType = 'sticker' | 'photo' | 'signature' | 'text';

export interface PlacedElement {
  id: string; // unique instance ID on canvas
  type: ElementType;
  payload: string; // sticker id, photo URL, SVG path, or text content
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  rotation: number;
  zIndex: number;
  textOptions?: {
    color: string;
    fontFamily: string;
  };
}
