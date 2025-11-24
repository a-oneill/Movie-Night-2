'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SearchFilters } from '@/lib/api/tmdb'

const YEARS = Array.from({ length: 105 }, (_, i) => new Date().getFullYear() - i)

const RUNTIME_OPTIONS = [
  { label: 'Any Runtime', value: '', min: undefined, max: undefined },
  { label: 'Under 90 min', value: '<90', min: undefined, max: 90 },
  { label: '90-120 min', value: '90-120', min: 90, max: 120 },
  { label: 'Over 120 min', value: '>120', min: 120, max: undefined },
]

const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17']

interface AdvancedSearchFormProps {
  onSearch?: (filters: SearchFilters) => void
}

export function AdvancedSearchForm({ onSearch }: AdvancedSearchFormProps) {
  const router = useRouter()
  const [genres, setGenres] = useState<Array<{ id: number; name: string }>>([])
  const [filters, setFilters] = useState<SearchFilters>({})
  const [isSearching, setIsSearching] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('/api/search/genres')
        if (res.ok) {
          const data = await res.json()
          setGenres(data.genres)
        }
      } catch (err) {
        console.error('Failed to fetch genres:', err)
      }
    }
    fetchGenres()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Build URL params
    const params = new URLSearchParams()
    if (filters.genre) params.set('genre', filters.genre)
    if (filters.year) params.set('year', String(filters.year))
    if (filters.rating) params.set('rating', filters.rating)
    if (filters.minRuntime) params.set('minRuntime', String(filters.minRuntime))
    if (filters.maxRuntime) params.set('maxRuntime', String(filters.maxRuntime))
    if (filters.actor) params.set('actor', filters.actor)
    if (filters.director) params.set('director', filters.director)
    if (filters.writer) params.set('writer', filters.writer)
    if (filters.producer) params.set('producer', filters.producer)
    if (filters.productionHouse) params.set('productionHouse', filters.productionHouse)

    router.push(`/search?${params}`)
    setIsSearching(false)
  }

  const handleRuntimeChange = (option: typeof RUNTIME_OPTIONS[0]) => {
    const newFilters = { ...filters }
    if (option.min !== undefined) {
      newFilters.minRuntime = option.min
    } else {
      delete newFilters.minRuntime
    }
    if (option.max !== undefined) {
      newFilters.maxRuntime = option.max
    } else {
      delete newFilters.maxRuntime
    }
    setFilters(newFilters)
  }

  const selectedRuntime = RUNTIME_OPTIONS.find(
    opt => opt.min === filters.minRuntime && opt.max === filters.maxRuntime
  ) ?? RUNTIME_OPTIONS[0]!

  const filteredGenres = genres.filter(genre =>
    genre.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      // Check if it matches a genre
      const matchedGenre = genres.find(
        g => g.name.toLowerCase() === searchInput.toLowerCase()
      )
      if (matchedGenre) {
        router.push(`/search?genre=${matchedGenre.name}`)
      } else {
        // Search as general query
        router.push(`/search?q=${encodeURIComponent(searchInput)}`)
      }
      setIsSearching(false)
    }
  }

  const selectGenre = (genreName: string) => {
    setSearchInput(genreName)
    setFilters({ ...filters, genre: genreName })
    setShowSuggestions(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Quick Search Bar */}
      <div className="relative" ref={searchRef}>
        <form onSubmit={handleQuickSearch} className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              setShowSuggestions(e.target.value.length > 0)
            }}
            onFocus={() => setShowSuggestions(searchInput.length > 0)}
            placeholder="Search by genre, title, actor, or director..."
            className="w-full px-6 py-4 pr-24 bg-background border-2 border-border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />

          {/* Advanced Filters Toggle Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            Filters
          </button>
        </form>

        {/* Genre Suggestions Dropdown */}
        {showSuggestions && filteredGenres.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-xl shadow-xl max-h-64 overflow-y-auto">
            {filteredGenres.slice(0, 8).map((genre) => (
              <button
                key={genre.id}
                type="button"
                onClick={() => selectGenre(genre.name)}
                className="w-full px-6 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3 border-b border-border last:border-b-0"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <span className="font-medium">{genre.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Search Panel */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Genre */}
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <select
                  value={filters.genre || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.genre = e.target.value
                    } else {
                      delete newFilters.genre
                    }
                    setFilters(newFilters)
                  }}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium mb-2">Release Year</label>
                <select
                  value={filters.year || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.year = Number(e.target.value)
                    } else {
                      delete newFilters.year
                    }
                    setFilters(newFilters)
                  }}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Any Year</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Runtime */}
              <div>
                <label className="block text-sm font-medium mb-2">Runtime</label>
                <select
                  value={selectedRuntime.label}
                  onChange={(e) => {
                    const option = RUNTIME_OPTIONS.find(opt => opt.label === e.target.value)
                    if (option) handleRuntimeChange(option)
                  }}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {RUNTIME_OPTIONS.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.rating = e.target.value
                    } else {
                      delete newFilters.rating
                    }
                    setFilters(newFilters)
                  }}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Any Rating</option>
                  {RATINGS.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actor */}
              <div>
                <label className="block text-sm font-medium mb-2">Actor</label>
                <input
                  type="text"
                  value={filters.actor || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.actor = e.target.value
                    } else {
                      delete newFilters.actor
                    }
                    setFilters(newFilters)
                  }}
                  placeholder="e.g. Tom Hanks"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* Director */}
              <div>
                <label className="block text-sm font-medium mb-2">Director</label>
                <input
                  type="text"
                  value={filters.director || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.director = e.target.value
                    } else {
                      delete newFilters.director
                    }
                    setFilters(newFilters)
                  }}
                  placeholder="e.g. Christopher Nolan"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* Writer */}
              <div>
                <label className="block text-sm font-medium mb-2">Writer</label>
                <input
                  type="text"
                  value={filters.writer || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.writer = e.target.value
                    } else {
                      delete newFilters.writer
                    }
                    setFilters(newFilters)
                  }}
                  placeholder="e.g. Aaron Sorkin"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* Producer */}
              <div>
                <label className="block text-sm font-medium mb-2">Producer</label>
                <input
                  type="text"
                  value={filters.producer || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.producer = e.target.value
                    } else {
                      delete newFilters.producer
                    }
                    setFilters(newFilters)
                  }}
                  placeholder="e.g. Kathleen Kennedy"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* Production House */}
              <div>
                <label className="block text-sm font-medium mb-2">Production House</label>
                <input
                  type="text"
                  value={filters.productionHouse || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters }
                    if (e.target.value) {
                      newFilters.productionHouse = e.target.value
                    } else {
                      delete newFilters.productionHouse
                    }
                    setFilters(newFilters)
                  }}
                  placeholder="e.g. Warner Bros"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => setFilters({})}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear All
              </button>
              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Search Movies'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
