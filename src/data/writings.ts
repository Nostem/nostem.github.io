import { WritingEntry } from '@/types';

export const writings: WritingEntry[] = [
  {
    slug: 'on-building-quiet-systems',
    title: 'On Building Quiet Systems',
    category: 'Essays',
    date: '2026-02-12',
    excerpt:
      'A short note on designing tools that reduce noise, increase agency, and leave room for reflection.',
    content: [
      'Most systems ask for constant attention. Better ones return attention to the person using them.',
      'I want software to feel like a well-organized workshop: everything has a place, and nothing shouts for no reason.',
      'Quiet systems do not hide complexity. They sequence it. They reveal the next meaningful step, then get out of the way.'
    ],
    published: true
  },
  {
    slug: 'margin-notes-at-dawn',
    title: 'Margin Notes at Dawn',
    category: 'Poems',
    date: '2026-01-08',
    excerpt:
      'A brief poem about paper, first light, and remembering what matters before the day accelerates.',
    content: [
      'Before screens wake, the page already listens.',
      'Ink holds a steadier pulse than headlines.',
      'In the margin, small truths survive the weather of the week.'
    ],
    published: true
  },
  {
    slug: 'three-small-experiments',
    title: 'Three Small Experiments',
    category: 'Random',
    date: '2025-12-20',
    excerpt:
      'Three lightweight practices for better decisions: lower input noise, faster feedback loops, and weekly debriefs.',
    content: [
      'Experiment one: remove one recurring input source for seven days and track clarity.',
      'Experiment two: shorten your feedback loop by shipping tiny versions of ideas early.',
      'Experiment three: run a weekly review that asks what created energy and what drained it.'
    ],
    published: true
  }
];
