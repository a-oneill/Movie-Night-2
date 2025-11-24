export interface Movie {
  id?: number;                 // TMDB id when available
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  description: string;
  actors: string[];
  director: string;
  writers: string[];
  genres?: string[];
  runtimeMinutes?: number;
  releaseYear?: string;
  certification?: string;
  productionCompanies?: string[];
  rating?: number;             // Average TMDB rating (0-10)
  voteCount?: number;          // TMDB vote count for popularity context
  tagline?: string;            // optional short tagline for hero usage
  trailerUrl?: string;
  cast?: CastMember[];
  watchProviders?: WatchProvider[];
}

export interface CastMember {
  id?: number;
  name: string;
  character?: string;
  profileUrl?: string;
  tmdbUrl?: string;
}

export type WatchProviderType = 'stream' | 'rent' | 'buy';

export interface WatchProvider {
  name: string;
  logoUrl?: string;
  type: WatchProviderType;
  link?: string;
}

export interface SearchCriteria {
  genre: string;
  actor: string;
  director: string;
  writer: string;
  producer: string;
  productionHouse: string;
  releaseYear: string;
  runtime: string;
  rating: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title:string;
  };
}

export interface GeminiMovieSuggestion {
  title: string;
  releaseYear: string;
}

export interface MovieSearchResult {
  movies: Movie[];
  sources: GroundingChunk[];
}
