import { getAllWritingSlugs } from "@/lib/writings";
import WritingDetailClient from "./WritingDetailClient";

export function generateStaticParams() {
  return getAllWritingSlugs().map((slug) => ({ slug }));
}

export default function WritingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <WritingDetailClient slug={params.slug} />;
}
