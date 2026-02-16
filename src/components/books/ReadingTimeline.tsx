'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BooksByYear } from '@/types';

interface ReadingTimelineProps {
  groups: BooksByYear[];
}

export default function ReadingTimeline({ groups }: ReadingTimelineProps) {
  const router = useRouter();

  return (
    <div className="relative py-8 pl-12">
      <div className="timeline-line" />
      {groups.map((group, gi) => (
        <motion.div
          key={group.year}
          className="mb-10 relative"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: gi * 0.1, duration: 0.45, ease: 'easeOut' }}
        >
          <div className="timeline-year-dot" />
          <div className="font-special-elite text-xl text-[var(--color-heading-2)] mb-3">
            {group.year}
          </div>
          <div className="flex flex-wrap gap-3">
            {group.books.map((book) => (
              <div
                key={book.slug}
                className="timeline-book"
                onClick={() => router.push(`/books/${book.slug}`)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-9 h-[54px] object-cover rounded-sm"
                  style={{ boxShadow: '1px 2px 4px rgba(0,0,0,0.15)' }}
                  loading="lazy"
                />
                <div className="text-[0.85rem]">
                  <div className="font-semibold text-[var(--color-text)] leading-tight">
                    {book.title}
                  </div>
                  {book.author && (
                    <div className="text-[var(--color-text-muted)] text-[0.78rem] italic">
                      {book.author}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
