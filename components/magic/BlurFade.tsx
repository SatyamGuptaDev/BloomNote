'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  blur?: string;
  duration?: number;
  once?: boolean;
}

/** Magic-UI style scroll reveal: blur + fade + slide up when in view. */
export function BlurFade({
  children,
  className,
  delay = 0,
  yOffset = 24,
  blur = '8px',
  duration = 0.6,
  once = true,
}: BlurFadeProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  const variants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
