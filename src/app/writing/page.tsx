"use client";

import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import { getWritingsByCategory } from "@/lib/writings";
import { type WritingCategory } from "@/types";

const tabs: WritingCategory[] = ["Essays", "Poems", "Random"];

export default function WritingPage() {
  const [activeTab, setActiveTab] = useState<WritingCategory>("Essays");
  const entries = getWritingsByCategory(activeTab);

  return (
    <PageTransition>
      <div className="max-w-page mx-auto px-6">
        <h1>Writing</h1>

        <div className="flex border-b border-[var(--color-border)] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`writing-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {entries.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-4 opacity-40">&#9997;</div>
            <p className="font-special-elite italic text-lg text-[var(--color-text-muted)]">
              No published pieces in {activeTab} yet.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4 pb-4">
            {entries.map((entry, index) => (
              <motion.article
                key={entry.slug}
                className="writing-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <div className="writing-card-meta">
                  <span>
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="writing-pill">{entry.category}</span>
                </div>
                <h2 className="writing-card-title">{entry.title}</h2>
                <p className="writing-card-excerpt">{entry.excerpt}</p>
                <Link
                  href={`/writing/${entry.slug}`}
                  className="inline-flex items-center gap-2 text-[0.92rem] font-special-elite"
                  style={{ borderBottom: "none" }}
                >
                  Read piece <span aria-hidden="true">&rarr;</span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
