import { Leaf, PenTool } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">Services</h1>
          <p className="text-lg text-zinc-500">Bespoke design for life's most meaningful celebrations.</p>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2 pt-8">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-900">
              <Leaf className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-2xl font-medium">Floral Design</h2>
            <p className="text-zinc-600 leading-relaxed">
              Full-service floral design for weddings and events. We specialize in lush, garden-style arrangements that feel both organic and elegant. Our services include bouquets, centerpieces, large-scale installations, and complete event styling.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-900">
              <PenTool className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-2xl font-medium">Custom Stationary</h2>
            <p className="text-zinc-600 leading-relaxed">
              From save-the-dates to day-of paper goods, our stationary is custom-designed to set the tone for your event. We offer hand calligraphy, letterpress printing, custom illustrations, and bespoke wax seals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
