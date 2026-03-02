# Content Model

## Books

Source file: `src/data/books.ts`

Type:

```ts
interface Book {
  slug: string;
  title: string;
  author?: string;
  coverUrl: string;
  yearRead: number;
}
```

Rules:

- `slug` must be unique and kebab-case
- `coverUrl` must be valid HTTP(S)
- `yearRead` should be a 4-digit year
- Keep newest reads represented accurately; grouping/sorting is handled in `src/lib/books.ts`

Route behavior:

- `src/app/books/page.tsx` renders grouped bookshelf/timeline
- `src/app/books/[slug]/page.tsx` uses `generateStaticParams()` from all slugs
- Duplicate slugs break detail-page routing; check uniqueness before commit

## Writing

Source files:

- `src/data/writings.ts`
- `src/lib/writings.ts`
- `src/app/writing/page.tsx`
- `src/app/writing/[slug]/page.tsx`

Rules:

- Preserve tab behavior (`Essays`, `Poems`, `Random`) unless request says otherwise
- Keep writing updates focused on content-first diffs in `src/data/writings.ts`
- Only `published: true` entries are displayed and routed
- `slug` must be unique and kebab-case
- `date` should be ISO-like (`YYYY-MM-DD`) for stable sorting

Type:

```ts
interface WritingEntry {
  slug: string;
  title: string;
  category: "Essays" | "Poems" | "Random";
  date: string;
  excerpt: string;
  content: string[];
  published: boolean;
}
```

Route behavior:

- `/writing/` filters by category tabs
- `/writing/[slug]/` is statically generated from published slugs
- Duplicate slugs will cause route conflicts

## Pages

Top-level routes live under `src/app/<route>/page.tsx`.

Rules:

- Keep page shell consistent (`PageTransition`, max-width container, typography classes)
- Add route to `src/components/layout/Navigation.tsx` only when requested
- If page should be highlighted, add a home card in `src/app/page.tsx`

## Navigation and footer links

- Navigation links: `src/components/layout/Navigation.tsx`
- Footer links: `src/components/layout/Footer.tsx`

When adding a major section, update both if discoverability is expected.
