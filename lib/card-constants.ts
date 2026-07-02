export const CARD_FORMATS = [
  { 
    id: 'classic-fold', 
    name: 'Classic Fold', 
    description: 'A traditional card that opens outward to reveal the message inside.',
    defaultRevealStyle: 'fold-open'
  },
  { 
    id: 'postcard', 
    name: 'Postcard', 
    description: 'Flat, single surface with the image on one face and message on the other.',
    defaultRevealStyle: 'flip'
  },
  { 
    id: 'scroll-letter', 
    name: 'Scroll Letter', 
    description: 'A tall unfurl-downward animation. Best for longer, heartfelt writing.',
    defaultRevealStyle: 'unfurl'
  },
  { 
    id: 'pop-up', 
    name: 'Pop-Up Card', 
    description: 'Layered elements spring forward in 3D-ish depth when opened.',
    defaultRevealStyle: 'pop-up'
  },
  { 
    id: 'wax-sealed', 
    name: 'Wax-Sealed Envelope', 
    description: 'A sealed envelope that cracks open before the card slides out.',
    defaultRevealStyle: 'seal-crack'
  }
];

export const CARD_THEMES = [
  {
    id: 'botanical-line-art',
    name: 'Botanical Line Art',
    category: 'Botanical',
    description: 'Minimal ink illustrations',
    defaultPalette: { bg: '#FAF3EC', text: '#2B2522', accent: '#B7C7AE' },
    defaultPaper: 'linen',
    defaultFont: 'font-serif'
  },
  {
    id: 'watercolor-bloom',
    name: 'Watercolor Bloom',
    category: 'Floral',
    description: 'Soft, painted watercolor blooms',
    defaultPalette: { bg: '#F7E7E4', text: '#9E4E63', accent: '#C16E7E' },
    defaultPaper: 'deckle',
    defaultFont: 'font-dancing'
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'Abstract',
    description: 'Smooth, vibrant abstract gradients',
    defaultPalette: { bg: '#E7E3F2', text: '#2B2522', accent: '#B7A0C9' },
    defaultPaper: 'glossy',
    defaultFont: 'font-sans'
  },
  {
    id: 'minimalist-typography',
    name: 'Minimalist Typography',
    category: 'Modern',
    description: 'A big, quote-forward cover with minimal imagery',
    defaultPalette: { bg: '#ffffff', text: '#2B2522', accent: '#897F7A' },
    defaultPaper: 'matte',
    defaultFont: 'font-serif'
  },
  {
    id: 'playful-doodle',
    name: 'Playful / Doodle',
    category: 'Fun',
    description: 'For birthdays, kids, and lighter occasions',
    defaultPalette: { bg: '#FFF9D2', text: '#D9A05B', accent: '#F2C94C' },
    defaultPaper: 'matte',
    defaultFont: 'font-comic' // We will add a playful font if needed, or stick to font-sans
  },
  {
    id: 'festival-culture',
    name: 'Festival & Culture',
    category: 'Cultural',
    description: 'Diwali, Raksha Bandhan, Holi, Eid, and regional New Year',
    defaultPalette: { bg: '#FFF5F0', text: '#C7511F', accent: '#E8A317' },
    defaultPaper: 'linen',
    defaultFont: 'font-serif'
  },
  {
    id: 'your-own-photo',
    name: 'Your Own Photo',
    category: 'Custom',
    description: 'Upload your own image as the cover background',
    defaultPalette: { bg: '#FAF3EC', text: '#2B2522', accent: '#C16E7E' },
    defaultPaper: 'matte',
    defaultFont: 'font-serif'
  }
];

export const PAPER_TEXTURES = [
  { id: 'matte', name: 'Matte', className: '' },
  { id: 'linen', name: 'Linen', className: 'bg-[url(/textures/linen.png)] mix-blend-multiply opacity-50' },
  { id: 'kraft', name: 'Kraft Paper', className: 'bg-[url(/textures/kraft.jpg)] mix-blend-multiply opacity-80' },
  { id: 'glossy', name: 'Glossy', className: 'bg-gradient-to-tr from-white/10 to-white/60 mix-blend-overlay' },
  { id: 'deckle', name: 'Deckle-edge', className: 'border-8 border-transparent' } // Placeholder for custom border
];

export const REVEAL_STYLES = [
  { id: 'fold-open', name: 'Fold Open' },
  { id: 'flip', name: 'Flip' },
  { id: 'unfurl', name: 'Unfurl' },
  { id: 'pop-up', name: 'Pop-Up' },
  { id: 'seal-crack', name: 'Seal Crack' }
];

export const TONE_OPTIONS = [
  { id: 'heartfelt', name: 'Heartfelt', emoji: '❤️' },
  { id: 'playful', name: 'Playful', emoji: '🎉' },
  { id: 'poetic', name: 'Poetic', emoji: '✨' },
  { id: 'formal', name: 'Formal', emoji: '🎩' },
  { id: 'apologetic', name: 'Apologetic', emoji: '🙏' },
  { id: 'festive', name: 'Festive', emoji: '🎇' }
];
