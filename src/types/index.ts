export interface Book {
  slug: string;
  title: string;
  author?: string;
  coverUrl: string;
  yearRead: number;
}

export interface BooksByYear {
  year: number;
  books: Book[];
}

export type WritingCategory = "Essays" | "Poems" | "Random";

export interface WritingEntry {
  slug: string;
  title: string;
  category: WritingCategory;
  date: string;
  excerpt: string;
  content: string[];
  published: boolean;
}
