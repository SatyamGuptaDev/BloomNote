'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
  isVisible: boolean;
}

export function Toast({ message, type = 'info', onClose, isVisible }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3 bg-[var(--charcoal)] text-white px-6 py-3 rounded-full shadow-lg"
        >
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          ) : (
            <Info className="w-5 h-5 text-blue-400" />
          )}
          <span className="font-body text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
