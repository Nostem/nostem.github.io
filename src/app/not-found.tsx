'use client';

import Link from 'next/link';
import PageTransition from '@/components/layout/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="max-w-page mx-auto px-6">
        <div className="text-center py-24 relative">
          <div className="big-404 animate-float">404</div>
          <h1 className="relative z-10 text-3xl">This page has wandered off the path</h1>
          <p className="relative z-10 text-[var(--color-text-muted)] italic my-4 text-lg">
            Perhaps it&apos;s exploring somewhere beyond the homestead.
          </p>
          <Link
            href="/"
            className="relative z-10 inline-block px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg font-lora font-medium hover:bg-[var(--color-heading-1)] hover:translate-y-[-2px] transition-all duration-250"
            style={{ borderBottom: 'none' }}
          >
            Return to the homestead
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
