'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">Inquire</h1>
          <p className="text-lg text-zinc-500">We would love to hear about your upcoming event.</p>
        </div>

        {status === 'success' ? (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
            <h3 className="font-serif text-2xl font-medium text-zinc-900 mb-2">Thank You</h3>
            <p className="text-zinc-600">Your inquiry has been received. We will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-zinc-900">First Name</label>
                <input id="firstName" required className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-zinc-900">Last Name</label>
                <input id="lastName" required className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-900">Email Address</label>
              <input id="email" type="email" required className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            </div>

            <div className="space-y-2">
              <label htmlFor="eventType" className="text-sm font-medium text-zinc-900">Event Type</label>
              <select id="eventType" className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white">
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="social">Social Gathering</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-900">Event Details</label>
              <textarea id="message" rows={5} required className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900" placeholder="Tell us about your vision, date, and location..."></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full rounded-md bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
