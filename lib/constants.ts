export interface FlowerType {
  id: string;
  name: string;
  category: string;
  emoji: string;
  occasions: string[];
}

export const FLOWER_TYPES: FlowerType[] = [
  { id: 'rose-red', name: 'Red Rose', category: 'Roses', emoji: '🌹', occasions: ['anniversary', 'love', 'just-because'] },
  { id: 'rose-pink', name: 'Pink Rose', category: 'Roses', emoji: '🌸', occasions: ['mothers-day', 'thank-you', 'friendship', 'just-because'] },
  { id: 'rose-white', name: 'White Rose', category: 'Roses', emoji: '🤍', occasions: ['apology', 'anniversary', 'congratulations'] },
  { id: 'rose-yellow', name: 'Yellow Rose', category: 'Roses', emoji: '💛', occasions: ['friendship', 'get-well', 'birthday'] },
  { id: 'tulip-pink', name: 'Pink Tulip', category: 'Tulips', emoji: '🌷', occasions: ['mothers-day', 'thank-you', 'love'] },
  { id: 'tulip-purple', name: 'Purple Tulip', category: 'Tulips', emoji: '💜', occasions: ['anniversary', 'congratulations'] },
  { id: 'tulip-yellow', name: 'Yellow Tulip', category: 'Tulips', emoji: '🌻', occasions: ['birthday', 'get-well', 'friendship'] },
  { id: 'tulip-white', name: 'White Tulip', category: 'Tulips', emoji: '🤍', occasions: ['apology', 'just-because'] },
  { id: 'sunflower', name: 'Sunflower', category: 'Wild', emoji: '🌻', occasions: ['get-well', 'birthday', 'friendship', 'just-because'] },
  { id: 'daisy', name: 'Daisy', category: 'Wild', emoji: '🌼', occasions: ['friendship', 'just-because', 'thank-you'] },
  { id: 'marigold', name: 'Marigold', category: 'Wild', emoji: '🏵️', occasions: ['congratulations', 'birthday'] },
  { id: 'poppy', name: 'Poppy', category: 'Wild', emoji: '🌺', occasions: ['love', 'just-because'] },
  { id: 'peony', name: 'Peony', category: 'Soft', emoji: '🌸', occasions: ['anniversary', 'love', 'mothers-day'] },
  { id: 'carnation', name: 'Carnation', category: 'Soft', emoji: '💮', occasions: ['mothers-day', 'thank-you', 'birthday'] },
  { id: 'cherry-blossom', name: 'Cherry Blossom', category: 'Soft', emoji: '🌸', occasions: ['love', 'just-because', 'apology'] },
  { id: 'hydrangea', name: 'Hydrangea', category: 'Soft', emoji: '🪻', occasions: ['thank-you', 'apology', 'anniversary'] },
  { id: 'orchid', name: 'Orchid', category: 'Exotic', emoji: '💮', occasions: ['congratulations', 'anniversary', 'mothers-day'] },
  { id: 'iris', name: 'Iris', category: 'Exotic', emoji: '🪻', occasions: ['thank-you', 'birthday', 'just-because'] },
  { id: 'lavender', name: 'Lavender', category: 'Exotic', emoji: '🌿', occasions: ['get-well', 'just-because', 'apology'] },
  { id: 'protea', name: 'Protea', category: 'Exotic', emoji: '🌺', occasions: ['congratulations', 'anniversary'] },
  { id: 'greenery', name: 'Greenery', category: 'Fillers', emoji: '🌿', occasions: ['just-because', 'friendship'] },
  { id: 'baby-breath', name: 'Baby\'s Breath', category: 'Fillers', emoji: '✨', occasions: ['love', 'anniversary', 'apology'] },
  { id: 'leaf-stem', name: 'Leaf Stem', category: 'Fillers', emoji: '🍃', occasions: ['just-because', 'thank-you'] }
];

export const OCCASIONS = [
  { slug: 'mothers-day', name: 'Mother\'s Day', emoji: '💐', description: 'Show mom some love' },
  { slug: 'birthday', name: 'Birthday', emoji: '🎂', description: 'Celebrate a special day' },
  { slug: 'anniversary', name: 'Anniversary', emoji: '🥂', description: 'Celebrate your love' },
  { slug: 'apology', name: 'Apology', emoji: '🙏', description: 'Say you are sorry' },
  { slug: 'just-because', name: 'Just Because', emoji: '✨', description: 'No reason needed' },
  { slug: 'love', name: 'Love', emoji: '❤️', description: 'Express your feelings' },
  { slug: 'thank-you', name: 'Thank You', emoji: '💌', description: 'Show your gratitude' },
  { slug: 'get-well', name: 'Get Well', emoji: '🩹', description: 'Wishing a fast recovery' },
  { slug: 'friendship', name: 'Friendship', emoji: '👯', description: 'For a great friend' },
  { slug: 'congratulations', name: 'Congratulations', emoji: '🎉', description: 'Celebrate a big win' }
];

export const MESSAGE_TEMPLATES: Record<string, string[]> = {
  "mothers-day": [
    "Happy Mother's Day to the best mom in the world!",
    "Thank you for everything you do. I love you!",
    "Wishing you a day as beautiful as you are.",
    "Mom, your love has been my guiding light. Thank you.",
    "Sending you a garden of love today. You deserve the world.",
    "To the woman who taught me how to bloom. I love you.",
    "Your endless patience and love mean everything to me.",
    "For all the little things you do, I appreciate you so much."
  ],
  "birthday": [
    "Wishing you the happiest of birthdays!",
    "Hope your special day brings you all that your heart desires!",
    "Here's to another year of wonderful adventures!",
    "May your birthday be filled with sunshine and smiles.",
    "Another trip around the sun! Celebrate big today.",
    "Sending you the biggest birthday hug and these bright blooms.",
    "Cheers to you! May this year bring you endless joy.",
    "Happy Birthday! I hope today is as amazing as you are."
  ],
  "anniversary": [
    "Happy Anniversary! Here's to many more years together.",
    "I love you more today than yesterday, but not as much as tomorrow.",
    "Thank you for being my everything.",
    "Every day with you feels like a beautiful dream.",
    "To my favorite person, happy anniversary.",
    "Growing together is my favorite adventure.",
    "You are my rock, my love, my everything.",
    "Celebrating us today and always."
  ],
  "apology": [
    "I am so sorry. Please forgive me.",
    "I messed up, and I want to make it right.",
    "I hope you can find it in your heart to forgive me.",
    "Sending these flowers as a small token of my sincere apology.",
    "I hate that we fought. Let's make peace.",
    "I was wrong, and I'm deeply sorry for hurting you.",
    "Please accept this little bouquet and a big apology.",
    "My words failed me, but I hope these flowers can show I'm sorry."
  ],
  "love": [
    "You are the light of my life.",
    "Just a little reminder of how much I love you.",
    "My heart belongs to you, today and always.",
    "I am so incredibly lucky to have you.",
    "You make my world a brighter place.",
    "Every love story is beautiful, but ours is my favorite.",
    "I can't imagine my life without you in it.",
    "Sending you all my love, wrapped up in these petals."
  ],
  "thank-you": [
    "Thank you so much for everything.",
    "I can't express how grateful I am for your help.",
    "Your kindness means the world to me.",
    "Thank you for always being there for me.",
    "A small token of my immense gratitude.",
    "I am forever thankful for your support and love.",
    "You went above and beyond, and I appreciate it so much.",
    "Thanks for being a ray of sunshine."
  ],
  "get-well": [
    "Wishing you a speedy recovery!",
    "Sending you healing thoughts and a little sunshine.",
    "Hope you feel better and brighter very soon.",
    "Take all the time you need to heal. We are here for you.",
    "Rest up and get well soon!",
    "Sending these blooms to brighten up your room while you recover.",
    "You are so strong, you've got this! Get well soon.",
    "Thinking of you and hoping for your swift recovery."
  ],
  "friendship": [
    "So grateful for a friend like you.",
    "Thanks for always being my partner in crime.",
    "True friends are like rare flowers. I'm glad I found you.",
    "Distance means nothing when someone means so much.",
    "Just a reminder that you're an amazing friend.",
    "I cherish every memory we've made together.",
    "You always know how to make me smile.",
    "Here's to us and many more laughs together."
  ],
  "congratulations": [
    "Congratulations on your amazing achievement!",
    "So incredibly proud of you and all your hard work.",
    "You did it! Time to celebrate your success.",
    "Here's to your next big adventure!",
    "All your dedication has paid off. Congrats!",
    "Wishing you huge success in your new chapter.",
    "Bravo! You deserve every bit of this success.",
    "I knew you could do it! So happy for you."
  ],
  "just-because": [
    "Just wanted to send a little sunshine your way.",
    "Thinking of you and hoping you have a great day!",
    "You are amazing, just thought you should know.",
    "A random bouquet for a wonderfully random day.",
    "No special reason, just wanted to make you smile.",
    "Sending good vibes and beautiful blooms.",
    "Because you deserve flowers any day of the week.",
    "Just checking in to say hello!"
  ]
};

export const WRAP_STYLES = [
  { id: 'none', name: 'No Wrap', description: 'Just the stems' },
  { id: 'kraft', name: 'Kraft Paper', description: 'Rustic and earthy' },
  { id: 'pastel', name: 'Pastel Wrap', description: 'Soft pinks and blues' },
  { id: 'satin', name: 'Satin Cloth', description: 'Smooth and elegant' },
  { id: 'cream', name: 'Cream Paper', description: 'Classic and clean' },
  { id: 'frosted', name: 'Frosted Cellophane', description: 'Modern translucent' },
  { id: 'festive', name: 'Festive Wrap', description: 'Bright and celebratory' }
];

export const RIBBON_COLORS = [
  { id: 'none', name: 'No Ribbon', hex: '#transparent' },
  { id: 'gold', name: 'Gold', hex: '#D4AF37' },
  { id: 'blush', name: 'Blush', hex: '#F4A7B9' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'sage', name: 'Sage', hex: '#8FAF88' },
  { id: 'crimson', name: 'Crimson', hex: '#C41E3A' }
];

export const BOUQUET_THEMES = [
  { id: 'romantic-red', name: 'Romantic Red', emoji: '🌹', bgColor: '#1C1917', wrapStyle: 'satin', ribbonColor: 'crimson', noteCardStyle: 'classic', suggestedFlowers: ['rose-red', 'peony', 'carnation', 'baby-breath'], fontId: 'elegant', textColor: '#FFFFFF' },
  { id: 'pastel-dream', name: 'Pastel Dream', emoji: '🌸', bgColor: '#FDF2F8', wrapStyle: 'pastel', ribbonColor: 'blush', noteCardStyle: 'minimal', suggestedFlowers: ['cherry-blossom', 'rose-pink', 'hydrangea', 'baby-breath'], fontId: 'script', textColor: '#831843' },
  { id: 'sunshine-garden', name: 'Sunshine Garden', emoji: '🌻', bgColor: '#FEFCE8', wrapStyle: 'kraft', ribbonColor: 'gold', noteCardStyle: 'paper', suggestedFlowers: ['sunflower', 'marigold', 'tulip-yellow', 'greenery'], fontId: 'rounded', textColor: '#713F12' },
  { id: 'lavender-mist', name: 'Lavender Mist', emoji: '💜', bgColor: '#F5F3FF', wrapStyle: 'frosted', ribbonColor: 'white', noteCardStyle: 'minimal', suggestedFlowers: ['lavender', 'iris', 'tulip-purple', 'leaf-stem'], fontId: 'sans', textColor: '#4C1D95' },
  { id: 'elegant-ivory', name: 'Elegant Ivory', emoji: '🤍', bgColor: '#FAFAF9', wrapStyle: 'cream', ribbonColor: 'gold', noteCardStyle: 'classic', suggestedFlowers: ['rose-white', 'tulip-white', 'peony', 'baby-breath'], fontId: 'serif', textColor: '#292524' },
  { id: 'wild-meadow', name: 'Wild Meadow', emoji: '🌿', bgColor: '#F7FEE7', wrapStyle: 'kraft', ribbonColor: 'sage', noteCardStyle: 'paper', suggestedFlowers: ['daisy', 'poppy', 'greenery', 'lavender'], fontId: 'mono', textColor: '#365314' },
  { id: 'midnight-bloom', name: 'Midnight Bloom', emoji: '🌌', bgColor: '#0F172A', wrapStyle: 'frosted', ribbonColor: 'gold', noteCardStyle: 'minimal', suggestedFlowers: ['orchid', 'protea', 'rose-red', 'leaf-stem'], fontId: 'sans', textColor: '#F8FAFC' },
  { id: 'tropical-fiesta', name: 'Tropical Fiesta', emoji: '🌺', bgColor: '#FFF1F2', wrapStyle: 'festive', ribbonColor: 'blush', noteCardStyle: 'classic', suggestedFlowers: ['protea', 'marigold', 'tulip-pink', 'greenery'], fontId: 'rounded', textColor: '#9F1239' }
];

export const NOTE_CARD_STYLES = [
  { id: 'classic', name: 'Classic Card', description: 'Timeless white cardstock' },
  { id: 'minimal', name: 'Minimalist', description: 'Clean layout, modern lines' },
  { id: 'paper', name: 'Textured Paper', description: 'Handmade, rustic feel' },
  { id: 'letter', name: 'Love Letter', description: 'Romantic folded letter style' }
];

export const FONT_OPTIONS = [
  { id: 'serif', name: 'Serif', className: 'font-serif' },
  { id: 'script', name: 'Script', className: 'font-script' },
  { id: 'sans', name: 'Modern Sans', className: 'font-sans' },
  { id: 'elegant', name: 'Elegant', className: 'font-serif italic' },
  { id: 'mono', name: 'Typewriter', className: 'font-mono' },
  { id: 'rounded', name: 'Friendly', className: 'font-rounded' }
];

export const MUSIC_TRACKS = [
  { id: 'acoustic', name: 'Warm & Acoustic', path: '/music/acoustic.mp3' },
  { id: 'emotional', name: 'Soft & Emotional', path: '/music/emotional.mp3' },
  { id: 'chill', name: 'Chill & Relaxing', path: '/music/chill.mp3' }
];
