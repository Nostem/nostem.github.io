"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import { getWritingBySlug } from "@/lib/writings";

export default function WritingDetailClient({ slug }: { slug: string }) {
  const entry = getWritingBySlug(slug);

  if (!entry) {
    return (
      <PageTransition>
        <div className="max-w-page mx-auto px-6 text-center py-20">
          <h1>Writing not found</h1>
          <Link href="/writing" className="text-[var(--color-link)]">
            &larr; Back to Writing
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="max-w-[760px] mx-auto px-6 pb-4">
        <Link
          href="/writing"
          className="inline-flex items-center gap-1 text-[0.9rem] text-[var(--color-text-muted)] mb-8 hover:text-[var(--color-link-hover)]"
          style={{ borderBottom: "none" }}
        >
          &larr; Back to Writing
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <header className="mb-8">
            <div className="writing-card-meta mb-3">
              <span>
                {new Date(entry.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="writing-pill">{entry.category}</span>
            </div>
            <h1 className="!mb-3">{entry.title}</h1>
            <p className="text-[var(--color-text-muted)] italic !mb-0">
              {entry.excerpt}
            </p>
          </header>

          <section className="writing-body">
            {entry.content.map((paragraph, index) => (
              <p key={`${entry.slug}-${index}`}>{paragraph}</p>
            ))}
          </section>
        </motion.div>
      </article>
    </PageTransition>
  );
}
