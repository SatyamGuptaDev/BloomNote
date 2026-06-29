'use client';

import { motion, type Variants } from 'framer-motion';
import { BlurFade } from '@/components/magic/BlurFade';
import { WordReveal } from '@/components/magic/WordReveal';

const steps = [
  { num: '01', title: 'Choose your gift', desc: 'Pick a bouquet, a birthday cake, a card or a warm virtual hug.' },
  { num: '02', title: 'Make it personal', desc: 'Customize it and add a heartfelt note — or use our message prompts.' },
  { num: '03', title: 'Share in seconds', desc: 'Get a private link and send it over WhatsApp, text or email.' },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <BlurFade>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose)]">How it works</p>
          </BlurFade>
          <h2 className="mt-4 font-heading text-4xl text-[var(--charcoal)] sm:text-5xl">
            <WordReveal text="A heartfelt gift in three steps" />
          </h2>
        </div>

        {/* hairline that draws in */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.2 }}
          className="mt-16 h-px w-full origin-left bg-[var(--blush)]"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-x-12 gap-y-14 pt-12 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div key={step.num} variants={item} className="group">
              <span
                className="block font-heading text-7xl leading-none text-transparent transition-all duration-500 [-webkit-text-stroke:1.5px_var(--rose)] group-hover:[-webkit-text-stroke:1.5px_var(--rose-deep)] sm:text-8xl"
              >
                {step.num}
              </span>
              <h3 className="mt-7 font-heading text-2xl text-[var(--charcoal)]">
                {step.title}
                <span className="ml-0 block h-0.5 w-0 bg-[var(--rose)] transition-all duration-500 group-hover:w-10" />
              </h3>
              <p className="mt-4 max-w-xs leading-relaxed text-[var(--stone)]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
