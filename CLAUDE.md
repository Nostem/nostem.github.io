# CLAUDE.md — AI Assistant Guide for nostem.github.io

This file provides context for AI assistants (Claude, Copilot, etc.) working on this repository.

---

## Project Overview

**nostem.github.io** is a personal digital homestead — a statically exported Next.js site deployed to GitHub Pages. It serves as a portfolio and content platform featuring a curated bookshelf, writing section, and personal bio.

- **Owner:** Nostem Koempassu
- **Deployment:** GitHub Pages via static export (`next export` → `./out/`)
- **Live URL:** https://nostem.github.io

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3 + custom CSS variables |
| Animation | Framer Motion 11 |
| Theming | next-themes 0.4 (class-based dark mode) |
| Fonts | Google Fonts — Special Elite, Lora |
| Build | `npm run build` → static export in `./out/` |
| CI/CD | GitHub Actions → GitHub Pages |
| Package manager | npm |

---

## Development Commands

```bash
npm run dev      # Start local dev server (http://localhost:3000)
npm run build    # Build and export static site to ./out/
npm run start    # Serve production build locally
npm run lint     # Run ESLint
```

**There are no test commands.** This project has no test suite.

---

## Repository Structure

```
nostem.github.io/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root layout (ThemeProvider, Navigation, Footer)
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css       # Global styles + CSS custom properties
│   │   ├── not-found.tsx     # 404 page
│   │   ├── books/
│   │   │   ├── page.tsx              # Bookshelf page (shelf/timeline view toggle)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # Book detail server component
│   │   │       └── BookDetailClient.tsx  # Book detail client component
│   │   ├── writing/
│   │   │   └── page.tsx      # Writing page (Essays, Poems, Random tabs)
│   │   └── about/
│   │       └── page.tsx      # About page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx     # Header nav + theme toggle + mobile menu
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   └── PageTransition.tsx # Framer Motion page transition wrapper
│   │   ├── home/
│   │   │   ├── HeroSection.tsx    # Hero with typewriter effect
│   │   │   └── NowSection.tsx     # "What I'm doing now" section
│   │   └── books/
│   │       ├── BookShelf3D.tsx    # 3D animated book shelf
│   │       ├── BookFilter.tsx     # Year filter for books
│   │       └── ReadingTimeline.tsx # Timeline view of reading history
│   ├── data/
│   │   └── books.ts           # Static book data array (source of truth)
│   ├── lib/
│   │   └── books.ts           # Book data helpers (getBookBySlug, etc.)
│   ├── hooks/
│   │   ├── useTypewriter.ts   # Typewriter text animation hook
│   │   └── useScrollReveal.ts # Scroll-triggered reveal animations
│   └── types/
│       └── index.ts           # TypeScript interfaces (Book, BooksByYear)
├── public/
│   └── favicon.ico
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI: build → deploy to GitHub Pages on push to main
├── next.config.mjs            # output: 'export', trailingSlash: true
├── tailwind.config.ts         # Custom palette, fonts, animations
├── tsconfig.json              # Path alias: @/* → ./src/*
└── package.json
```

---

## Key Conventions

### Component Patterns

- All interactive/hook-using components have `'use client'` at the top.
- Pages that use server-side data fetching are server components (no directive).
- Props are typed with inline TypeScript interfaces.
- All components use default exports.

```tsx
// Client component pattern
'use client';
import { useState } from 'react';

interface Props {
  title: string;
}

export default function MyComponent({ title }: Props) { ... }
```

### Path Aliases

Always use `@/` for imports from `src/`:

```ts
import { Book } from '@/types';
import { getBookBySlug } from '@/lib/books';
```

### Styling

- **Tailwind utility classes** are the primary styling mechanism.
- **Custom CSS variables** (defined in `src/app/globals.css`) drive theming:
  - `--color-bg`, `--color-text`, `--color-accent`, `--color-muted`, etc.
  - Light theme: set on `html` by default; dark theme: set via `.dark` class on `html`.
- Custom Tailwind tokens (see `tailwind.config.ts`):
  - Colors: `parchment`, `burgundy`, `ochre`, `forest`, `slate-warm`, `ink`
  - Fonts: `font-special-elite`, `font-lora`
  - Animations: `fade-slide-up`, `float`
  - Shadows: `book`, `page`
  - Max-width: `max-w-page` (820px), `max-w-wide` (1100px)
- Avoid inline styles unless absolutely necessary for dynamic values.

### Theming (Dark Mode)

Dark mode is toggled by adding/removing the `dark` class on `<html>`. Use `next-themes`' `useTheme` hook to read/set the theme. CSS variables handle the actual color switching in `globals.css`.

### Animations

Use **Framer Motion** for all animations:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
>
```

- Stagger list items by passing `index * 0.1` as delay.
- Wrap pages in `<PageTransition>` for route change animations.
- Use `useScrollReveal` hook for scroll-triggered reveals.

### Data Layer

Book data lives entirely in `src/data/books.ts` as a static array. Helper functions in `src/lib/books.ts` provide access patterns:

```ts
getBookBySlug(slug)     // single book
getBooksByYear()        // Record<number, Book[]>
getAllSlugs()            // string[] for static params
```

When adding new books, edit **only** `src/data/books.ts`. All other data-access code derives from it automatically.

### Routing

- `app/` directory uses Next.js App Router.
- Dynamic routes: `books/[slug]/` — slugs are derived from book titles via `getAllSlugs()`.
- `generateStaticParams()` must be exported from any `[slug]/page.tsx` for static export compatibility.

### Accessibility

- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`).
- Add `aria-label` to icon-only interactive elements.
- Use `rel="noopener noreferrer"` on all external `<a>` tags.
- Use `loading="lazy"` on non-critical images.

---

## Static Export Constraints

This site uses `output: 'export'` in `next.config.mjs`, which means:

- **No server-side features**: No API routes, no `getServerSideProps`, no middleware, no ISR.
- **No `next/image` optimization**: Images are unoptimized (`images: { unoptimized: true }`).
- **All routes must be statically known at build time**: Dynamic routes require `generateStaticParams()`.
- **Trailing slashes**: URLs end with `/` (configured via `trailingSlash: true`).
- Build output goes to `./out/` (uploaded to GitHub Pages by CI).

Do not introduce any Next.js features that require a Node.js runtime.

---

## CI/CD Pipeline

Defined in `.github/workflows/deploy.yml`:

1. Triggered on push to `main`.
2. Runs on `ubuntu-latest` with Node 20.
3. Installs deps (`npm ci`), builds (`npm run build`), uploads `./out/`.
4. Deploys to GitHub Pages via `actions/deploy-pages@v4`.

Development branches are **not** auto-deployed. Only merges to `main` deploy the site.

---

## What Does Not Exist (Yet)

- **No tests** — no Jest, Vitest, or any testing library.
- **No CMS** — all content (books, bio) is hardcoded in source files.
- **No writing content** — the Writing page (`/writing`) is a placeholder with tab structure but no real essays/poems yet.
- **No search** — no search functionality.
- **No analytics** — no tracking scripts.

---

## Common Tasks

### Add a new book

Edit `src/data/books.ts` and append to the array:

```ts
{
  title: 'Book Title',
  author: 'Author Name',
  coverUrl: 'https://...', // external image URL
  yearRead: 2025,
  slug: 'book-title',      // URL-safe slug, must be unique
  description: 'Optional short description.',
  category: 'Optional category string.',
}
```

### Add a new page

Create `src/app/<route>/page.tsx`. Server components by default; add `'use client'` only if hooks/interactivity are needed. Wrap the page body in `<PageTransition>` for consistent route animations.

### Modify the color palette or fonts

Edit `tailwind.config.ts` (for Tailwind tokens) and `src/app/globals.css` (for CSS custom properties and theme variables).

### Modify navigation links

Edit `src/components/layout/Navigation.tsx`. The `navLinks` array at the top of the file controls the displayed items.
