export const FLOWER_TYPES = [
  { id: 'rose-red', name: 'Red Rose', category: 'Roses', path: '/flowers/rose-red.png' },
  { id: 'tulip-pink', name: 'Pink Tulip', category: 'Tulips', path: '/flowers/tulip-pink.png' },
  { id: 'sunflower', name: 'Sunflower', category: 'Sunflowers', path: '/flowers/sunflower.png' },
]

export const MUSIC_TRACKS = [
  { id: 'acoustic', name: 'Warm & Acoustic', path: '/music/acoustic.mp3' },
  { id: 'emotional', name: 'Soft & Emotional', path: '/music/emotional.mp3' },
  { id: 'chill', name: 'Chill & Relaxing', path: '/music/chill.mp3' },
]

export const FONT_OPTIONS = [
  { id: 'serif', name: 'Serif', className: 'font-serif' },
  { id: 'script', name: 'Script', className: 'font-script' },
  { id: 'sans', name: 'Modern Sans', className: 'font-sans' },
  { id: 'elegant', name: 'Elegant', className: 'font-serif italic' },
]

export const OCCASIONS = [
  { slug: "mothers-day", name: "Mother's Day", description: "Show mom some love", image: "https://images.unsplash.com/photo-1520849649551-789aee4e36cb?q=80&w=800&auto=format&fit=crop" },
  { slug: "birthday", name: "Birthday", description: "Celebrate a special day", image: "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?q=80&w=800&auto=format&fit=crop" },
  { slug: "anniversary", name: "Anniversary", description: "Celebrate your love", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop" },
  { slug: "apology", name: "Apology", description: "Say you are sorry", image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop" },
  { slug: "just-because", name: "Just Because", description: "No reason needed", image: "https://images.unsplash.com/photo-1490750967868-88cb4eca20db?q=80&w=800&auto=format&fit=crop" },
]

export const MESSAGE_TEMPLATES = {
  "mothers-day": [
    "Happy Mother's Day to the best mom in the world!",
    "Thank you for everything you do. I love you!",
    "Wishing you a day as beautiful as you are."
  ],
  "birthday": [
    "Wishing you the happiest of birthdays!",
    "Hope your special day brings you all that your heart desires!",
    "Here's to another year of wonderful adventures!"
  ],
  "anniversary": [
    "Happy Anniversary! Here's to many more years together.",
    "I love you more today than yesterday, but not as much as tomorrow.",
    "Thank you for being my everything."
  ],
  'apology': [
    'I am so sorry. Please forgive me.',
    'I messed up, and I want to make it right.',
    'I hope you can find it in your heart to forgive me.'
  ],
  'just-because': [
    'Just wanted to send a little sunshine your way.',
    'Thinking of you and hoping you have a great day!',
    'You are amazing, just thought you should know.'
  ]
}
