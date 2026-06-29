import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service | Dear Bloomy',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl text-[var(--charcoal)] mb-8">Terms of Service</h1>
          <div className="prose prose-lg text-[var(--stone)]">
            <p>Last updated: June 2026</p>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Dear Bloomy, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            <h2>2. User Content</h2>
            <p>You retain all rights to the messages and content you create. You are responsible for ensuring your messages do not violate any laws or contain abusive, harassing, or illegal content.</p>
            <h2>3. Service Availability</h2>
            <p>We strive to keep Dear Bloomy running 24/7, but we do not guarantee uninterrupted access. We reserve the right to modify or discontinue the service at any time.</p>
            <h2>4. Limitation of Liability</h2>
            <p>Dear Bloomy provides the service "as is". We are not liable for any damages arising from your use of the service or inability to use the service.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
