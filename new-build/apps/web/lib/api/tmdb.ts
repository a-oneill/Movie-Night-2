import { tmdbGet } from '@/lib/api/tmdbClient'

export async function getPopular(count: number = 10) {
  const data = await tmdbGet('movie/popular', { language: 'en-US', page: 1 }, { ttlMs: 60_000 })
  const ids = (data.results || []).slice(0, count).map((r: any) => r.id)
  const hydrated = await Promise.all(ids.map(async (id: number) => {
    const details = await tmdbGet(`movie/${id}`, { append_to_response: 'credits,images,videos,releases' }, { ttlMs: 10 * 60_000 })
    return {
      id: details.id,
      title: details.title,
      posterUrl: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : `https://picsum.photos/400/600?random=${details.title}`,
      description: details.overview || '',
      director: (details.credits?.crew || []).find((c: any) => c.job === 'Director')?.name || '',
      actors: (details.credits?.cast || []).slice(0, 4).map((a: any) => a.name)
    }
  }))
  return hydrated.filter(Boolean)
}

export async function getTopRated(count: number = 10) {
  const data = await tmdbGet('movie/top_rated', { language: 'en-US', page: 1 }, { ttlMs: 60_000 })
  const ids = (data.results || []).slice(0, count).map((r: any) => r.id)
  const hydrated = await Promise.all(ids.map(async (id: number) => {
    const details = await tmdbGet(`movie/${id}`, { append_to_response: 'credits,images,videos,releases' }, { ttlMs: 10 * 60_000 })
    return {
      id: details.id,
      title: details.title,
      posterUrl: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : `https://picsum.photos/400/600?random=${details.title}`,
      description: details.overview || '',
      director: (details.credits?.crew || []).find((c: any) => c.job === 'Director')?.name || '',
      actors: (details.credits?.cast || []).slice(0, 4).map((a: any) => a.name)
    }
  }))
  return hydrated.filter(Boolean)
}

export async function getDetails(id: number) {
  const details = await tmdbGet(`movie/${id}`, { append_to_response: 'credits,images,videos,releases' }, { ttlMs: 10 * 60_000 })
  const cast = (details.credits?.cast || []).slice(0, 10).map((a: any) => ({
    id: a.id,
    name: a.name,
    character: a.character
  }))
  return {
    id: details.id,
    title: details.title,
    posterUrl: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : `https://picsum.photos/400/600?random=${details.title}`,
    backdropUrl: details.backdrop_path ? `https://image.tmdb.org/t/p/w780${details.backdrop_path}` : undefined,
    description: details.overview || '',
    director: (details.credits?.crew || []).find((c: any) => c.job === 'Director')?.name || '',
    actors: (details.credits?.cast || []).slice(0, 4).map((a: any) => a.name),
    genres: (details.genres || []).map((g: any) => g.name),
    runtimeMinutes: details.runtime || undefined,
    releaseYear: (details.release_date || '').slice(0, 4) || undefined,
    rating: typeof details.vote_average === 'number' ? Number(details.vote_average) : undefined,
    voteCount: typeof details.vote_count === 'number' ? Number(details.vote_count) : undefined,
    cast
  }
}

export interface SearchFilters {
  query?: string
  genre?: string
  year?: number
  minRating?: number
  maxRuntime?: number
  minRuntime?: number
  rating?: string
  actor?: string
  director?: string
  writer?: string
  producer?: string
  productionHouse?: string
}

export async function searchMovies(filters: SearchFilters, page: number = 1) {
  const { query, genre, year, minRating, maxRuntime, minRuntime, actor, director, writer, producer, productionHouse } = filters

  // Helper to search for a person and get their ID
  async function getPersonId(name: string): Promise<number | null> {
    try {
      const data = await tmdbGet('search/person', {
        query: name.trim(),
        language: 'en-US',
        page: 1
      }, { ttlMs: 30_000 })
      const person = (data.results || [])[0]
      return person?.id || null
    } catch {
      return null
    }
  }

  // Helper to search for a company and get its ID
  async function getCompanyId(name: string): Promise<number | null> {
    try {
      const data = await tmdbGet('search/company', {
        query: name.trim(),
        page: 1
      }, { ttlMs: 30_000 })
      const company = (data.results || [])[0]
      return company?.id || null
    } catch {
      return null
    }
  }

  // If searching by people or company, use discover with their IDs
  if (actor || director || writer || producer || productionHouse) {
    const params: any = {
      language: 'en-US',
      page,
      include_adult: false,
      sort_by: 'popularity.desc'
    }

    if (actor) {
      const actorId = await getPersonId(actor)
      if (actorId) params.with_cast = actorId
    }

    if (director) {
      const directorId = await getPersonId(director)
      if (directorId) params.with_crew = directorId
    }

    if (writer) {
      const writerId = await getPersonId(writer)
      if (writerId) params.with_people = writerId
    }

    if (producer) {
      const producerId = await getPersonId(producer)
      if (producerId) {
        // Add producer to crew filter (TMDB doesn't have specific producer filter)
        if (!params.with_crew) params.with_crew = producerId
      }
    }

    if (productionHouse) {
      const companyId = await getCompanyId(productionHouse)
      if (companyId) params.with_companies = companyId
    }

    if (genre) {
      const genreData = await tmdbGet('genre/movie/list', { language: 'en-US' }, { ttlMs: 24 * 60 * 60_000 })
      const genreId = (genreData.genres || []).find((g: any) => g.name === genre)?.id
      if (genreId) params.with_genres = genreId
    }
    if (year) params.primary_release_year = year
    if (minRating) params['vote_average.gte'] = minRating
    if (maxRuntime) params['with_runtime.lte'] = maxRuntime
    if (minRuntime) params['with_runtime.gte'] = minRuntime

    const data = await tmdbGet('discover/movie', params, { ttlMs: 30_000 })
    const movies = (data.results || []).slice(0, 20).map((r: any) => ({
      id: r.id,
      title: r.title,
      posterUrl: r.poster_path ? `https://image.tmdb.org/t/p/w500${r.poster_path}` : `https://picsum.photos/400/600?random=${r.title}`,
      description: r.overview || '',
      rating: typeof r.vote_average === 'number' ? Number(r.vote_average) : undefined,
      releaseYear: (r.release_date || '').slice(0, 4) || undefined
    }))

    return { movies, totalResults: data.total_results || 0, totalPages: data.total_pages || 0 }
  }

  // If there's a text query, use TMDB's search endpoint
  if (query && query.trim()) {
    const data = await tmdbGet('search/movie', {
      query: query.trim(),
      language: 'en-US',
      page,
      include_adult: false
    }, { ttlMs: 30_000 })

    let results = data.results || []

    // Apply additional filters client-side
    if (genre) {
      const genreData = await tmdbGet('genre/movie/list', { language: 'en-US' }, { ttlMs: 24 * 60 * 60_000 })
      const genreId = (genreData.genres || []).find((g: any) => g.name === genre)?.id
      if (genreId) {
        results = results.filter((r: any) => (r.genre_ids || []).includes(genreId))
      }
    }
    if (year) {
      results = results.filter((r: any) => r.release_date?.startsWith(String(year)))
    }
    if (minRating) {
      results = results.filter((r: any) => r.vote_average >= minRating)
    }

    // Map results
    const movies = results.slice(0, 20).map((r: any) => ({
      id: r.id,
      title: r.title,
      posterUrl: r.poster_path ? `https://image.tmdb.org/t/p/w500${r.poster_path}` : `https://picsum.photos/400/600?random=${r.title}`,
      description: r.overview || '',
      rating: typeof r.vote_average === 'number' ? Number(r.vote_average) : undefined,
      releaseYear: (r.release_date || '').slice(0, 4) || undefined
    }))

    return { movies, totalResults: data.total_results || 0, totalPages: data.total_pages || 0 }
  }

  // Otherwise, use discover endpoint with filters
  const params: any = {
    language: 'en-US',
    page,
    include_adult: false,
    sort_by: 'popularity.desc'
  }

  if (genre) {
    const genreData = await tmdbGet('genre/movie/list', { language: 'en-US' }, { ttlMs: 24 * 60 * 60_000 })
    const genreId = (genreData.genres || []).find((g: any) => g.name === genre)?.id
    if (genreId) params.with_genres = genreId
  }
  if (year) params.primary_release_year = year
  if (minRating) params['vote_average.gte'] = minRating
  if (maxRuntime) params['with_runtime.lte'] = maxRuntime
  if (minRuntime) params['with_runtime.gte'] = minRuntime

  const data = await tmdbGet('discover/movie', params, { ttlMs: 30_000 })
  const movies = (data.results || []).slice(0, 20).map((r: any) => ({
    id: r.id,
    title: r.title,
    posterUrl: r.poster_path ? `https://image.tmdb.org/t/p/w500${r.poster_path}` : `https://picsum.photos/400/600?random=${r.title}`,
    description: r.overview || '',
    rating: typeof r.vote_average === 'number' ? Number(r.vote_average) : undefined,
    releaseYear: (r.release_date || '').slice(0, 4) || undefined
  }))

  return { movies, totalResults: data.total_results || 0, totalPages: data.total_pages || 0 }
}

export async function getGenres() {
  const data = await tmdbGet('genre/movie/list', { language: 'en-US' }, { ttlMs: 24 * 60 * 60_000 })
  return (data.genres || []).map((g: any) => ({ id: g.id, name: g.name }))
}