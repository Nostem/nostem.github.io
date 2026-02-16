'use client';

import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';

const interests = [
  {
    icon: '\uD83C\uDF0E',
    title: 'Exploring',
    items: ['Infinite Banking & private finance', 'Natural materials & analog living', 'Consciousness & metaphysics'],
  },
  {
    icon: '\uD83D\uDD27',
    title: 'Building',
    items: ['This personal site', 'Side projects in code', 'A sovereignty-first lifestyle'],
  },
  {
    icon: '\uD83D\uDCD6',
    title: 'Reading',
    items: ['The Law of One & Ra Material', 'Classic fiction & myth', 'Revisionist history'],
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-page mx-auto px-6">
        <h1>About</h1>
        <p>
          I&apos;m <strong>Nostem Koempassu</strong> &mdash; builder, thinker, and explorer of ideas
          around consciousness, systems, and personal sovereignty.
        </p>
        <p>
          This is my digital homestead: a living collection of what I&apos;m reading, writing, and
          working on. It&apos;s a page in progress, like everything else.
        </p>

        <div className="section-divider my-12">
          <span className="text-[0.8rem] opacity-60">&bull;</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {interests.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="about-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h3 className="!mt-0 !mb-3 text-xl">{cat.title}</h3>
              <ul className="text-[0.92rem] text-[var(--color-text-muted)]">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="section-divider my-12">
          <span className="text-[0.8rem] opacity-60">&bull;</span>
        </div>

        <h3>Connect</h3>
        <div className="flex gap-4 flex-wrap mt-3">
          <a href="https://x.com/TheAl_Mo" className="social-link" target="_blank" rel="noopener noreferrer">
            &#x1D54F; @TheAl_Mo
          </a>
          <a href="https://github.com/Nostem" className="social-link" target="_blank" rel="noopener noreferrer">
            &#9881; GitHub
          </a>
          <a href="https://nostem.substack.com" className="social-link" target="_blank" rel="noopener noreferrer">
            &#9993; Substack
          </a>
        </div>
      </div>
    </PageTransition>
  );
}
