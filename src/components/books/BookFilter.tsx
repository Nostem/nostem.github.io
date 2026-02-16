'use client';

interface BookFilterProps {
  years: number[];
  activeYear: number | null;
  totalCount: number;
  bookCounts: Record<number, number>;
  onYearChange: (year: number | null) => void;
}

export default function BookFilter({ years, activeYear, totalCount, bookCounts, onYearChange }: BookFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap mb-8">
      <button
        className={`filter-pill ${activeYear === null ? 'active' : ''}`}
        onClick={() => onYearChange(null)}
      >
        All ({totalCount})
      </button>
      {years.map((year) => (
        <button
          key={year}
          className={`filter-pill ${activeYear === year ? 'active' : ''}`}
          onClick={() => onYearChange(year)}
        >
          {year} ({bookCounts[year] || 0})
        </button>
      ))}
    </div>
  );
}
