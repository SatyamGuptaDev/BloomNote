'use client';

import { BlurFade } from '@/components/magic/BlurFade';
import { Send, Copy, Loader2, QrCode, Sparkles, CalendarClock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface CardPreviewControlsProps {
  senderName: string;
  setSenderName: (name: string) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  scheduledFor: string;
  setScheduledFor: (date: string) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  shareLink: string | null;
}

export function CardPreviewControls({
  senderName,
  setSenderName,
  recipientName,
  setRecipientName,
  scheduledFor,
  setScheduledFor,
  onSubmit,
  isSubmitting,
  shareLink
}: CardPreviewControlsProps) {
  const [showQr, setShowQr] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  return (
    <div className="w-full h-full bg-background p-6 flex flex-col hide-scrollbar overflow-y-auto pb-24">
      <h3 className="font-heading text-xl text-[var(--charcoal)] mb-6 capitalize">Preview & Send</h3>
      
      <BlurFade delay={0.1} yOffset={10} key="preview">
        {!shareLink ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--charcoal)] mb-1">To (Optional)</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Recipient's Name"
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--charcoal)] mb-1">From (Optional)</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your Name (leave blank to be anonymous)"
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-border hover:bg-black/5 transition-colors">
                <input 
                  type="checkbox" 
                  checked={isScheduled} 
                  onChange={(e) => {
                    setIsScheduled(e.target.checked);
                    if (!e.target.checked) setScheduledFor('');
                  }}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--charcoal)] flex items-center gap-2">
                    <CalendarClock size={16} /> Schedule Delivery
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Time Capsule: Card unlocks at the specified time.</p>
                </div>
              </label>

              {isScheduled && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                  <label className="block text-sm font-medium text-[var(--charcoal)] mb-1">Unlock Time (Your Local Time)</label>
                  <input
                    type="datetime-local"
                    value={scheduledFor}
                    onChange={(e) => setScheduledFor(e.target.value)}
                    min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,16)}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white"
                  />
                </motion.div>
              )}
            </div>

            <div className="pt-4">
              <button
                onClick={onSubmit}
                disabled={isSubmitting || (isScheduled && !scheduledFor)}
                className="w-full py-4 rounded-full bg-[var(--charcoal)] text-white font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-80"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                {isSubmitting ? 'Generating...' : (isScheduled ? 'Schedule Card' : 'Create & Share Card')}
              </button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                Creates a unique shareable link. No account required.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} />
            </div>
            <h4 className="font-heading text-2xl text-[var(--charcoal)]">Card Created!</h4>
            <p className="text-sm text-muted-foreground">Your beautiful card is ready to share.</p>
            
            <div className="bg-muted/30 p-4 rounded-xl border border-border flex items-center gap-3">
              <input 
                type="text" 
                readOnly 
                value={shareLink} 
                className="flex-1 bg-transparent text-sm focus:outline-none overflow-hidden text-ellipsis"
              />
              <button 
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="p-2 bg-white rounded-md shadow-sm border border-border hover:bg-gray-50 text-[var(--charcoal)] transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <a
                href={'https://wa.me/?text=' + encodeURIComponent('I made a card for you: ' + shareLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Share on WhatsApp
              </a>
              <button 
                onClick={() => setShowQr(!showQr)}
                className="py-3 rounded-xl bg-white border border-border text-[var(--charcoal)] font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <QrCode size={16} /> {showQr ? 'Hide QR' : 'Show QR'}
              </button>
            </div>

            {showQr && (
              <div className="mt-6 flex flex-col items-center">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-border inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLink)}`} 
                    alt="QR Code" 
                    width={150} 
                    height={150} 
                    className="rounded-md"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">Scan this code to open the card on another device.</p>
              </div>
            )}
          </div>
        )}
      </BlurFade>
    </div>
  );
}
