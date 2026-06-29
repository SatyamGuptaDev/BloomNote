import Image from 'next/image';

const portfolioItems = [
  { id: 1, title: 'Spring Estate Wedding', category: 'Floral', image: 'https://picsum.photos/seed/wed1/800/1000' },
  { id: 2, title: 'Botanical Invitations', category: 'Stationary', image: 'https://picsum.photos/seed/stat1/800/1000' },
  { id: 3, title: 'Coastal Elopement', category: 'Floral & Stationary', image: 'https://picsum.photos/seed/wed2/800/1000' },
  { id: 4, title: 'Autumn Gala', category: 'Floral', image: 'https://picsum.photos/seed/wed3/800/1000' },
  { id: 5, title: 'Minimalist Suite', category: 'Stationary', image: 'https://picsum.photos/seed/stat2/800/1000' },
  { id: 6, title: 'Garden Party', category: 'Floral', image: 'https://picsum.photos/seed/wed4/800/1000' },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <div className="text-center space-y-4 mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">Portfolio</h1>
        <p className="text-lg text-zinc-500">A curated selection of our recent work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <div key={item.id} className="group cursor-pointer space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-zinc-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-zinc-900">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
