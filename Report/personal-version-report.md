# Movie Night Personal Edition: Rebuild Strategy
## A Beautiful, Lightweight Movie Discovery Tool for Personal Use

**Document Version**: 1.0
**Date**: November 13, 2025
**Purpose**: Personal web application for casual movie discovery and watchlist management
**Deployment Target**: GitHub Pages (static hosting)

---

## Executive Summary

This document outlines a comprehensive strategy for rebuilding Movie Night as a beautiful, lightweight personal web application optimized for individual use and deployed via GitHub Pages. Unlike the production-grade enterprise strategy, this approach prioritizes simplicity, zero ongoing costs, minimal maintenance, and ease of deployment while maintaining the same high standards for design excellence and user experience.

The personal edition will be a static web application that runs entirely in the browser, using modern web technologies to deliver a fast, responsive, and delightful experience. All user data will be stored locally using browser storage APIs, eliminating the need for backend infrastructure while ensuring complete privacy and data ownership.

### Core Philosophy: Simplicity with Excellence

**Guiding Principles**:
1. **Zero Infrastructure** - No servers, no databases, no monthly costs
2. **Privacy First** - All data stored locally, no tracking, no analytics
3. **Minimal Maintenance** - Set it and forget it; updates only when you want new features
4. **Maximum Delight** - Same beautiful design and smooth UX as enterprise applications
5. **Fast Development** - Build in days/weeks, not months

### Key Objectives

1. **Beautiful & Calm Design**: Maintain the minimalist, white-space-focused design philosophy
2. **Zero Cost**: Deploy on GitHub Pages for free hosting with custom domain support
3. **Privacy & Ownership**: All data stored locally; export/import capabilities for backup
4. **Fast & Responsive**: Sub-second load times, works offline as PWA
5. **Easy to Customize**: Simple codebase that's easy to modify and extend

### Strategic Approach

**Week 1-2**: Core features - Search, movie details, watchlist with localStorage
**Week 3**: AI integration with direct API calls (optional based on API key availability)
**Week 4**: Polish, PWA capabilities, and deployment to GitHub Pages

### Expected Outcomes

- **Performance**: Near-instant load times after first visit (cached static assets)
- **Cost**: $0/month (free GitHub Pages hosting + free tier API usage)
- **Maintenance**: ~1 hour/month for optional updates
- **Development Time**: 2-4 weeks for fully featured personal application
- **Data Privacy**: 100% private, no external data collection

---

## Current State Assessment

### Learning from the Prototype

The existing Movie Night prototype provides an excellent foundation with proven UX patterns and working TMDB integration. For the personal edition, we can:

**Retain & Improve**:
- Clean, dark theme UI with thoughtful component design
- TMDB API integration (moving API key to secure location)
- React component architecture
- Responsive design patterns
- Movie card layouts and detail pages

**Simplify**:
- Remove backend/server requirements entirely
- Replace complex state management with simple React hooks + context
- Use localStorage instead of database
- Direct API calls from browser (with proper key management)
- Remove authentication (single user = you)

**Eliminate**:
- Vite middleware hack for AI (use direct API calls or serverless functions)
- Complex build configurations
- User management and authentication systems
- Analytics and monitoring infrastructure
- Multi-user features

### Personal Edition Requirements

**Must Have**:
- Movie search with filters (genre, year, rating)
- Detailed movie information (cast, crew, ratings, trailers)
- Personal watchlist with watched/unwatched status
- Export/import watchlist for backup
- Responsive design (mobile, tablet, desktop)
- Beautiful, calm UI with generous white space
- Fast performance and offline support

**Nice to Have**:
- AI-powered search recommendations (if using free AI API)
- Similar movie suggestions
- Movie collections/lists
- Notes on movies
- Viewing statistics

**Don't Need**:
- User authentication
- Social features
- Real-time collaboration
- Backend infrastructure
- Complex state management
- Analytics and tracking

---

## Vision for Personal Edition

### Design Philosophy: Calm & Personal

The personal edition embraces the same **calm technology** principles as the enterprise version:

**Visual Minimalism**
- Generous white space creating breathing room and focus
- Restrained color palette (2-3 accent colors beyond grayscale)
- Typography-first hierarchy
- Progressive disclosure of complexity
- Smooth, subtle animations (no flashy effects)

**Intentional Interactions**
- Fast, immediate feedback on all actions
- Keyboard shortcuts for power users
- Smart defaults (genre preferences remembered locally)
- Contextual help when needed
- Respectful of attention (no notifications, no badges)

**Personal Touch**
- Customizable themes (light, dark, custom colors)
- Personal notes on movies
- Custom categorization
- Your data, your rules

### User Experience Principles

1. **Instant Gratification**: App loads and responds immediately
2. **Offline Capable**: Works without internet after initial load
3. **Your Space**: Feels like a personal tool, not a product
4. **Privacy Absolute**: No tracking, no external data sharing
5. **Portable**: Export your data anytime, use elsewhere

### What Makes This Special

**vs. Current Prototype**:
- Actually works in production (no Vite middleware hack)
- Properly secured (no hardcoded API keys in source)
- Better performance (optimized static build)
- More reliable (no server dependencies)
- More private (local-only data)

**vs. Other Movie Apps**:
- Cleaner, calmer UI without ads or clutter
- Complete privacy (no account, no tracking)
- Customizable to your preferences
- Works offline
- Free forever

---

## Architecture for Static Deployment

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Browser (Your Device)                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │         React Application (Static Bundle)               │   │
│  │  • Components (Search, Movies, Watchlist)               │   │
│  │  • State Management (React Context + Hooks)             │   │
│  │  • Routing (React Router or TanStack Router)            │   │
│  └────────────────────────────────────────────────────────┘   │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            Local Storage Layer                          │   │
│  │  • localStorage - Watchlist, preferences, notes         │   │
│  │  • IndexedDB - Movie cache (optional, for offline)      │   │
│  │  • Service Worker - Offline support (PWA)               │   │
│  └────────────────────────────────────────────────────────┘   │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            API Client Layer                             │   │
│  │  • TMDB API (movie data)                                │   │
│  │  • Gemini API (optional, for AI features)               │   │
│  │  • Response caching (localStorage)                      │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│                                                                  │
│  • TMDB API - Movie data, images, metadata                      │
│  • Google Gemini API - AI recommendations (optional)             │
│  • GitHub Pages - Static hosting (yourname.github.io)           │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Works for Personal Use

**Static Site Benefits**:
- **Free Hosting**: GitHub Pages provides free hosting for static sites
- **Zero Maintenance**: No servers to maintain, patch, or monitor
- **High Performance**: Static assets served via CDN, sub-second load times
- **Reliability**: No backend to crash or require restarts
- **Simplicity**: Just HTML, CSS, and JavaScript files

**Local Storage Benefits**:
- **Complete Privacy**: Your data never leaves your device
- **Fast Access**: No network latency for reading watchlist
- **Works Offline**: Full functionality without internet
- **Free**: No database costs or management
- **Portable**: Easy to export/import data

**Direct API Calls**:
- **Simple Architecture**: No backend proxy needed
- **Real-time Data**: Always fresh movie information
- **Free Tier**: TMDB provides generous free tier (1000 requests/day)
- **Flexible**: Easy to add new APIs or change providers

### Framework Selection: Vite + React

**Rationale for Vite + React**:

1. **Fast Development**: Vite provides instant hot module replacement (HMR)
2. **Optimized Builds**: Automatic code splitting and tree shaking
3. **Simple Configuration**: Minimal config for GitHub Pages deployment
4. **React Familiarity**: Maintain existing React components
5. **Modern Tooling**: Native ES modules, TypeScript support out of box
6. **Small Bundle**: Vite produces highly optimized production builds

**Alternative Frameworks Considered**:
- **Next.js Static Export**: Excellent but more complex than needed for personal use
- **Astro**: Great for content sites, overkill for SPA
- **Preact**: Smaller React alternative, good for extreme optimization
- **Solid.js**: Excellent performance, but React ecosystem is more familiar

**Decision**: Vite + React offers the best balance of familiarity, performance, and simplicity for personal use.

### Project Structure

```
movie-night-personal/
├── public/
│   ├── favicon.ico
│   ├── manifest.json          # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── movies/           # Movie-specific components
│   │   │   ├── MovieCard.tsx
│   │   │   ├── MovieGrid.tsx
│   │   │   ├── MovieDetails.tsx
│   │   │   └── MovieHero.tsx
│   │   ├── search/           # Search components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   └── FilterDrawer.tsx
│   │   └── watchlist/        # Watchlist components
│   │       ├── WatchlistDrawer.tsx
│   │       ├── WatchlistItem.tsx
│   │       └── WatchlistStats.tsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useMovieSearch.ts
│   │   ├── useWatchlist.ts
│   │   ├── useMovieDetails.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── lib/                  # Utilities and services
│   │   ├── api/              # API clients
│   │   │   ├── tmdb.ts
│   │   │   ├── gemini.ts     # Optional AI features
│   │   │   └── cache.ts      # Response caching
│   │   ├── storage/          # Local storage utilities
│   │   │   ├── watchlist.ts
│   │   │   ├── preferences.ts
│   │   │   └── export.ts     # Export/import functionality
│   │   └── utils/            # Helper functions
│   │       ├── cn.ts         # Class name utility
│   │       ├── format.ts     # Date, number formatting
│   │       └── validators.ts
│   │
│   ├── contexts/             # React contexts
│   │   ├── WatchlistContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── PreferencesContext.tsx
│   │
│   ├── pages/                # Page components
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── MovieDetail.tsx
│   │   ├── Watchlist.tsx
│   │   └── Settings.tsx
│   │
│   ├── styles/               # Styles
│   │   ├── index.css         # Global styles + Tailwind
│   │   └── themes.css        # Theme variables
│   │
│   ├── types/                # TypeScript types
│   │   ├── movie.ts
│   │   ├── watchlist.ts
│   │   └── api.ts
│   │
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts         # Vite type definitions
│
├── .env.example              # Example environment variables
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts            # Vite configuration
└── README.md
```

### Data Management Strategy

**Local Storage Architecture**:

```typescript
// lib/storage/watchlist.ts

export interface WatchlistItem {
  movieId: number;
  title: string;
  posterUrl: string;
  addedAt: number; // timestamp
  watched: boolean;
  watchedAt?: number;
  rating?: number; // personal rating 1-10
  notes?: string;
}

export interface WatchlistStorage {
  items: Record<number, WatchlistItem>; // movieId -> item
  version: number; // for future migrations
  lastUpdated: number;
}

class WatchlistStore {
  private storageKey = 'movienight_watchlist';

  // Get entire watchlist
  getAll(): WatchlistItem[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];

    const storage: WatchlistStorage = JSON.parse(data);
    return Object.values(storage.items);
  }

  // Add movie to watchlist
  add(movie: Movie): void {
    const storage = this.getStorage();

    storage.items[movie.id] = {
      movieId: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      addedAt: Date.now(),
      watched: false,
    };

    storage.lastUpdated = Date.now();
    this.saveStorage(storage);
  }

  // Remove from watchlist
  remove(movieId: number): void {
    const storage = this.getStorage();
    delete storage.items[movieId];
    storage.lastUpdated = Date.now();
    this.saveStorage(storage);
  }

  // Mark as watched
  markWatched(movieId: number, watched: boolean): void {
    const storage = this.getStorage();

    if (storage.items[movieId]) {
      storage.items[movieId].watched = watched;
      storage.items[movieId].watchedAt = watched ? Date.now() : undefined;
      storage.lastUpdated = Date.now();
      this.saveStorage(storage);
    }
  }

  // Add personal rating and notes
  addReview(movieId: number, rating: number, notes?: string): void {
    const storage = this.getStorage();

    if (storage.items[movieId]) {
      storage.items[movieId].rating = rating;
      storage.items[movieId].notes = notes;
      storage.lastUpdated = Date.now();
      this.saveStorage(storage);
    }
  }

  // Export for backup
  export(): string {
    return JSON.stringify(this.getStorage(), null, 2);
  }

  // Import from backup
  import(json: string): void {
    try {
      const storage: WatchlistStorage = JSON.parse(json);

      // Validate structure
      if (!storage.items || !storage.version) {
        throw new Error('Invalid backup format');
      }

      this.saveStorage(storage);
    } catch (error) {
      throw new Error('Failed to import backup');
    }
  }

  // Clear all data
  clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  private getStorage(): WatchlistStorage {
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      return {
        items: {},
        version: 1,
        lastUpdated: Date.now(),
      };
    }

    return JSON.parse(data);
  }

  private saveStorage(storage: WatchlistStorage): void {
    localStorage.setItem(this.storageKey, JSON.stringify(storage));

    // Dispatch event for reactive updates
    window.dispatchEvent(new CustomEvent('watchlist-updated'));
  }
}

export const watchlistStore = new WatchlistStore();
```

**User Preferences Storage**:

```typescript
// lib/storage/preferences.ts

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  favoriteGenres: number[]; // TMDB genre IDs
  language: string;
  aiEnabled: boolean;
  compactView: boolean;
  autoPlay: boolean; // Auto-play trailers
  version: number;
}

class PreferencesStore {
  private storageKey = 'movienight_preferences';

  private defaults: UserPreferences = {
    theme: 'system',
    favoriteGenres: [],
    language: 'en',
    aiEnabled: false,
    compactView: false,
    autoPlay: false,
    version: 1,
  };

  get(): UserPreferences {
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      return { ...this.defaults };
    }

    return { ...this.defaults, ...JSON.parse(data) };
  }

  set(preferences: Partial<UserPreferences>): void {
    const current = this.get();
    const updated = { ...current, ...preferences };
    localStorage.setItem(this.storageKey, JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent('preferences-updated'));
  }

  reset(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const preferencesStore = new PreferencesStore();
```

**Response Caching**:

```typescript
// lib/api/cache.ts

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class ResponseCache {
  private storageKey = 'movienight_cache';
  private maxSize = 100; // Maximum cached items

  get<T>(key: string): T | null {
    const cache = this.getCache();
    const entry = cache[key] as CacheEntry<T> | undefined;

    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.remove(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T, ttl: number = 3600000): void {
    const cache = this.getCache();

    cache[key] = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    // Enforce max size (LRU eviction)
    const entries = Object.entries(cache);
    if (entries.length > this.maxSize) {
      entries.sort((a, b) =>
        (a[1] as CacheEntry<unknown>).timestamp -
        (b[1] as CacheEntry<unknown>).timestamp
      );

      // Remove oldest 20%
      const toRemove = Math.floor(this.maxSize * 0.2);
      entries.slice(0, toRemove).forEach(([key]) => delete cache[key]);
    }

    this.saveCache(cache);
  }

  remove(key: string): void {
    const cache = this.getCache();
    delete cache[key];
    this.saveCache(cache);
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  private getCache(): Record<string, CacheEntry<unknown>> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  private saveCache(cache: Record<string, CacheEntry<unknown>>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cache));
  }
}

export const responseCache = new ResponseCache();
```

### API Integration Strategy

**TMDB API Client** (with caching and rate limiting):

```typescript
// lib/api/tmdb.ts

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

class TMDBClient {
  private apiKey: string;
  private requestQueue: Promise<unknown>[] = [];
  private maxConcurrent = 4; // Respect TMDB rate limits

  constructor() {
    // API key from environment variable (set at build time)
    this.apiKey = import.meta.env.VITE_TMDB_API_KEY || '';

    if (!this.apiKey) {
      console.warn('TMDB API key not configured');
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    const cacheKey = `search:${query}:${page}`;

    // Check cache first
    const cached = responseCache.get<Movie[]>(cacheKey);
    if (cached) return cached;

    const data = await this.fetch(`/search/movie`, {
      query,
      page,
      include_adult: false,
    });

    const movies = data.results.map(this.mapToMovie);

    // Cache for 1 hour
    responseCache.set(cacheKey, movies, 3600000);

    return movies;
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    const cacheKey = `movie:${id}`;

    const cached = responseCache.get<MovieDetails>(cacheKey);
    if (cached) return cached;

    const [details, credits, videos] = await Promise.all([
      this.fetch(`/movie/${id}`),
      this.fetch(`/movie/${id}/credits`),
      this.fetch(`/movie/${id}/videos`),
    ]);

    const movieDetails = this.mapToMovieDetails(details, credits, videos);

    // Cache for 24 hours (movie data doesn't change often)
    responseCache.set(cacheKey, movieDetails, 86400000);

    return movieDetails;
  }

  async discoverMovies(filters: DiscoverFilters): Promise<Movie[]> {
    const cacheKey = `discover:${JSON.stringify(filters)}`;

    const cached = responseCache.get<Movie[]>(cacheKey);
    if (cached) return cached;

    const data = await this.fetch('/discover/movie', filters);
    const movies = data.results.map(this.mapToMovie);

    responseCache.set(cacheKey, movies, 3600000);

    return movies;
  }

  private async fetch(endpoint: string, params: Record<string, any> = {}) {
    // Wait for queue if too many concurrent requests
    while (this.requestQueue.length >= this.maxConcurrent) {
      await Promise.race(this.requestQueue);
    }

    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });

    const request = fetch(url.toString())
      .then(res => {
        if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
        return res.json();
      })
      .finally(() => {
        // Remove from queue
        const index = this.requestQueue.indexOf(request);
        if (index > -1) this.requestQueue.splice(index, 1);
      });

    this.requestQueue.push(request);

    return request;
  }

  private mapToMovie(data: any): Movie {
    return {
      id: data.id,
      title: data.title,
      posterUrl: data.poster_path
        ? `${TMDB_IMAGE_BASE_URL}/w500${data.poster_path}`
        : '/placeholder-poster.jpg',
      backdropUrl: data.backdrop_path
        ? `${TMDB_IMAGE_BASE_URL}/w1280${data.backdrop_path}`
        : undefined,
      description: data.overview,
      releaseDate: data.release_date,
      rating: data.vote_average,
      voteCount: data.vote_count,
      genres: data.genre_ids || [],
    };
  }

  private mapToMovieDetails(details: any, credits: any, videos: any): MovieDetails {
    return {
      ...this.mapToMovie(details),
      runtime: details.runtime,
      budget: details.budget,
      revenue: details.revenue,
      tagline: details.tagline,
      cast: credits.cast.slice(0, 10).map((c: any) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profileUrl: c.profile_path
          ? `${TMDB_IMAGE_BASE_URL}/w185${c.profile_path}`
          : undefined,
      })),
      crew: credits.crew
        .filter((c: any) => ['Director', 'Writer', 'Producer'].includes(c.job))
        .map((c: any) => ({
          id: c.id,
          name: c.name,
          job: c.job,
        })),
      trailer: videos.results.find((v: any) =>
        v.type === 'Trailer' && v.site === 'YouTube'
      )?.key,
    };
  }
}

export const tmdbClient = new TMDBClient();
```

**Optional: AI Integration** (for users with Gemini API key):

```typescript
// lib/api/gemini.ts

class GeminiClient {
  private apiKey: string;
  private enabled: boolean;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.enabled = !!this.apiKey && preferencesStore.get().aiEnabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async rankMovies(movies: Movie[], query: string): Promise<Movie[]> {
    if (!this.enabled || movies.length === 0) return movies;

    try {
      // Use dynamic import to keep bundle size small if not used
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

      const prompt = `Rank these ${movies.length} movies for someone searching "${query}".

Movies: ${movies.map((m, i) => `${i}. ${m.title} - ${m.description?.slice(0, 100)}...`).join('\n')}

Return JSON array: [{ index: number, score: number (0-1), reason: string }]`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      // Parse and reorder
      let rankings = JSON.parse(response.replace(/```json\n?|\n?```/g, ''));
      rankings.sort((a: any, b: any) => b.score - a.score);

      return rankings.map((r: any) => movies[r.index]).filter(Boolean);
    } catch (error) {
      console.warn('AI ranking failed, using original order', error);
      return movies;
    }
  }

  async getSimilarMovies(movie: Movie): Promise<Movie[]> {
    if (!this.enabled) return [];

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

      const prompt = `Suggest 10 movies similar to "${movie.title}".

Movie description: ${movie.description}
Genre: ${movie.genres.join(', ')}

Return JSON array of movie titles: ["Movie 1", "Movie 2", ...]`;

      const result = await model.generateContent(prompt);
      const titles = JSON.parse(result.response.text().replace(/```json\n?|\n?```/g, ''));

      // Search TMDB for these titles
      const searches = titles.map((title: string) => tmdbClient.searchMovies(title));
      const results = await Promise.all(searches);

      return results.map(r => r[0]).filter(Boolean);
    } catch (error) {
      console.warn('AI similar movies failed', error);
      return [];
    }
  }
}

export const geminiClient = new GeminiClient();
```

### Security Considerations for Static Sites

**API Key Management**:

```bash
# .env.example
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here  # Optional
```

**Important Security Notes**:

1. **API Keys in Static Sites**: API keys will be visible in the browser bundle. This is acceptable for personal use because:
   - TMDB API keys are tied to your account and have rate limits
   - You control the deployment and can restrict to your domain
   - For personal use, exposure is minimal risk
   - You can regenerate keys if compromised

2. **Domain Restrictions**: Configure TMDB API key to only work from your GitHub Pages domain:
   - Go to TMDB API settings
   - Add domain restriction: `yourname.github.io`
   - This prevents others from using your key even if they see it

3. **Rate Limiting**: Built-in rate limiting in API client prevents abuse

4. **No Sensitive Data**: Since all data is local-only, there's no risk of exposing personal information

5. **Optional Backend Proxy**: If you want extra security, you can use:
   - Cloudflare Workers (free tier) as API proxy
   - Netlify Functions (free tier) for serverless endpoints
   - Vercel Edge Functions (free tier) for API key protection

**Example: Optional Cloudflare Worker Proxy**:

```javascript
// cloudflare-worker.js (optional, for extra security)

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Only allow your domain
    const origin = request.headers.get('Origin');
    if (origin !== 'https://yourname.github.io') {
      return new Response('Forbidden', { status: 403 });
    }

    // Proxy TMDB requests
    if (url.pathname.startsWith('/api/tmdb')) {
      const tmdbUrl = url.pathname.replace('/api/tmdb', 'https://api.themoviedb.org/3');
      const tmdbRequest = new URL(tmdbUrl);
      tmdbRequest.search = url.search;
      tmdbRequest.searchParams.set('api_key', TMDB_API_KEY); // From worker secrets

      const response = await fetch(tmdbRequest.toString());
      return new Response(response.body, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
        },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
```

---

## UI/UX Design System

### Design Philosophy: Personal & Calm

The personal edition maintains the same high design standards as the enterprise version, with emphasis on:

**Calm Computing**:
- Uncluttered interfaces with generous spacing
- Subtle, purposeful animations
- No attention-grabbing elements
- Respects user's time and attention

**Personal Touch**:
- Customizable themes
- Personal notes and ratings
- Tailored to your preferences
- Feels like "your" tool

**Visual Language**:

```css
/* styles/themes.css */

:root {
  /* Spacing scale - generous and consistent */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */

  /* Typography scale */
  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem;  /* 36px */
  --text-5xl: 3rem;     /* 48px */

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows - subtle and layered */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Light theme (default) */
[data-theme="light"] {
  --background: 0 0% 100%;
  --foreground: 0 0% 10%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  --border: 0 0% 90%;
  --primary: 210 100% 50%;
  --primary-foreground: 0 0% 100%;
  --accent: 210 100% 95%;
  --accent-foreground: 210 100% 30%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
}

/* Dark theme */
[data-theme="dark"] {
  --background: 0 0% 8%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 60%;
  --border: 0 0% 20%;
  --primary: 210 100% 60%;
  --primary-foreground: 0 0% 10%;
  --accent: 210 100% 20%;
  --accent-foreground: 210 100% 90%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --background: 0 0% 8%;
    --foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;
    --border: 0 0% 20%;
    --primary: 210 100% 60%;
    --primary-foreground: 0 0% 10%;
    --accent: 210 100% 20%;
    --accent-foreground: 210 100% 90%;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Component Design Examples

**Movie Card Component**:

```tsx
// components/movies/MovieCard.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Check, Play } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { cn } from '@/lib/utils/cn';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const { isInWatchlist, toggle } = useWatchlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      {/* Card container */}
      <div className="relative overflow-hidden rounded-lg bg-muted/50 backdrop-blur-sm border border-border transition-all duration-200 hover:shadow-lg">

        {/* Poster image */}
        <div className="aspect-[2/3] relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          <img
            src={movie.posterUrl}
            alt={movie.title}
            loading={priority ? 'eager' : 'lazy'}
            className={cn(
              "h-full w-full object-cover transition-all duration-300",
              "group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient overlay - visible on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Action buttons - slide up on hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <div className="flex gap-2">
              <a
                href={`#/movie/${movie.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Play className="h-4 w-4" />
                Details
              </a>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggle(movie);
                }}
                className={cn(
                  "px-3 py-2 rounded-md transition-colors",
                  inWatchlist
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-accent"
                )}
                aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              >
                {inWatchlist ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Movie info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

**Search Bar Component**:

```tsx
// components/search/SearchBar.tsx

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils/cn';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  isLoading = false,
  placeholder = "Search for movies..."
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  // Keyboard shortcut: ⌘K or Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-12 pr-12 py-4",
            "bg-background border border-border rounded-xl",
            "text-base placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-all duration-200"
          )}
        />

        {/* Loading or clear button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : query ? (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-muted rounded-md transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden sm:block">
        <kbd className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded border border-border">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
```

### Responsive Design

**Mobile-First Breakpoints**:

```typescript
// hooks/useMediaQuery.ts

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Usage
export function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return { isMobile, isTablet, isDesktop };
}
```

**Responsive Layout Example**:

```tsx
// pages/Home.tsx

export function Home() {
  const { isMobile } = useBreakpoint();
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Your Personal Movie{' '}
            <span className="text-primary">Discovery</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A beautiful, private space to discover, organize, and track movies you want to watch
          </p>

          <div className="pt-8">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Movie grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "grid gap-4 sm:gap-6",
            isMobile ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          )}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Technology Stack

### Complete Stack Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Stack                            │
├─────────────────────────────────────────────────────────────────┤
│ Framework:       Vite 6.x + React 19                             │
│ Language:        TypeScript 5.8+                                 │
│ Styling:         Tailwind CSS 4.x                                │
│ Icons:           Lucide React                                    │
│ Animations:      Framer Motion                                   │
│ Routing:         React Router 7.x / TanStack Router              │
│ State:           React Context + Hooks                           │
│ Storage:         localStorage + IndexedDB (via idb)              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         API & Data                               │
├─────────────────────────────────────────────────────────────────┤
│ Movie Data:      TMDB API (free tier: 1000 req/day)             │
│ AI (Optional):   Google Gemini API (free tier available)         │
│ Image CDN:       TMDB Image CDN                                  │
│ Caching:         localStorage (manual implementation)            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     Development Tools                            │
├─────────────────────────────────────────────────────────────────┤
│ Build Tool:      Vite                                            │
│ Package Manager: pnpm (recommended) / npm / yarn                 │
│ Linting:         ESLint + TypeScript ESLint                      │
│ Formatting:      Prettier                                        │
│ Git Hooks:       simple-git-hooks + lint-staged                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Deployment & Hosting                          │
├─────────────────────────────────────────────────────────────────┤
│ Hosting:         GitHub Pages (free, unlimited bandwidth)        │
│ CI/CD:           GitHub Actions (free for public repos)          │
│ Domain:          username.github.io (free subdomain)             │
│ Custom Domain:   Optional (configure via GitHub Pages)           │
│ CDN:             GitHub's CDN (automatic)                        │
│ SSL:             Automatic HTTPS via GitHub Pages                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      Optional Enhancements                       │
├─────────────────────────────────────────────────────────────────┤
│ PWA:             Vite PWA Plugin                                 │
│ Proxy (optional): Cloudflare Workers (free tier)                │
│ Analytics:       None (privacy-first) or self-hosted Umami       │
│ Error Tracking:  None (personal use) or console logging          │
└─────────────────────────────────────────────────────────────────┘
```

### Package.json

```json
{
  "name": "movie-night-personal",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.460.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "idb": "^8.0.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.0.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "gh-pages": "^6.2.0",
    "lint-staged": "^15.2.10",
    "postcss": "^8.4.49",
    "prettier": "^3.4.0",
    "prettier-plugin-tailwindcss": "^0.6.9",
    "simple-git-hooks": "^2.12.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.8.0",
    "vite": "^6.0.0",
    "vite-plugin-pwa": "^0.21.0"
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,json,md}": [
      "prettier --write"
    ]
  }
}
```

### Vite Configuration

```typescript
// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Movie Night',
        short_name: 'Movies',
        description: 'Personal movie discovery and watchlist manager',
        theme_color: '#0066ff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Cache movie images and API responses
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/image\.tmdb\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tmdb-images',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.themoviedb\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'tmdb-api',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // GitHub Pages deployment configuration
  base: '/movie-night/', // Replace with your repo name
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
});
```

### Tailwind Configuration

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## Feature Set for Personal Edition

### Core Features (Week 1-2)

**1. Movie Search & Discovery**
- Search by title with autocomplete suggestions
- Filter by genre, year, rating, runtime
- Sort by popularity, rating, release date
- Browse categories: Popular, Top Rated, Upcoming, Now Playing
- Random movie discovery ("Feeling Lucky" button)

**2. Movie Details**
- Comprehensive information (plot, cast, crew, runtime, budget)
- Trailer playback (YouTube embed)
- Similar movie suggestions
- Streaming availability (if using JustWatch integration)
- High-quality poster and backdrop images

**3. Personal Watchlist**
- Add/remove movies instantly
- Mark as watched with date tracking
- Personal rating (1-10 stars)
- Personal notes on each movie
- Sort by added date, title, rating, release year
- Filter watched/unwatched
- Statistics (total movies, watched count, average rating)

**4. Data Management**
- Export watchlist as JSON (backup)
- Import watchlist from JSON (restore)
- Clear all data option
- Automatic local backup

### Enhanced Features (Week 3)

**5. AI-Powered Features** (Optional, if API key available)
- Smart search ranking based on query intent
- Natural language search ("funny space movies from the 90s")
- Personalized recommendations based on watchlist
- "Movies similar to X" suggestions

**6. User Preferences**
- Theme switcher (light, dark, system)
- Favorite genres (affects recommendations)
- UI density (compact, comfortable, spacious)
- Language preference
- Auto-play trailers toggle

**7. Collections & Lists**
- Create custom lists ("Oscar Winners", "Cozy Movies")
- Organize movies into categories
- Multiple lists per movie
- Share lists as JSON

### Polish Features (Week 4)

**8. Progressive Web App**
- Install as standalone app
- Offline support (cached searches and watchlist)
- App-like experience on mobile
- Fast loading with service worker

**9. Keyboard Shortcuts**
- ⌘K / Ctrl+K: Focus search
- ⌘B / Ctrl+B: Open watchlist
- ⌘D / Ctrl+D: Toggle dark mode
- Esc: Close modals
- Arrow keys: Navigate movies

**10. Visual Enhancements**
- Skeleton loaders for content
- Smooth page transitions
- Hover effects and micro-interactions
- Responsive images with lazy loading
- Custom scrollbars

### Optional Nice-to-Haves

**11. Statistics & Insights**
- Most watched genres
- Watch history timeline
- Average rating by genre
- Viewing patterns visualization

**12. Quick Actions**
- Drag-and-drop to reorder watchlist
- Bulk operations (mark multiple as watched)
- Quick filters (shortcuts to common searches)
- Recently viewed movies

**13. Customization**
- Custom accent colors
- Font size adjustment
- Poster size preferences
- Grid density control

---

## Development Roadmap

### Week 1: Foundation & Core UI

**Days 1-2: Project Setup**
- Initialize Vite + React + TypeScript project
- Configure Tailwind CSS
- Set up ESLint, Prettier, git hooks
- Create project structure
- Design system setup (colors, spacing, typography)
- Set up GitHub repository

**Tasks**:
```bash
npm create vite@latest movie-night-personal -- --template react-ts
cd movie-night-personal
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion lucide-react clsx tailwind-merge
npm install react-router-dom
npm install -D gh-pages
```

**Days 3-4: Basic UI Components**
- Create design system components (Button, Card, Input, Dialog)
- Build Navbar with theme switcher
- Create responsive layout structure
- Implement routing (Home, Search, Movie Detail, Watchlist)
- Set up localStorage utilities

**Days 5-7: TMDB Integration**
- Create TMDB API client with caching
- Implement movie search
- Build MovieCard component
- Create MovieGrid with responsive layout
- Add search bar with filters
- Implement movie detail page

**Deliverables Week 1**:
- ✅ Functional search with results
- ✅ Movie cards with posters
- ✅ Movie detail page
- ✅ Basic routing
- ✅ Responsive layout

### Week 2: Watchlist & Data Management

**Days 8-9: Watchlist Functionality**
- Implement localStorage watchlist storage
- Create add/remove from watchlist
- Build WatchlistDrawer component
- Add watched/unwatched toggle
- Implement sorting and filtering

**Days 10-11: Enhanced Watchlist**
- Add personal ratings
- Implement notes on movies
- Create watchlist statistics
- Build export/import functionality
- Add watchlist search

**Days 12-14: Polish & Refinements**
- Add skeleton loaders
- Implement error boundaries
- Create empty states
- Add toast notifications
- Optimize performance (memoization, lazy loading)
- Write comprehensive README

**Deliverables Week 2**:
- ✅ Full watchlist functionality
- ✅ Export/import capability
- ✅ Personal ratings and notes
- ✅ Statistics dashboard
- ✅ Polished UX

### Week 3: AI & Advanced Features

**Days 15-16: AI Integration** (Optional)
- Set up Gemini API client
- Implement AI search ranking
- Add natural language search
- Create recommendation engine

**Days 17-18: User Preferences**
- Build settings page
- Implement theme switching (light/dark)
- Add genre preferences
- Create UI customization options
- Implement keyboard shortcuts

**Days 19-21: Collections & Lists**
- Create custom lists feature
- Build list management UI
- Implement list sharing (export/import)
- Add quick actions and shortcuts
- Polish animations and transitions

**Deliverables Week 3**:
- ✅ AI-powered search (if enabled)
- ✅ Comprehensive settings
- ✅ Custom lists
- ✅ Keyboard shortcuts
- ✅ Smooth animations

### Week 4: PWA & Deployment

**Days 22-23: Progressive Web App**
- Install and configure vite-plugin-pwa
- Create PWA manifest
- Implement service worker for offline support
- Add install prompts
- Test offline functionality

**Days 24-25: Final Polish**
- Performance optimization (bundle size, lazy loading)
- Accessibility audit (keyboard navigation, ARIA labels, contrast)
- Cross-browser testing
- Mobile optimization
- Bug fixes

**Days 26-28: Deployment**
- Configure GitHub Pages deployment
- Set up GitHub Actions for CI/CD
- Create deployment documentation
- Final testing in production
- Create user documentation

**Deliverables Week 4**:
- ✅ Installable PWA
- ✅ Offline support
- ✅ Deployed to GitHub Pages
- ✅ CI/CD pipeline
- ✅ Complete documentation

---

## Deployment Guide

### GitHub Pages Setup

**Step 1: Configure Vite for GitHub Pages**

```typescript
// vite.config.ts

export default defineConfig({
  base: '/movie-night/', // Replace 'movie-night' with your repo name
  // ... other config
});
```

**Step 2: Add Deployment Scripts**

```json
// package.json

{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Step 3: GitHub Actions CI/CD**

```yaml
# .github/workflows/deploy.yml

name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_TMDB_API_KEY: ${{ secrets.VITE_TMDB_API_KEY }}
          VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 4: Configure GitHub Secrets**

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add secrets:
   - `VITE_TMDB_API_KEY`: Your TMDB API key
   - `VITE_GEMINI_API_KEY`: Your Gemini API key (optional)

**Step 5: Enable GitHub Pages**

1. Repository Settings → Pages
2. Source: "GitHub Actions"
3. Save

**Step 6: Deploy**

```bash
# Manual deployment
npm run deploy

# Or push to main branch (automatic via GitHub Actions)
git push origin main
```

**Step 7: Custom Domain** (Optional)

1. Add a file `public/CNAME` with your domain:
   ```
   movies.yourdomain.com
   ```

2. Configure DNS:
   - Add CNAME record: `movies.yourdomain.com` → `username.github.io`

3. GitHub Settings → Pages → Custom domain → Add domain

### Alternative Deployment Options

**Netlify** (Recommended if you want more features):
- Free tier: 100GB bandwidth/month
- Automatic HTTPS
- Better build performance
- Environment variables in UI
- Preview deployments for PRs

**Cloudflare Pages**:
- Free tier: Unlimited bandwidth
- Global CDN
- Excellent performance
- Cloudflare Workers integration (for API proxy)

**Vercel** (Free tier):
- Similar to Netlify
- Excellent DX
- Edge functions available

---

## Cost Analysis

### Free Tier Services

**Hosting**: GitHub Pages
- Cost: $0/month
- Bandwidth: Unlimited (fair use)
- Storage: 1GB repository size
- Build minutes: 2000 min/month (free tier)

**APIs**:
- TMDB API: $0/month (1000 requests/day = ~30k/month)
- Gemini API: $0/month (free tier: 15 requests/min)

**Development Tools**:
- GitHub: Free for public repositories
- VS Code: Free
- All npm packages: Free and open source

**Total Monthly Cost**: $0

### Optional Paid Upgrades

If you outgrow free tiers:

**Custom Domain**: $10-15/year (not required, can use username.github.io)

**Cloudflare Pro** (if using Workers for API proxy): $20/month
- But free tier is likely sufficient for personal use

**Total Maximum Cost**: ~$1.25/month (domain only)

---

## Maintenance & Updates

### Ongoing Maintenance

**Weekly** (~10 minutes):
- Check for broken external links
- Review any user feedback (if shared with others)
- Monitor API usage

**Monthly** (~1 hour):
- Update npm dependencies: `npm update`
- Review and update TMDB API changes
- Test critical flows (search, watchlist, detail pages)
- Check browser console for errors

**Quarterly** (~2 hours):
- Major dependency updates: `npm outdated` → selective updates
- Review new TMDB API features
- Consider new UI improvements
- Update documentation

**Annually** (~4 hours):
- Major version upgrades (React, Vite, etc.)
- Comprehensive testing across browsers
- Performance audit
- Accessibility review

### Update Strategy

**Automated Updates**:
```json
// package.json - Use Dependabot

{
  "devDependencies": {
    "react": "^19.0.0",  // ^ allows minor/patch updates
    "vite": "~6.0.0"     // ~ allows patch updates only
  }
}
```

**Safe Update Process**:
```bash
# 1. Check for outdated packages
npm outdated

# 2. Update patch versions (safe)
npm update

# 3. Test locally
npm run dev
npm run build
npm run preview

# 4. Update minor versions (test thoroughly)
npm install react@^19.1.0

# 5. Deploy
git commit -am "Update dependencies"
git push
```

---

## Success Metrics

### Personal Use KPIs

**Usability**:
- Can find and add movie to watchlist in < 30 seconds
- Zero loading spinners after first visit (everything cached)
- Works 100% offline once loaded

**Performance**:
- Initial load: < 2s on fast connection
- Subsequent navigation: < 500ms (feels instant)
- Search results: < 1s
- Lighthouse score: 95+ all categories

**Reliability**:
- Works across all modern browsers (Chrome, Firefox, Safari, Edge)
- No broken features after dependency updates
- Watchlist data never lost (robust storage)

**User Satisfaction** (yourself!):
- Enjoy using it daily
- Prefer it over other movie tracking apps
- Easy to customize and extend
- Pride in showing it to friends

---

## Conclusion

### Why This Approach Works

**Personal Scale Advantages**:
- **Simplicity**: No backend complexity, no infrastructure to manage
- **Cost**: Completely free to build and run forever
- **Privacy**: Your data never leaves your device
- **Control**: Full ownership of code and data
- **Speed**: Static sites are incredibly fast
- **Reliability**: No servers to crash or maintain

**Design Excellence**:
- Same beautiful, calm UI as enterprise applications
- Generous white space and intentional design
- Smooth animations and delightful interactions
- Fully responsive and accessible

**Modern Tech Stack**:
- Latest React and Vite for excellent DX
- TypeScript for reliability
- Tailwind for rapid, consistent styling
- PWA capabilities for app-like experience

### Comparison: Enterprise vs. Personal Edition

| Aspect | Enterprise Version | Personal Edition |
|--------|-------------------|------------------|
| **Infrastructure** | Next.js, PostgreSQL, Redis | Vite + localStorage |
| **Hosting** | Vercel ($20+/month) | GitHub Pages (free) |
| **Development Time** | 16 weeks | 2-4 weeks |
| **Maintenance** | Ongoing server management | Minimal, mostly updates |
| **Scalability** | 10,000+ users | 1 user (you) |
| **Cost** | $70-281/month | $0/month |
| **Features** | Full social, auth, analytics | Core features, personal focus |
| **Privacy** | Server-side data | Local-only data |
| **Deployment** | Complex CI/CD | Simple git push |
| **Updates** | Requires testing pipeline | Test locally, deploy |

### When to Upgrade to Enterprise

Consider migrating to the enterprise architecture if:

1. **Multi-User Need**: Want to share with family/friends with separate accounts
2. **Social Features**: Need collaborative watchlists, friend activity, reviews
3. **Advanced AI**: Want sophisticated recommendation algorithms with ML
4. **Analytics**: Need to track usage patterns and optimize features
5. **Monetization**: Planning to charge for premium features
6. **Scale**: Expecting 100+ active users

### Next Steps

**Immediate Actions**:

1. **Set up project** (Day 1):
   ```bash
   npm create vite@latest movie-night-personal -- --template react-ts
   cd movie-night-personal
   npm install
   # Install dependencies as outlined in stack section
   ```

2. **Get API keys** (Day 1):
   - Sign up for TMDB account: https://www.themoviedb.org/signup
   - Request API key: https://www.themoviedb.org/settings/api
   - (Optional) Get Gemini API key: https://makersuite.google.com/app/apikey

3. **Start building** (Days 2-28):
   - Follow week-by-week roadmap
   - Commit frequently to GitHub
   - Test on real devices regularly

4. **Deploy** (Week 4):
   - Set up GitHub Pages
   - Configure GitHub Actions
   - Share with friends!

### Final Thoughts

This personal edition approach gives you the best of both worlds:

- **Enterprise-grade design and UX** - Beautiful, professional interface
- **Personal-scale simplicity** - No complexity, no costs, no maintenance headaches
- **Complete privacy** - Your data stays yours
- **Full control** - Customize anything, extend as you wish
- **Learning opportunity** - Great portfolio piece and learning experience

The Movie Night Personal Edition proves that you don't need complex infrastructure to build beautiful, functional web applications. With modern web technologies and thoughtful design, you can create delightful experiences that rival commercial applications - all for free and in just a few weeks.

**Start building today and enjoy your own personal movie discovery tool!**

---

*End of Report*

*Questions? Check the project README or open an issue on GitHub.*
