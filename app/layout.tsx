import type { Metadata } from 'next';
import { Fraunces, Inter, Dancing_Script } from 'next/font/google';
import { AuthProvider } from '@/components/providers/AuthProvider';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://dearbloomy.com'),
  title: {
    template: '%s | Dear Bloomy',
    default: 'Dear Bloomy — Free Digital Bouquet Maker',
  },
  description: 'Create beautiful digital bouquets with personal notes. Free, no login required. Send virtual flowers via WhatsApp or link in seconds.',
  keywords: ['digital bouquet', 'virtual flowers', 'online bouquet maker', 'send flowers online', 'free flower gift'],
  authors: [{ name: 'Dear Bloomy' }],
  creator: 'Dear Bloomy',
  publisher: 'Dear Bloomy',
  openGraph: {
    siteName: 'Dear Bloomy',
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${dancingScript.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
