import { SearchCriteria, MovieSearchResult, Movie } from '../types';
import { discoverRandomMoviesFromTMDB } from './tmdbService';

// Replace Gemini-based fetch with TMDB discover + randomization
export async function fetchMovies(
  criteria: SearchCriteria,
  isFeelingLucky: boolean = false,
  aiCurate: boolean = true,
  mainstreamOnly: boolean = true,
  count: number = 10
): Promise<MovieSearchResult> {
  try {
    // Fetch a larger candidate pool (at least 3x the requested count), then rerank to top count
    const candidateCount = Math.max(30, count * 3);
    const candidates = await discoverRandomMoviesFromTMDB(
      {
        genre: criteria.genre,
        releaseYear: criteria.releaseYear,
        runtime: criteria.runtime,
        rating: criteria.rating,
        actor: criteria.actor,
        director: criteria.director,
        writer: criteria.writer,
        producer: criteria.producer,
        productionHouse: criteria.productionHouse,
      },
      candidateCount,
      { mainstreamOnly }
    );

    let movies: Movie[] = candidates;
    if (aiCurate) {
      try {
        const response = await fetch('/api/rerank', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            criteria,
            candidates: candidates.map(c => ({
              title: c.title,
              description: c.description,
              actors: c.actors,
              director: c.director,
            })),
          }),
    });
        if (response.ok) {
          const data = await response.json();
          const ranked = (data?.ranked || []) as Array<{ idx: number; score: number }>;
          const top = ranked
            .filter(r => typeof r.idx === 'number')
            .slice(0, count)
            .map(r => candidates[r.idx])
            .filter(Boolean);
          movies = top.length > 0 ? top : candidates.slice(0, count);
        } else {
          movies = candidates.slice(0, count);
        }
      } catch {
        movies = candidates.slice(0, count);
      }
    } else {
      movies = candidates.slice(0, count);
    }

    return { movies, sources: [] };
  } catch (error) {
    console.error('Error fetching movies via TMDB only flow:', error);
    const message = error instanceof Error ? error.message : 'Unknown TMDB error';
    throw new Error(`Failed to fetch movies: ${message}`);
  }
}
