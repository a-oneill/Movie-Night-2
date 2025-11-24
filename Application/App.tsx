import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarItem } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CarouselRow } from './components/CarouselRow';
import { SearchForm, SearchFormHandle } from './components/SearchForm';
import { fetchMovies } from './services/geminiService';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchRandomMoviesByRandomGenre,
  fetchRandomMoviesByRandomYear,
} from './services/tmdbService';
import { Movie, SearchCriteria, GroundingChunk } from './types';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { SkeletonRow } from './components/SkeletonCard';

const EMPTY_CRITERIA: SearchCriteria = {
  genre: '',
  actor: '',
  director: '',
  writer: '',
  producer: '',
  productionHouse: '',
  releaseYear: '',
  runtime: '',
  rating: '',
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [randomGenreMovies, setRandomGenreMovies] = useState<Movie[]>([]);
  const [randomGenreTitle, setRandomGenreTitle] = useState<string>('Random Genre');
  const [randomYearMovies, setRandomYearMovies] = useState<Movie[]>([]);
  const [randomYearTitle, setRandomYearTitle] = useState<string>('Random Year');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<{ criteria: SearchCriteria; isLucky: boolean } | null>(null);
  const [aiCurateEnabled, setAiCurateEnabled] = useState<boolean>(typeof window !== 'undefined' ? window.location.protocol !== 'file:' : true);
  const [mainstreamOnly, setMainstreamOnly] = useState<boolean>(true);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isWatchlistOpen, setWatchlistOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSearchExpanded, setSearchExpanded] = useState<boolean>(false);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);
  const searchFormRef = useRef<SearchFormHandle | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const popularRef = useRef<HTMLDivElement | null>(null);
  const topRatedRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadInitial = async () => {
      try {
        const [popular, topRated, { movies: genreMovies, genre }, { movies: yearMovies, year }] = await Promise.all([
          fetchPopularMovies(14),
          fetchTopRatedMovies(14),
          fetchRandomMoviesByRandomGenre(14),
          fetchRandomMoviesByRandomYear(14),
        ]);
        if (cancelled) return;
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setRandomGenreMovies(genreMovies);
        setRandomGenreTitle(`${genre} Movies`);
        setRandomYearMovies(yearMovies);
        setRandomYearTitle(`${year} Movies`);

        // Pick a random movie from all categories for the hero
        const allMovies = [...popular, ...topRated, ...genreMovies, ...yearMovies];
        if (allMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * allMovies.length);
          setFeaturedMovie(allMovies[randomIndex]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load spotlight titles.');
        }
      } finally {
        if (!cancelled) {
          setInitialLoading(false);
        }
      }
    };
    loadInitial();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('movieNight.watchlist');
      if (stored) {
        const parsed = JSON.parse(stored) as Movie[];
        setWatchlist(parsed);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load watchlist from storage', err);
    }

    // Restore last search results if they exist
    try {
      const storedSearch = window.localStorage.getItem('movieNight.lastSearch');
      if (storedSearch) {
        const parsed = JSON.parse(storedSearch);
        if (parsed.criteria && parsed.results && Array.isArray(parsed.results)) {
          setSearchResults(parsed.results);
          setLastSearch({ criteria: parsed.criteria, isLucky: parsed.isLucky || false });
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load search results from storage', err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('movieNight.watchlist', JSON.stringify(watchlist));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to persist watchlist', err);
    }
  }, [watchlist]);

  // Persist search results whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (searchResults.length > 0 && lastSearch) {
      try {
        window.localStorage.setItem('movieNight.lastSearch', JSON.stringify({
          criteria: lastSearch.criteria,
          isLucky: lastSearch.isLucky,
          results: searchResults,
        }));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to persist search results', err);
      }
    }
  }, [searchResults, lastSearch]);

  useEffect(() => () => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
  }, []);

  const handleSearch = useCallback(async (criteria: SearchCriteria, isFeelingLucky: boolean) => {
    setIsSearching(true);
    setError(null);
    setSources([]);
    setLastSearch({ criteria, isLucky: isFeelingLucky });

    try {
      const result = await fetchMovies(criteria, isFeelingLucky, aiCurateEnabled, mainstreamOnly);
      setSearchResults(result.movies);
      if (result.movies.length) {
        setFeaturedMovie(result.movies[0]);
      }
      setSources(result.sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [aiCurateEnabled, mainstreamOnly]);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = window.setTimeout(() => setToastMessage(null), 2800);
  }, []);

  const getMovieKey = useCallback((movie: Movie) => String(movie.id ?? movie.title).toLowerCase(), []);

  const isInWatchlist = useCallback((movie: Movie) => {
    const key = getMovieKey(movie);
    return watchlist.some(item => getMovieKey(item) === key);
  }, [getMovieKey, watchlist]);

  const handleToggleWatchlist = useCallback((movie: Movie) => {
    const key = getMovieKey(movie);
    const exists = isInWatchlist(movie);
    setWatchlist(prev => (
      exists ? prev.filter(item => getMovieKey(item) !== key) : [...prev, movie]
    ));
    showToast(`${movie.title} ${exists ? 'removed from' : 'added to'} Watchlist`);
  }, [getMovieKey, isInWatchlist, showToast]);

  const handleScrollToSearch = useCallback((focusField: boolean = false) => {
    searchPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (focusField) {
      window.setTimeout(() => searchFormRef.current?.focusFirstField(), 250);
    }
  }, []);

  const handleRefresh = () => {
    if (lastSearch) {
      handleSearch(lastSearch.criteria, lastSearch.isLucky);
    }
  };

  const handleSeeAllSearchResults = useCallback(() => {
    if (lastSearch) {
      navigate('/search-results', {
        state: {
          criteria: lastSearch.criteria,
          aiCurate: aiCurateEnabled,
          mainstreamOnly,
        },
      });
    }
  }, [lastSearch, aiCurateEnabled, mainstreamOnly, navigate]);

  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems: NavbarItem[] = [
    { label: 'Home', onClick: () => scrollToSection(heroRef) },
    { label: 'Browse', onClick: () => handleScrollToSearch(true) },
    { label: 'Movies', onClick: () => navigate('/browse/popular') },
    { label: 'Top Rated', onClick: () => navigate('/browse/top-rated') },
    { label: 'Watchlist', onClick: () => setWatchlistOpen(true), active: isWatchlistOpen },
  ];

  const renderSources = () => {
    if (!sources.length) return null;
    return (
      <div className="ui-sources">
        <h4>Data sources</h4>
        <ul>
          {sources.map((source, index) => source.web && (
            <li key={`${source.web.uri}-${index}`}>
              <a href={source.web.uri} target="_blank" rel="noreferrer">
                {source.web.title || new URL(source.web.uri).hostname}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="ui-app">
      <Navbar onSearchClick={() => handleScrollToSearch(true)} items={navItems} />
      <main className="ui-main">
        <div ref={heroRef}>
          <HeroBanner
            movie={featuredMovie}
            onWatchNow={() => handleScrollToSearch()}
            onToggleWatchlist={() => featuredMovie && handleToggleWatchlist(featuredMovie)}
            isInWatchlist={featuredMovie ? isInWatchlist(featuredMovie) : false}
          />
        </div>

        <section ref={searchPanelRef} className="ui-panel">
          <div className="ui-panel__header">
            <div>
              <h2>Find your next movie</h2>
            </div>
            <div className="ui-panel__header-actions">
              <button className="ui-link-button" onClick={handleRefresh} disabled={!lastSearch}>
                Refresh results
              </button>
              <button
                className="ui-search-toggle"
                onClick={() => setSearchExpanded(v => !v)}
                aria-label={isSearchExpanded ? 'Collapse search' : 'Expand search'}
              >
                {isSearchExpanded ? '▲' : '▼'}
              </button>
            </div>
          </div>
          <div className={`ui-panel__content ${isSearchExpanded ? 'ui-panel__content--expanded' : ''}`}>
            <SearchForm ref={searchFormRef} onSearch={handleSearch} isLoading={isSearching} />
            <div className="ui-toggle-group">
              <button
                onClick={() => setMainstreamOnly(v => !v)}
                className={`ui-toggle ${mainstreamOnly ? 'ui-toggle--active' : ''}`}
              >
                {mainstreamOnly ? 'Mainstream On' : 'Mainstream Off'}
              </button>
              <button
                onClick={() => setAiCurateEnabled(v => !v)}
                className={`ui-toggle ${aiCurateEnabled ? 'ui-toggle--active' : ''}`}
              >
                {aiCurateEnabled ? 'AI Curation On' : 'AI Curation Off'}
              </button>
            </div>
          </div>
          {error && (
            <div className="ui-alert ui-alert--error">
              {error}
            </div>
          )}
        </section>

        {isSearching && !searchResults.length && (
          <div className="ui-loading">
            <span className="ui-loading__spinner" />
            <p>Searching titles…</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <CarouselRow
            title="Recommended For You"
            movies={searchResults}
            onToggleWatchlist={handleToggleWatchlist}
            isSaved={isInWatchlist}
            onSeeAll={handleSeeAllSearchResults}
          />
        )}

        {initialLoading ? (
          <>
            <SkeletonRow count={14} />
            <SkeletonRow count={14} />
            <SkeletonRow count={14} />
            <SkeletonRow count={14} />
          </>
        ) : (
          <>
            <div ref={popularRef}>
              <CarouselRow
                title="Popular Movies"
                movies={popularMovies}
                onToggleWatchlist={handleToggleWatchlist}
                isSaved={isInWatchlist}
                seeAllTo="/browse/popular"
              />
            </div>
            <div ref={topRatedRef}>
              <CarouselRow
                title="Top Rated Movies"
                movies={topRatedMovies}
                onToggleWatchlist={handleToggleWatchlist}
                isSaved={isInWatchlist}
                seeAllTo="/browse/top-rated"
              />
            </div>
            <CarouselRow
              title={randomGenreTitle}
              movies={randomGenreMovies}
              onToggleWatchlist={handleToggleWatchlist}
              isSaved={isInWatchlist}
              onSeeAll={() => navigate('/browse/random-genre', { state: { genre: randomGenreTitle.replace(' Movies', '') } })}
            />
            <CarouselRow
              title={randomYearTitle}
              movies={randomYearMovies}
              onToggleWatchlist={handleToggleWatchlist}
              isSaved={isInWatchlist}
              onSeeAll={() => navigate('/browse/random-year', { state: { year: randomYearTitle.replace(' Movies', '') } })}
            />
          </>
        )}

        {renderSources()}
      </main>
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        movies={watchlist}
        onClose={() => setWatchlistOpen(false)}
        onRemove={handleToggleWatchlist}
        suggestions={[...popularMovies, ...topRatedMovies].slice(0, 6)}
        onAdd={handleToggleWatchlist}
        onNavigate={(movie) => {
          setWatchlistOpen(false);
          if (movie.id) {
            navigate(`/movie/${movie.id}`);
          } else {
            showToast('This title is missing detail data.');
          }
        }}
      />
      {toastMessage && <div className="ui-toast">{toastMessage}</div>}
    </div>
  );
};

export default App;
