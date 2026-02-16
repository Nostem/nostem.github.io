'use client';

import PageTransition from '@/components/layout/PageTransition';
import HeroSection from '@/components/home/HeroSection';
import NowSection from '@/components/home/NowSection';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="max-w-page mx-auto px-6">
        <HeroSection />

        <NowSection />

        {/* Link cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/writing" className="link-card">
            <h3 className="!mt-0 !mb-2 text-xl">
              Writing <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </h3>
            <p className="text-[var(--color-text-muted)] text-[0.92rem] !mb-0">
              Essays, poems, and thoughts in progress
            </p>
          </Link>
          <Link href="/books" className="link-card">
            <h3 className="!mt-0 !mb-2 text-xl">
              Bookshelf <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </h3>
            <p className="text-[var(--color-text-muted)] text-[0.92rem] !mb-0">
              21 books across consciousness, sovereignty, and systems
            </p>
          </Link>
        </motion.div>

        {/* Connect */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
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
        </motion.section>
      </div>
    </PageTransition>
  );
}
