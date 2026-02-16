'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BooksByYear } from '@/types';

interface BookShelf3DProps {
  groups: BooksByYear[];
}

export default function BookShelf3D({ groups }: BookShelf3DProps) {
  const router = useRouter();

  return (
    <div>
      {groups.map((group, gi) => (
        <motion.div
          key={group.year}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.12, duration: 0.5, ease: 'easeOut' }}
        >
          <div className="font-special-elite text-lg text-[var(--color-text-muted)] mb-3 pl-1 tracking-wider">
            {group.year}
          </div>
          <div className="flex flex-wrap gap-5 px-4 pb-0 min-h-[230px] items-end">
            {group.books.map((book, bi) => (
              <motion.div
                key={book.slug}
                className="book-3d"
                onClick={() => router.push(`/books/${book.slug}`)}
                title={book.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: gi * 0.1 + bi * 0.06, duration: 0.4 }}
              >
                <div className="book-inner">
                  <div className="book-spine" />
                  <div className="book-top" />
                  <div className="book-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.coverUrl} alt={book.title} loading="lazy" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="shelf-plank" />
        </motion.div>
      ))}
    </div>
  );
}
