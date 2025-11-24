'use client'

import Link from 'next/link'

const POPULAR_GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Thriller',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Adventure',
]

export function GenreChips() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {POPULAR_GENRES.map((genre) => (
        <Link
          key={genre}
          href={`/search?genre=${encodeURIComponent(genre)}`}
          className="group px-6 py-2.5 bg-muted hover:bg-accent hover:text-white rounded-full text-sm font-medium
            transition-all duration-200 hover:scale-105 hover:shadow-md"
        >
          {genre}
        </Link>
      ))}
    </div>
  )
}
