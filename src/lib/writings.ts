import { writings } from "@/data/writings";
import { WritingCategory, WritingEntry } from "@/types";

function sortByDateDesc(entries: WritingEntry[]): WritingEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllPublishedWritings(): WritingEntry[] {
  return sortByDateDesc(writings.filter((entry) => entry.published));
}

export function getWritingsByCategory(
  category: WritingCategory,
): WritingEntry[] {
  return sortByDateDesc(
    writings.filter((entry) => entry.published && entry.category === category),
  );
}

export function getWritingBySlug(slug: string): WritingEntry | undefined {
  return writings.find((entry) => entry.slug === slug && entry.published);
}

export function getAllWritingSlugs(): string[] {
  return getAllPublishedWritings().map((entry) => entry.slug);
}
