'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Exploring',
    items: [
      'Infinite Banking Concept & private financial systems',
      'Natural vs. synthetic fabrics and their effects on the mind/body/spirit complex',
    ],
  },
  {
    title: 'Building',
    items: [
      'This personal site and other side projects',
      'Restructuring my light environment \u2014 removing LEDs, opting for incandescents',
    ],
  },
  {
    title: 'Reading',
    items: [
      'Deep dives into consciousness and metaphysics',
      'Classical fiction',
      'Revisionist history & unique historical accounts',
    ],
  },
];

export default function NowSection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref}>
      <div className="now-section">
        <div className="now-ruled-bg" />
        <h2 className="!mt-0 text-2xl relative z-10">Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 relative z-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.5, ease: 'easeOut' }}
            >
              <h4 className="!mt-0">{cat.title}</h4>
              <ul className="list-none !pl-0">
                {cat.items.map((item) => (
                  <li key={item} className="relative pl-[1.1em] text-[0.95rem]">
                    <span className="absolute left-0 text-[var(--color-accent)]">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
