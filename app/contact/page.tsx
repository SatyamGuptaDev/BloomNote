import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Mail } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | BloomNote',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-[var(--blush)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[var(--rose)]" />
          </div>
          <h1 className="font-heading text-4xl text-[var(--charcoal)] mb-6">Get in Touch</h1>
          <p className="text-lg text-[var(--stone)] mb-12">
            Have a question, feedback, or just want to say hi? We'd love to hear from you.
          </p>
          
          <div className="bg-[var(--cream)] p-8 rounded-2xl border border-[var(--blush)] max-w-lg mx-auto">
            <p className="text-[var(--charcoal)] font-medium text-lg mb-2">Email us at</p>
            <a href="mailto:hello@bloomnote.com" className="text-2xl font-heading text-[var(--rose)] hover:underline">
              hello@bloomnote.com
            </a>
            <p className="text-[var(--stone)] mt-6 text-sm">
              We try to respond to all inquiries within 24-48 hours.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
