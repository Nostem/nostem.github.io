import { getAllSlugs } from '@/lib/books';
import BookDetailClient from './BookDetailClient';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function BookDetailPage({ params }: { params: { slug: string } }) {
  return <BookDetailClient slug={params.slug} />;
}
