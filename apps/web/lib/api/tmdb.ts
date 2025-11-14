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