'use client';

import { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';

const tabs = ['Essays', 'Poems', 'Random'];

export default function WritingPage() {
  const [activeTab, setActiveTab] = useState('Essays');

  return (
    <PageTransition>
      <div className="max-w-page mx-auto px-6">
        <h1>Writing</h1>

        <div className="flex border-b border-[var(--color-border)] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`writing-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl mb-4 opacity-40">&#9997;</div>
          <p className="font-special-elite italic text-lg text-[var(--color-text-muted)]">
            Words are being gathered...
          </p>
          <p className="font-lora text-[0.9rem] mt-4 opacity-70 text-[var(--color-text-muted)]">
            Essays, poems, and reflections coming soon.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
