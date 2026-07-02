'use client';

import { useState, useMemo } from 'react';
import { FlowerAsset } from '@prisma/client';
import * as Tabs from '@radix-ui/react-tabs';
import { Search } from 'lucide-react';
import { FlowerCard, FlowerCardSkeleton } from './FlowerCard';
import { BlurFade } from '@/components/magic/BlurFade';

interface FlowerLibraryProps {
  flowers: FlowerAsset[];
  isLoading: boolean;
  onSelectFlower: (flower: FlowerAsset) => void;
}

export function FlowerLibrary({ flowers, isLoading, onSelectFlower }: FlowerLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(flowers.map(f => f.category)));
    return ['All', ...cats];
  }, [flowers]);

  const filteredFlowers = useMemo(() => {
    return flowers.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            f.colorTag?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeTab === 'All' || f.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  }, [flowers, searchQuery, activeTab]);

  return (
    <div className="flex flex-col h-full w-full bg-background border-r border-border">
      <div className="p-5 border-b border-border space-y-4">
        <h2 className="font-heading text-2xl text-[var(--charcoal)]">Flower Library</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or color..."
            className="w-full pl-9 pr-4 py-2.5 bg-[var(--cream)]/30 border border-border rounded-xl text-sm focus:ring-1 focus:ring-[var(--rose)] focus:border-[var(--rose)] outline-none transition-all placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <Tabs.Root defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full">
          <div className="px-5 py-3 border-b border-border">
            <div className="overflow-x-auto hide-scrollbar pb-1">
              <Tabs.List className="flex items-center space-x-2">
                {categories.map(cat => (
                  <Tabs.Trigger 
                    key={cat} 
                    value={cat}
                    className="rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors data-[state=active]:bg-[var(--blush)] data-[state=active]:text-[var(--rose-deep)] data-[state=inactive]:bg-muted/50 data-[state=inactive]:text-muted-foreground hover:bg-muted"
                  >
                    {cat}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 hide-scrollbar">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => <FlowerCardSkeleton key={i} />)}
              </div>
            ) : filteredFlowers.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
                {filteredFlowers.map((flower, idx) => (
                  <BlurFade key={flower.id} delay={idx * 0.05} yOffset={10}>
                    <FlowerCard flower={flower} onClick={onSelectFlower} />
                  </BlurFade>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm space-y-2 pb-20">
                <span className="text-3xl">🌸</span>
                <p>No flowers found.</p>
              </div>
            )}
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}
