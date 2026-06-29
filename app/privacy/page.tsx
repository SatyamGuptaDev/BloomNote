import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | BloomNote',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl text-[var(--charcoal)] mb-8">Privacy Policy</h1>
          <div className="prose prose-lg text-[var(--stone)]">
            <p>Last updated: June 2026</p>
            <h2>1. Information We Collect</h2>
            <p>We only collect the information you provide when creating a bouquet (sender name, notes). This information is stored securely in our database solely for the purpose of displaying your digital bouquet to your intended recipient.</p>
            <h2>2. How We Use Your Information</h2>
            <p>Your information is used strictly to render the digital bouquet experience. We do not sell your personal data or your recipient's data to third parties.</p>
            <h2>3. Cookies</h2>
            <p>We use essential cookies to ensure the basic functionality of our platform.</p>
            <h2>4. Contact Us</h2>
            <p>If you have questions about this privacy policy, please reach out via our contact page.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
