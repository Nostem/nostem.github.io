'use client';

import { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import BookShelf3D from '@/components/books/BookShelf3D';
import ReadingTimeline from '@/components/books/ReadingTimeline';
import BookFilter from '@/components/books/BookFilter';
import { getAllBooks, getYears, getBooksByYear } from '@/lib/books';

export default function BooksPage() {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [view, setView] = useState<'shelf' | 'timeline'>('shelf');

  const allBooks = getAllBooks();
  const years = getYears();
  const groupedBooks = getBooksByYear(activeYear);

  return (
    <PageTransition>
      <div className="max-w-wide mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h1 className="!mb-0">
            Bookshelf{' '}
            <span className="font-lora text-[var(--color-text-muted)] text-base font-normal">
              ({allBooks.length})
            </span>
          </h1>
          <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden">
            <button
              className={`view-btn ${view === 'shelf' ? 'active' : ''}`}
              onClick={() => setView('shelf')}
            >
              Shelf
            </button>
            <button
              className={`view-btn ${view === 'timeline' ? 'active' : ''}`}
              onClick={() => setView('timeline')}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Filters */}
        <BookFilter
          years={years}
          activeYear={activeYear}
          totalCount={allBooks.length}
          bookCounts={years.reduce(
            (acc, y) => ({ ...acc, [y]: allBooks.filter((b) => b.yearRead === y).length }),
            {} as Record<number, number>
          )}
          onYearChange={setActiveYear}
        />

        {/* Views */}
        {view === 'shelf' ? (
          <BookShelf3D groups={groupedBooks} />
        ) : (
          <ReadingTimeline groups={groupedBooks} />
        )}
      </div>
    </PageTransition>
  );
}
