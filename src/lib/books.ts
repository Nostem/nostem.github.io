import { books } from '@/data/books';
import { Book, BooksByYear } from '@/types';

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getBooksByYear(filterYear?: number | null): BooksByYear[] {
  const filtered = filterYear ? books.filter((b) => b.yearRead === filterYear) : books;
  const grouped: Record<number, Book[]> = {};
  filtered.forEach((b) => {
    if (!grouped[b.yearRead]) grouped[b.yearRead] = [];
    grouped[b.yearRead].push(b);
  });
  return Object.entries(grouped)
    .map(([year, yearBooks]) => ({ year: Number(year), books: yearBooks }))
    .sort((a, b) => b.year - a.year);
}

export function getAllSlugs(): string[] {
  return books.map((b) => b.slug);
}

export function getYears(): number[] {
  return [...new Set(books.map((b) => b.yearRead))].sort((a, b) => b - a);
}
