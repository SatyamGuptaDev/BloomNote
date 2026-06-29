import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://bloomnote.com'),
  title: {
    template: '%s | BloomNote',
    default: 'BloomNote — Free Digital Bouquet Maker',
  },
  description: 'Create beautiful digital bouquets with personal notes. Free, no login required. Send virtual flowers via WhatsApp or link in seconds.',
  keywords: ['digital bouquet', 'virtual flowers', 'online bouquet maker', 'send flowers online', 'free flower gift'],
  authors: [{ name: 'BloomNote' }],
  creator: 'BloomNote',
  publisher: 'BloomNote',
  openGraph: {
    siteName: 'BloomNote',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
