'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import { getBookBySlug } from '@/lib/books';

export default function BookDetailClient({ slug }: { slug: string }) {
  const book = getBookBySlug(slug);

  if (!book) {
    return (
      <PageTransition>
        <div className="max-w-page mx-auto px-6 text-center py-20">
          <h1>Book not found</h1>
          <Link href="/books" className="text-[var(--color-link)]">
            &larr; Back to Bookshelf
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-[700px] mx-auto px-6">
        <Link
          href="/books"
          className="inline-flex items-center gap-1 text-[0.9rem] text-[var(--color-text-muted)] mb-8 hover:text-[var(--color-link-hover)]"
          style={{ borderBottom: 'none' }}
        >
          &larr; Back to Bookshelf
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.coverUrl}
            alt={book.title}
            className="book-detail-cover"
          />

          <div className="text-center mb-8">
            <h1 className="text-[2rem] !mb-1">{book.title}</h1>
            {book.author && (
              <div className="italic text-[var(--color-text-muted)] text-lg mb-3">
                by {book.author}
              </div>
            )}
            <span className="year-badge">Read in {book.yearRead}</span>
          </div>

          <div className="notes-placeholder">
            <p className="!mb-0">Notes and reflections coming soon...</p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
