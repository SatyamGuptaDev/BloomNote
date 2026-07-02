import { 
  FLOWER_TYPES, 
  MESSAGE_TEMPLATES, 
  BOUQUET_THEMES,
  FlowerType 
} from './constants'

export interface Occasion {
  slug: string;
  name: string;
  emoji: string;
  description: string;
}

export interface BouquetTheme {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  wrapStyle: string;
  ribbonColor: string;
  noteCardStyle: string;
  suggestedFlowers: string[];
  fontId: string;
  textColor: string;
}

export interface WrapStyle {
  id: string;
  name: string;
  description: string;
}

export interface RibbonColor {
  id: string;
  name: string;
  hex: string;
}

export interface NoteCardStyle {
  id: string;
  name: string;
  description: string;
}

export interface ThemeApplicationResult {
  bgColor: string;
  wrapStyle: string;
  ribbonColor: string;
  fontId: string;
  textColor: string;
  suggestedFlowers: string[];
  noteCardStyle: string;
}

export function getFlowersByOccasion(occasion: string): FlowerType[] {
  const filtered = FLOWER_TYPES.filter(flower => flower.occasions.includes(occasion));
  return filtered.length > 0 ? filtered : FLOWER_TYPES;
}

export function getTemplatesByOccasion(occasion: string): string[] {
  return MESSAGE_TEMPLATES[occasion] || MESSAGE_TEMPLATES['just-because'];
}

export function getThemeById(id: string): BouquetTheme | undefined {
  return BOUQUET_THEMES.find(theme => theme.id === id);
}

export function applyTheme(theme: BouquetTheme): ThemeApplicationResult {
  return {
    bgColor: theme.bgColor,
    wrapStyle: theme.wrapStyle,
    ribbonColor: theme.ribbonColor,
    fontId: theme.fontId,
    textColor: theme.textColor,
    suggestedFlowers: [...theme.suggestedFlowers],
    noteCardStyle: theme.noteCardStyle
  };
}
