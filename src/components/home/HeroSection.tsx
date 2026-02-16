'use client';

import { useTypewriter } from '@/hooks/useTypewriter';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { displayText, isComplete } = useTypewriter("Hello. I'm Nostem.");

  return (
    <div className="hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.stockcake.com/public/b/4/9/b49748b1-10d3-4497-8c75-2850cd757fc6/vintage-writer-s-desk-stockcake.jpg"
        alt="Vintage typewriter on a warm-lit desk"
        className="hero-image"
      />
      <div className="hero-overlay">
        <div className="font-special-elite text-[2.8rem] text-[var(--color-heading-1)] mb-1" style={{ textShadow: '0 2px 8px rgba(250,245,235,0.5)' }}>
          {displayText}
          <span className={`typewriter-cursor ${isComplete ? 'done' : ''}`} />
        </div>
        <motion.p
          className="font-lora text-lg text-[var(--color-text-muted)] italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          Builder, thinker, explorer of consciousness, systems, and personal sovereignty.
        </motion.p>
      </div>
    </div>
  );
}
