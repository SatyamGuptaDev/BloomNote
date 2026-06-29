import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bloomnote.com';

  const staticRoutes = [
    '',
    '/create',
    '/occasions',
    '/blog',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Occasions (static)
  const occasionRoutes = [
    'birthdays',
    'anniversaries',
    'sympathy',
    'just-because',
    'thank-you',
  ].map((slug) => ({
    url: `${baseUrl}/occasions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog posts (static/dynamic)
  const blogSlugs = [
    '5-things-to-write-just-because',
    'meaning-behind-rose-colors',
    'long-distance-birthday',
    'apology-messages',
    'mothers-day-history',
    'digital-gifting-trend'
  ];
  
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  let bouquetRoutes: MetadataRoute.Sitemap = [];
  try {
    const bouquets = await prisma.bouquet.findMany({
      select: { slug: true, createdAt: true },
      take: 10000, // Reasonable limit for sitemap
    });
    
    bouquetRoutes = bouquets.map((bouquet) => ({
      url: `${baseUrl}/b/${bouquet.slug}`,
      lastModified: bouquet.createdAt,
      changeFrequency: 'never' as const,
      priority: 0.5,
    }));
  } catch (e) {
    console.error('Failed to fetch bouquets for sitemap', e);
  }

  return [...staticRoutes, ...occasionRoutes, ...blogRoutes, ...bouquetRoutes];
}
