'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SearchFilters } from '@/lib/api/tmdb'

interface Movie {
  id: number
  title: string
  posterUrl: string
  description: string
  rating?: number
  releaseYear?: string
}

export function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)

  const query = searchParams.get('q') || ''
  const genre = searchParams.get('genre')
  const year = searchParams.get('year') ? Number(searchParams.get('year')) : null
  const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : null
  const minRuntime = searchParams.get('minRuntime') ? Number(searchParams.get('minRuntime')) : null
  const maxRuntime = searchParams.get('maxRuntime') ? Number(searchParams.get('maxRuntime')) : null
  const rating = searchParams.get('rating')
  const actor = searchParams.get('actor')
  const director = searchParams.get('director')
  const writer = searchParams.get('writer')
  const producer = searchParams.get('producer')
  const productionHouse = searchParams.get('productionHouse')

  const filters: SearchFilters = {}
  if (query) filters.query = query
  if (genre) filters.genre = genre
  if (year) filters.year = year
  if (minRating) filters.minRating = minRating
  if (minRuntime) filters.minRuntime = minRuntime
  if (maxRuntime) filters.maxRuntime = maxRuntime
  if (rating) filters.rating = rating
  if (actor) filters.actor = actor
  if (director) filters.director = director
  if (writer) filters.writer = writer
  if (producer) filters.producer = producer
  if (productionHouse) filters.productionHouse = productionHouse

  const activeFilterCount = [genre, year, minRating, minRuntime, maxRuntime, rating, actor, director, writer, producer, productionHouse].filter(Boolean).length


  useEffect(() => {
    if (!query && !genre && !year && !minRating && !minRuntime && !maxRuntime && !rating && !actor && !director && !writer && !producer && !productionHouse) {
      setMovies([])
      return
    }

    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (genre) params.set('genre', genre)
        if (year) params.set('year', String(year))
        if (minRating) params.set('minRating', String(minRating))
        if (minRuntime) params.set('minRuntime', String(minRuntime))
        if (maxRuntime) params.set('maxRuntime', String(maxRuntime))
        if (rating) params.set('rating', rating)
        if (actor) params.set('actor', actor)
        if (director) params.set('director', director)
        if (writer) params.set('writer', writer)
        if (producer) params.set('producer', producer)
        if (productionHouse) params.set('productionHouse', productionHouse)

        const res = await fetch(`/api/search?${params}`)
        if (!res.ok) throw new Error('Search failed')

        const data = await res.json()
        setMovies(data.movies)
        setTotalResults(data.totalResults || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, genre, year, minRating, minRuntime, maxRuntime, rating, actor, director, writer, producer, productionHouse])

  const handleApplyFilters = (newFilters: SearchFilters) => {
    const params = new URLSearchParams()
    if (newFilters.query) params.set('q', newFilters.query)
    if (newFilters.genre) params.set('genre', newFilters.genre)
    if (newFilters.year) params.set('year', String(newFilters.year))
    if (newFilters.minRating) params.set('minRating', String(newFilters.minRating))
    if (newFilters.minRuntime) params.set('minRuntime', String(newFilters.minRuntime))
    if (newFilters.maxRuntime) params.set('maxRuntime', String(newFilters.maxRuntime))
    if (newFilters.rating) params.set('rating', newFilters.rating)
    if (newFilters.actor) params.set('actor', newFilters.actor)
    if (newFilters.director) params.set('director', newFilters.director)
    if (newFilters.writer) params.set('writer', newFilters.writer)
    if (newFilters.producer) params.set('producer', newFilters.producer)
    if (newFilters.productionHouse) params.set('productionHouse', newFilters.productionHouse)

    router.push(`/search?${params}`)
  }

  const clearFilter = (key: keyof SearchFilters) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    handleApplyFilters(newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {genre && (
            <FilterChip label={`Genre: ${genre}`} onRemove={() => clearFilter('genre')} />
          )}
          {year && (
            <FilterChip label={`Year: ${year}`} onRemove={() => clearFilter('year')} />
          )}
          {rating && (
            <FilterChip label={`Rating: ${rating}`} onRemove={() => clearFilter('rating')} />
          )}
          {minRating && (
            <FilterChip label={`Min Rating: ${minRating}+`} onRemove={() => clearFilter('minRating')} />
          )}
          {(minRuntime || maxRuntime) && (
            <FilterChip
              label={`Runtime: ${minRuntime || 0}-${maxRuntime || '∞'} min`}
              onRemove={() => {
                clearFilter('minRuntime')
                clearFilter('maxRuntime')
              }}
            />
          )}
          {actor && (
            <FilterChip label={`Actor: ${actor}`} onRemove={() => clearFilter('actor')} />
          )}
          {director && (
            <FilterChip label={`Director: ${director}`} onRemove={() => clearFilter('director')} />
          )}
          {writer && (
            <FilterChip label={`Writer: ${writer}`} onRemove={() => clearFilter('writer')} />
          )}
          {producer && (
            <FilterChip label={`Producer: ${producer}`} onRemove={() => clearFilter('producer')} />
          )}
          {productionHouse && (
            <FilterChip label={`Studio: ${productionHouse}`} onRemove={() => clearFilter('productionHouse')} />
          )}
        </div>
      )}

        {/* Results Header */}
        {query && (
          <div>
            <h1 className="text-2xl font-bold">
              Search results for "{query}"
            </h1>
            {!loading && totalResults > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Found {totalResults.toLocaleString()} {totalResults === 1 ? 'result' : 'results'}
              </p>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                <div className="h-4 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted mb-2 relative">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {movie.rating && (
                      <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded-md text-xs font-semibold text-white">
                        ⭐ {movie.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-accent transition-colors">
                    {movie.title}
                  </h3>
                  {movie.releaseYear && (
                    <p className="text-xs text-muted-foreground mt-0.5">{movie.releaseYear}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && (query || activeFilterCount > 0) && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-muted-foreground mb-4"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}

      {/* Initial State */}
      {!loading && !error && movies.length === 0 && !query && activeFilterCount === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-muted-foreground mb-4"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Start searching</h3>
          <p className="text-sm text-muted-foreground">
            Use the search form on the home page to find movies
          </p>
        </div>
      )}
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-accent/20 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <svg className="w-3.5 h-3.5" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
