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
