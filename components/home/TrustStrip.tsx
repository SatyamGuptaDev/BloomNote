import { Gift, Zap, Send, Leaf } from 'lucide-react';

const items = [
  { icon: Gift, title: '5 kinds of gifts', sub: 'Bouquets, cakes, cards & more' },
  { icon: Zap, title: 'Ready in seconds', sub: 'No design skills needed' },
  { icon: Send, title: 'Share anywhere', sub: 'WhatsApp, text or email' },
  { icon: Leaf, title: 'Zero-waste', sub: 'Thoughtful & eco-friendly' },
];

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--blush)] bg-gradient-to-r from-[var(--blush)]/40 via-[var(--background)] to-[var(--lavender)]/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-6 px-5 py-7 sm:px-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, sub }, i) => (
          <div
            key={title}
            className={`flex items-center gap-3.5 ${i < items.length - 1 ? 'lg:border-r lg:border-[var(--blush)]' : ''
              }`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--rose)]/10 text-[var(--rose-deep)]">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight text-[var(--charcoal)]">{title}</p>
              <p className="mt-0.5 text-xs leading-tight text-[var(--stone)]">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
