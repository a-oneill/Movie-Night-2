import { Movie, WatchProvider, WatchProviderType } from '../types';

const TMDB_API_KEY = 'edfad5a0f1a631fbfb903777e45634e4';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185';
const TMDB_PROVIDER_LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w92';

if (!TMDB_API_KEY) {
  console.warn("TMDB_API_KEY environment variable not set. Movie details cannot be fetched from TMDB.");
}

async function apiFetch(endpoint: string): Promise<any> {
  const url = `${TMDB_BASE_URL}/${endpoint}&api_key=${TMDB_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`TMDB API error for endpoint ${endpoint}:`, response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from TMDB endpoint ${endpoint}:`, error);
    return null;
  }
}

async function hydrateMoviesFromResults(results: any[], count: number): Promise<Movie[]> {
  const ids = results.slice(0, count).map((item: any) => item.id);
  const hydrated = await Promise.all(ids.map((id: number) => fetchMovieDetailsById(id)));
  return hydrated.filter((m): m is Movie => Boolean(m));
}

export async function fetchMovieDetailsFromTMDB(title: string, year: string): Promise<Movie | null> {
  if (!TMDB_API_KEY) return null;

  // 1. Search for the movie to get its ID
  const searchEndpoint = `search/movie?query=${encodeURIComponent(title)}&primary_release_year=${year}`;
  const searchResults = await apiFetch(searchEndpoint);
  
  if (!searchResults || searchResults.results.length === 0) {
    console.warn(`No TMDB results found for: ${title} (${year})`);
    return null;
  }
  
  const movieId = searchResults.results[0].id;

  // 2. Fetch detailed movie info including credits
  const movieDetailsEndpoint = `movie/${movieId}?append_to_response=credits,images,videos,releases`;
  const details = await apiFetch(movieDetailsEndpoint);

  if (!details) {
    return null;
  }
  
  const director = details.credits?.crew.find((c: any) => c.job === 'Director')?.name || 'N/A';
  const writers = details.credits?.crew
    .filter((c: any) => c.department === 'Writing')
    .slice(0, 2)
    .map((c: any) => c.name) || [];
  const cast = (details.credits?.cast || []).slice(0, 10).map((a: any) => ({
    id: a.id,
    name: a.name,
    character: a.character,
    profileUrl: a.profile_path ? `${TMDB_PROFILE_BASE_URL}${a.profile_path}` : undefined,
    tmdbUrl: a.id ? `https://www.themoviedb.org/person/${a.id}` : undefined,
  }));
  const actors = cast.slice(0, 4).map((member: { name: string }) => member.name);
  const companies = (details.production_companies || []).map((c: any) => c.name);
  const certification = details.releases?.countries?.find((c: any) => c.iso_3166_1 === 'US')?.certification || '';
  const trailer = extractTrailer(details.videos);
  const watchProviders = await fetchWatchProviders(details.id);

  return {
    id: details.id,
    title: details.title,
    posterUrl: details.poster_path ? `${TMDB_IMAGE_BASE_URL}${details.poster_path}` : `https://picsum.photos/400/600?random=${details.title}`,
    backdropUrl: details.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${details.backdrop_path}` : undefined,
    description: details.overview,
    actors,
    director,
    writers,
    genres: (details.genres || []).map((g: any) => g.name),
    runtimeMinutes: details.runtime || undefined,
    releaseYear: (details.release_date || '').slice(0, 4) || undefined,
    certification: certification || undefined,
    productionCompanies: companies,
    rating: typeof details.vote_average === 'number' ? Number(details.vote_average) : undefined,
    voteCount: typeof details.vote_count === 'number' ? Number(details.vote_count) : undefined,
    tagline: details.tagline || undefined,
    trailerUrl: trailer,
    cast,
    watchProviders,
  };
}

// Map UI genre names to TMDB genre IDs
const GENRE_NAME_TO_ID: Record<string, number> = {
  "Action": 28,
  "Adventure": 12,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Documentary": 99,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Mystery": 9648,
  "Romance": 10749,
  "Sci-Fi": 878,
  "Thriller": 53,
  "War": 10752,
  "Western": 37,
};

function mapRuntimeToQuery(runtime: string): { min?: number; max?: number } {
  if (runtime === 'under 90 minutes') return { max: 90 };
  if (runtime === '90-120 minutes') return { min: 90, max: 120 };
  if (runtime === 'over 120 minutes') return { min: 120 };
  return {};
}

// Fetch minimal discover results (IDs) then hydrate details with credits for UI needs
// Search for a person by name and return their ID
// Prioritizes by popularity to ensure the most famous person with that name is returned
async function searchPersonId(name: string, department?: string): Promise<number | null> {
  if (!name.trim()) return null;
  const data = await apiFetch(`search/person?query=${encodeURIComponent(name)}`);
  if (data && data.results && data.results.length > 0) {
    // Sort by popularity (highest first)
    const sorted = data.results.sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0));

    // If department is specified (e.g., 'Directing'), try to find someone with that in their known_for_department
    if (department) {
      const filtered = sorted.filter((p: any) =>
        p.known_for_department && p.known_for_department.toLowerCase().includes(department.toLowerCase())
      );
      if (filtered.length > 0) {
        return filtered[0].id;
      }
    }

    // Otherwise return the most popular person
    return sorted[0].id;
  }
  return null;
}

// Search for a company by name and return its ID
async function searchCompanyId(name: string): Promise<number | null> {
  if (!name.trim()) return null;
  const data = await apiFetch(`search/company?query=${encodeURIComponent(name)}`);
  if (data && data.results && data.results.length > 0) {
    return data.results[0].id;
  }
  return null;
}

// Fetch movie IDs where a person had a specific crew role (e.g., Director)
async function fetchMovieIdsByPersonAndJob(personId: number, job: string): Promise<number[]> {
  const data = await apiFetch(`person/${personId}/movie_credits?language=en-US`);
  if (!data || !data.crew) return [];

  // Filter crew credits by the specific job and return movie IDs
  const movieIds = data.crew
    .filter((credit: any) => credit.job === job)
    .map((credit: any) => credit.id)
    .filter((id: number) => id != null);

  return movieIds;
}

export async function discoverRandomMoviesFromTMDB(criteria: {
  genre?: string;
  releaseYear?: string;
  runtime?: string;
  rating?: string;
  actor?: string;
  director?: string;
  writer?: string;
  producer?: string;
  productionHouse?: string;
}, count: number = 10, options?: { mainstreamOnly?: boolean }): Promise<Movie[]> {
  if (!TMDB_API_KEY) return [];

  // Special handling for director searches
  // Since TMDB's with_crew doesn't filter by job, we need to get director's movies directly
  let directorMovieIds: number[] = [];
  if (criteria.director) {
    const directorId = await searchPersonId(criteria.director, 'Directing');
    if (directorId) {
      directorMovieIds = await fetchMovieIdsByPersonAndJob(directorId, 'Director');
      // If no movies found for this director, return empty
      if (directorMovieIds.length === 0) return [];
    }
  }

  const params: string[] = ['sort_by=popularity.desc', 'include_adult=false', 'language=en-US'];

  // Handle person-based searches
  const personIds: number[] = [];

  if (criteria.actor) {
    const actorId = await searchPersonId(criteria.actor, 'Acting');
    if (actorId) personIds.push(actorId);
  }

  if (criteria.writer) {
    const writerId = await searchPersonId(criteria.writer, 'Writing');
    if (writerId) params.push(`with_crew=${writerId}`);
  }

  if (criteria.producer) {
    const producerId = await searchPersonId(criteria.producer, 'Production');
    if (producerId) params.push(`with_crew=${producerId}`);
  }

  if (personIds.length > 0) {
    params.push(`with_cast=${personIds.join(',')}`);
  }

  // Handle production house
  if (criteria.productionHouse) {
    const companyId = await searchCompanyId(criteria.productionHouse);
    if (companyId) params.push(`with_companies=${companyId}`);
  }

  // Genre
  if (criteria.genre && GENRE_NAME_TO_ID[criteria.genre]) {
    params.push(`with_genres=${GENRE_NAME_TO_ID[criteria.genre]}`);
  }
  // Year
  if (criteria.releaseYear) {
    params.push(`primary_release_year=${encodeURIComponent(criteria.releaseYear)}`);
  }
  // Runtime
  const runtimeQuery = mapRuntimeToQuery(criteria.runtime || '');
  if (runtimeQuery.min !== undefined) params.push(`with_runtime.gte=${runtimeQuery.min}`);
  if (runtimeQuery.max !== undefined) params.push(`with_runtime.lte=${runtimeQuery.max}`);
  // Rating (MPAA-like). TMDB uses certification with country.
  if (criteria.rating) {
    params.push('certification_country=US');
    // Use <= to allow broader matches while favoring selected rating and below
    params.push(`certification.lte=${encodeURIComponent(criteria.rating)}`);
  }

  // To add randomness, choose a random page first, then sample results
  // First call page=1 to get total_pages (capped to 500 by TMDB)
  const mainstreamOnly = options?.mainstreamOnly !== false; // default true

  // Helper to fetch one random page for a given vote threshold
  const fetchOnePage = async (threshold?: number): Promise<any[]> => {
    const firstPageEndpoint = `discover/movie?${params.join('&')}${threshold !== undefined ? `&vote_count.gte=${threshold}` : ''}&page=1`;
    const first = await apiFetch(firstPageEndpoint);
    if (!first || !Array.isArray(first.results) || first.results.length === 0) return [];
    const totalPages = Math.min(Number(first.total_pages || 1), 500);
    const randomPage = Math.max(1, Math.floor(Math.random() * totalPages));
    const pageData = randomPage === 1 ? first : await apiFetch(`discover/movie?${params.join('&')}${threshold !== undefined ? `&vote_count.gte=${threshold}` : ''}&page=${randomPage}`);
    return pageData?.results || [];
  };

  // Accumulate unique candidate IDs, hydrating until we reach count
  const collected: Movie[] = [];
  const seenIds = new Set<number>();

  // Strategy: mainstream thresholds (if enabled) → no threshold → popular fallback
  const thresholds = mainstreamOnly ? [5000, 2000, 1000, 0] : [undefined];

  for (const t of thresholds) {
    let attempts = 0;
    while (collected.length < count && attempts < 5) {
      attempts++;
      const page = await fetchOnePage(t as number | undefined);
      if (!page.length) break;

      // Prioritize by vote_count/popularity then pick a few not yet seen
      const prioritized = page
        .slice()
        .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0) || (b.popularity ?? 0) - (a.popularity ?? 0));

      const needed = Math.max(0, count - collected.length);
      // Filter by director movies if director search is active
      const filtered = directorMovieIds.length > 0
        ? prioritized.filter(r => directorMovieIds.includes(r.id) && !seenIds.has(r.id))
        : prioritized.filter(r => !seenIds.has(r.id));

      const chosen = filtered.slice(0, Math.max(needed * 2, needed));
      chosen.forEach(r => seenIds.add(r.id));

      // Hydrate batch
      const hydrated = await Promise.all(chosen.map((r: any) => fetchMovieDetailsById(r.id)));
      for (const m of hydrated) {
        if (m) collected.push(m);
        if (collected.length >= count) break;
      }
    }
    if (collected.length >= count) break;
  }

  // Fallback to fill remaining slots
  if (collected.length < count) {
    const missing = count - collected.length;

    // If searching by director, use director's movies directly
    if (directorMovieIds.length > 0) {
      const unseen = directorMovieIds.filter(id => !seenIds.has(id));
      // Randomly pick from unseen director movies
      const randomPicks = unseen
        .sort(() => Math.random() - 0.5)
        .slice(0, missing * 2);

      const hydrated = await Promise.all(randomPicks.map((id: number) => fetchMovieDetailsById(id)));
      for (const m of hydrated) {
        if (m) collected.push(m);
        if (collected.length >= count) break;
      }
    } else {
      // Otherwise use popular movies fallback
      const first = await apiFetch(`movie/popular?language=en-US&page=1`);
      if (first && Array.isArray(first.results) && first.results.length) {
        const totalPages = Math.min(Number(first.total_pages || 1), 500);
        const randomPage = Math.max(1, Math.floor(Math.random() * totalPages));
        const pageData = randomPage === 1 ? first : await apiFetch(`movie/popular?language=en-US&page=${randomPage}`);
        const candidates = (pageData?.results || []).filter((r: any) => !seenIds.has(r.id)).slice(0, missing * 2);
        const hydrated = await Promise.all(candidates.map((r: any) => fetchMovieDetailsById(r.id)));
        for (const m of hydrated) {
          if (m) collected.push(m);
          if (collected.length >= count) break;
        }
      }
    }
  }

  // Ensure we return exactly count items if possible
  return collected.slice(0, count);
}

export async function fetchMovieDetailsById(movieId: number): Promise<Movie | null> {
  const details = await apiFetch(`movie/${movieId}?append_to_response=credits,images,videos,releases`);
  if (!details) return null;
  const director = details.credits?.crew.find((c: any) => c.job === 'Director')?.name || 'N/A';
  const writers = details.credits?.crew
    ?.filter((c: any) => c.department === 'Writing')
    ?.slice(0, 2)
    ?.map((c: any) => c.name) || [];
  const cast = (details.credits?.cast || []).slice(0, 10).map((a: any) => ({
    id: a.id,
    name: a.name,
    character: a.character,
    profileUrl: a.profile_path ? `${TMDB_PROFILE_BASE_URL}${a.profile_path}` : undefined,
    tmdbUrl: a.id ? `https://www.themoviedb.org/person/${a.id}` : undefined,
  }));
  const actors = cast.slice(0, 4).map((member: { name: string }) => member.name);
  const companies = (details.production_companies || []).map((c: any) => c.name);
  const certification = details.releases?.countries?.find((c: any) => c.iso_3166_1 === 'US')?.certification || '';
  const trailer = extractTrailer(details.videos);
  const watchProviders = await fetchWatchProviders(details.id);
  return {
    id: details.id,
    title: details.title,
    posterUrl: details.poster_path ? `${TMDB_IMAGE_BASE_URL}${details.poster_path}` : `https://picsum.photos/400/600?random=${details.title}`,
    backdropUrl: details.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${details.backdrop_path}` : undefined,
    description: details.overview,
    actors,
    director,
    writers,
    genres: (details.genres || []).map((g: any) => g.name),
    runtimeMinutes: details.runtime || undefined,
    releaseYear: (details.release_date || '').slice(0, 4) || undefined,
    certification: certification || undefined,
    productionCompanies: companies,
    rating: typeof details.vote_average === 'number' ? Number(details.vote_average) : undefined,
    voteCount: typeof details.vote_count === 'number' ? Number(details.vote_count) : undefined,
    tagline: details.tagline || undefined,
    trailerUrl: trailer,
    cast,
    watchProviders,
  };
}

function extractTrailer(videos: any): string | undefined {
  if (!videos?.results) return undefined;
  const preferred = videos.results.find((video: any) =>
    video.site === 'YouTube' &&
    video.type === 'Trailer' &&
    video.official
  );
  const fallback = videos.results.find((video: any) => video.site === 'YouTube' && video.type === 'Trailer');
  const chosen = preferred || fallback;
  return chosen?.key ? `https://www.youtube.com/watch?v=${chosen.key}` : undefined;
}

async function fetchWatchProviders(movieId: number): Promise<WatchProvider[]> {
  const data = await apiFetch(`movie/${movieId}/watch/providers?language=en-US`);
  const results = data?.results;
  if (!results) return [];
  const region = results.US || results.CA || Object.values(results)[0];
  if (!region) return [];
  const link = region.link;
  const types: Array<{ key: WatchProviderType; source?: any[] }> = [
    { key: 'stream', source: region.flatrate },
    { key: 'rent', source: region.rent },
    { key: 'buy', source: region.buy },
  ];
  const seen = new Set<string>();
  const providers: WatchProvider[] = [];

  for (const { key, source } of types) {
    if (!Array.isArray(source)) continue;
    source.forEach((provider: any) => {
      const idKey = `${key}-${provider.provider_id}`;
      if (seen.has(idKey)) return;
      seen.add(idKey);
      providers.push({
        name: provider.provider_name,
        logoUrl: provider.logo_path ? `${TMDB_PROVIDER_LOGO_BASE_URL}${provider.logo_path}` : undefined,
        type: key,
        link,
      });
    });
  }

  return providers;
}

export async function fetchPopularMovies(count: number = 10): Promise<Movie[]> {
  const popular = await apiFetch(`movie/popular?language=en-US&page=1`);
  if (!popular?.results?.length) return [];
  return hydrateMoviesFromResults(popular.results, count);
}

export async function fetchTopRatedMovies(count: number = 10): Promise<Movie[]> {
  const topRated = await apiFetch(`movie/top_rated?language=en-US&page=1`);
  if (!topRated?.results?.length) return [];
  return hydrateMoviesFromResults(topRated.results, count);
}

export async function fetchNowPlayingMovies(count: number = 10): Promise<Movie[]> {
  const nowPlaying = await apiFetch(`movie/now_playing?language=en-US&page=1`);
  if (!nowPlaying?.results?.length) return [];
  return hydrateMoviesFromResults(nowPlaying.results, count);
}

export async function fetchRandomMoviesByRandomGenre(count: number = 10): Promise<{ movies: Movie[]; genre: string }> {
  const genres = Object.keys(GENRE_NAME_TO_ID);
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  const genreId = GENRE_NAME_TO_ID[randomGenre];

  const movies = await discoverRandomMoviesFromTMDB(
    { genre: randomGenre },
    count,
    { mainstreamOnly: true }
  );

  return { movies, genre: randomGenre };
}

export async function fetchRandomMoviesByRandomYear(count: number = 10): Promise<{ movies: Movie[]; year: string }> {
  const currentYear = new Date().getFullYear();
  const minYear = 1970;
  const randomYear = Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
  const yearString = randomYear.toString();

  const movies = await discoverRandomMoviesFromTMDB(
    { releaseYear: yearString },
    count,
    { mainstreamOnly: true }
  );

  return { movies, year: yearString };
}
