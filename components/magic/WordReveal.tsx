'use client';

import { motion, type Variants } from 'framer-motion';

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/** Animates a line of text word-by-word (blur + rise). Inherits className styling. */
export function WordReveal({ text, className, delay = 0, stagger = 0.09 }: WordRevealProps) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: '0.45em', filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: '0em',
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 14, stiffness: 120 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={child} className="inline-block whitespace-pre" aria-hidden>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
