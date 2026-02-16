'use client';

import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ minHeight: 'calc(100vh - 180px)', paddingTop: 90, paddingBottom: '4rem' }}
    >
      {children}
    </motion.div>
  );
}
